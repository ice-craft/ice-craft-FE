import useSocketOff from "./useSocketOff";
import useSocketOn from "./useSocketOn";

const useMediaStatusSocket = () => {
  const sockets = [
    {
      eventName: "userMediaStatus",
      handler: (userIdList: any, isCamera: any, isMike: any) => {
        //처리 로직
      }
    },

    {
      eventName: "r0TurnAllUserCameraMikeOff",
      handler: () => {
        // r0TurnAllUserCameraMikeOffHandler(tracks, userId);
      }
    }
    // 추가 소켓 리스트
  ];

  useSocketOn(sockets);
  useSocketOff(sockets);
};

export default useMediaStatusSocket;
