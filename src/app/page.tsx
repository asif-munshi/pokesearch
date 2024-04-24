"use client";

import { trpc } from "@/app/_trpc/client";
import Container from "@/components/Container";

export default function Home() {
  const { data, isLoading } = trpc.example.hello.useQuery({
    text: "from tRPC",
  });

  if (isLoading)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="font-mono">Loading...</div>
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-start justify-center border-gray-200 pb-16 dark:border-gray-700">
          {data ? <p>{data.greeting}</p> : <p>Loading..</p>}
        </div>
      </Container>
    </div>
  );
}
