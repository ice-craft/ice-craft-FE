import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useConnectActions, useNickname, useRoomId, useRoomsCurrent, useUserId } from "@/store/connect-store";
import { socket } from "@/utils/socket/socket";
import { checkUserLogIn } from "@/utils/supabase/authAPI";
import { Tables } from "@/types/supabase";
import useJoinRoomSocket from "./useJoinRoomSocket";
import { useRoomAction } from "@/store/room-store";
import useLoading from "./useLoading";

const useJoinRoom = () => {
  const isGoInClick = useRef(false);
  const { setRoomId, setUserNickname, setUserId } = useConnectActions();
  const { setIsEntry } = useRoomAction();
  const { loading, startLoading, stopLoading } = useLoading();
  const userId = useUserId();
  const nickname = useNickname();
  const rooms = useRoomsCurrent();
  useJoinRoomSocket();

  useEffect(() => {
    if (!loading && rooms.length > 0) {
      console.log(rooms);
    }
  }, [loading, rooms]);

  //NOTE - 사용자 로그인 여부
  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const userCheckLogin = await checkUserLogIn();
        if (userCheckLogin) {
          setUserId(userCheckLogin.id);
          setUserNickname(userCheckLogin.user_metadata.nickname);
        }
      } catch (error) {
        toast.error("로그인 여부를 확인해 주세요.");
      }
    };
    checkUserInfo();
  }, []);

  //NOTE - 클릭시 로그인 안한 유저 처리
  const loginErrorHandler = useCallback(async (emitCallback: () => void) => {
    try {
      startLoading();
      const isLogin = await checkUserLogIn();
      if (!isLogin) {
        toast.info("로그인 후 입장가능합니다.");
        return;
      }
      if (!isGoInClick.current) {
        isGoInClick.current = true;
        emitCallback();
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      stopLoading();
      isGoInClick.current = false;
    }
  }, []);

  //NOTE - 방 리스트 입장하기
  const joinRoomHandler = async (item: Tables<"room_table">) => {
    await loginErrorHandler(() => {
      setRoomId(item.room_id);
      setIsEntry(true);
      socket.emit("joinRoom", userId, item.room_id, nickname);
    });
  };

  //NOTE - 메인페이지 visual에서 게임시작 버튼 클릭시(추후 마피아 & 노래맞추기 조건 추가)
  const gameStartHandler = () => {
    loginErrorHandler(() => {
      setIsEntry(true);
      socket.emit("fastJoinRoom", userId, nickname);
    });
  };

  //NOTE - 빠른 입장 (랜덤 방 입장)
  const fastJoinRoomHandler = () => {
    loginErrorHandler(() => {
      setIsEntry(true);
      socket.emit("fastJoinRoom", userId, nickname);
    });
  };

  return { joinRoomHandler, fastJoinRoomHandler, gameStartHandler };
};

export default useJoinRoom;
