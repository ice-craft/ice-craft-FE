import { useCountDown } from "@/app/_hooks/useCountDown";
import S from "@/app/_style/modal/modal.module.css";

const MafiaModal = ({ context }: { context: string }) => {
  const testTime = 5;
  const count = useCountDown(testTime);

  return (
    <>
      <div className={S.modalWrap}>
        <div className="flex flex-col justify-center items-center bg-white p-5 border border-solid border-gray-300 rounded-lg">
          <div className="w-96 h-96 p-5 block">
            <p></p>
            <h2 className="text-6xl text-black"> {context}</h2>
            <p className="text-6xl text-black"> {count}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MafiaModal;
