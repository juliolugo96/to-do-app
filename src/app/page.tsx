import Image from "next/image";
import BoardsContainer from "@/components/templates/BoardsContainer";

export default function Home() {
  return (
    <main className="absolute z-20 flex h-screen flex-col items-center justify-between md:p-24 w-full mt-32 md:m-1">
      <BoardsContainer />
    </main>
  );
}
