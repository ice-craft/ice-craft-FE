import { useCountDown } from "@/app/_hooks/useCountDown";

const MafiaModal = ({ context }: { context: string }) => {
  const testTime = 5;
  const count = useCountDown(testTime);

  return (
    <>
      <div className="w-full h-screen bg-black bg-opacity-60 fixed z-1 top-0 left-0 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white p-5 border border-solid border-gray-300 rounded-lg">
          <div className="w-96 h-96 p-5 block">
            <p></p>
            <p className="text-6xl text-black"> {context}</p>
            <p className="text-6xl text-black"> {count}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MafiaModal;
