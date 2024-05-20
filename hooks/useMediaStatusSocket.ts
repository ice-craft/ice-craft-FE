import useSocketOff from "./useSocketOff";
import useSocketOn from "./useSocketOn";

const useMediaStatusSocket = () => {
  const sockets = [
    {
      eventName: "playerMediaStatus",
      handler: (playerMedia: object) => {
        console.log("playerMedia", playerMedia);

        //처리 로직
      }
    }
  ];

  useSocketOn(sockets);
  useSocketOff(sockets);
};

export default useMediaStatusSocket;
