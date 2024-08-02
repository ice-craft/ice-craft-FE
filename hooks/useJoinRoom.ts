import { useConnectActions, useNickname, useUserId } from "@/store/connect-store";
import { useLoadingActions } from "@/store/loading-store";
import { useRoomAction } from "@/store/room-store";
import { useCreateActions } from "@/store/toggle-store";
import { Tables } from "@/types/supabase";
import { socket } from "@/utils/socket/socket";
import { checkUserLogIn } from "@/utils/supabase/authAPI";
import { toast } from "react-toastify";

const useJoinRoom = () => {
  const exUserId = useUserId();
  const exNickname = useNickname();

  const { setRoomId } = useConnectActions();
  const { setLoading } = useLoadingActions();
  const { setIsEntry } = useRoomAction();

  const loginErrorHandler = async (emitCallback: (userId: string, userNickname: string) => void) => {
    try {
      const userInfo = await checkUserLogIn();
      if (!userInfo) {
        toast.info("로그인 후 게임을 이용해 주세요.");
        return;
      }
      if (userInfo) {
        const nickname = userInfo.user_metadata.nickname || userInfo.user_metadata.name;
        emitCallback(userInfo.id, nickname);
      }
    } catch (e) {
      toast.info("로그인 후 게임을 이용해 주세요.");
    }
  };

  //NOTE - 방 리스트 입장하기
  const joinRoomHandler = async (item: Tables<"room_table">) => {
    await loginErrorHandler((userId, userNickname) => {
      setLoading(true);
      setIsEntry(true);
      setRoomId(item.room_id);
      // socket.emit("joinRoom", userId, item.room_id, userNickname);

      //FIXME - 임시 로그인
      socket.emit("joinRoom", exUserId, item.room_id, exNickname);
    });
  };

  //NOTE - 메인페이지 visual에서 게임시작 버튼 클릭시(추후 마피아 & 노래맞추기 조건 추가)
  const gameStartHandler = () => {
    loginErrorHandler((userId, userNickname) => {
      setLoading(true);
      setIsEntry(true);
      socket.emit("fastJoinRoom", userId, userNickname);
    });
  };

  //NOTE - 빠른 입장 (랜덤 방 입장)
  const fastJoinRoomHandler = () => {
    loginErrorHandler((userId, userNickname) => {
      setLoading(true);
      setIsEntry(true);
      socket.emit("fastJoinRoom", userId, userNickname);
    });
  };

  //NOTE - 방만들기 모달창
  const createRoomModalHandler = (setIsCreate: React.Dispatch<React.SetStateAction<boolean>>) => {
    loginErrorHandler(() => {
      setIsCreate(true);
    });
  };
  return { joinRoomHandler, fastJoinRoomHandler, gameStartHandler, createRoomModalHandler };
};

export default useJoinRoom;
