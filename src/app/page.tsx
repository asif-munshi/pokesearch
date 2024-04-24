"use client";

import { trpc } from "@/app/_trpc/client";

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
      <div className="font-mono">{data?.greeting}!</div>
    </div>
  );
}
