import Link from 'next/link';

export const MainPage = () => {
  const id = 1;

  return (
    <>
      <Link href={`/room/${id}`}>마피아 방으로 이동합니다</Link>
    </>
  );
};
