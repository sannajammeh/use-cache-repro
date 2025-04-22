import { unstable_cacheLife, unstable_cacheTag } from "next/cache";
import { connection } from "next/server";

export default async function Home() {
  await connection();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <RandomComponent />
      </main>
    </div>
  );
}

const getRandomValues = async (args: { language: string; market: number }) => {
  "use cache";

  unstable_cacheLife("max");
  unstable_cacheTag("random");

  await fetch("https://jsonplaceholder.typicode.com/posts/1");

  return `${Math.random()} ${JSON.stringify(args)} PREVIEW`;
};

const RandomComponent = async () => {
  const values = await getRandomValues({
    language: "en",
    market: 4,
  });

  return <div className="text-4xl">{values}</div>;
};
