"use client";

import Image from "next/image";
import { Suspense, useRef, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import Container from "@/components/Container";

const POKEMON_RANDOM = () => Math.floor(Math.random() * 905);

type PokeCardProps = {
  id: number;
  image: string;
  name: string;
};

function PokeCard({ id, image, name }: PokeCardProps) {
  return (
    <div className="text-center">
      <div className="mt-6 h-64 w-64 rounded-xl border-2 border-gray-300">
        <div className="flex h-full items-center justify-center">
          <Image src={image} alt={name} width={180} height={180} />
        </div>
      </div>
      <h5 className="mt-4 text-2xl capitalize">{name}</h5>
    </div>
  );
}

export default function Home() {
  const inputEl = useRef(null);
  const [rand, setRand] = useState(POKEMON_RANDOM);

  const {
    data: pokemon,
    isLoading,
    isError,
  } = trpc.pokemon.getById.useQuery(rand);

  let title = "Pokemon";
  const nextPokemon = async (e: any) => {
    e.preventDefault();
    setRand(POKEMON_RANDOM);
  };

  if (isLoading)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="font-mono">Loading...</div>
      </div>
    );

  return (
    <Suspense fallback={null}>
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center border-gray-200 pb-16 dark:border-gray-700">
          <div className="mt-8 text-center">
            <h1 className="text-4xl">{title}</h1>
            {isLoading && (
              <>
                <div className="mt-6 flex h-64 w-64 items-center justify-center rounded-xl border-2 border-gray-300">
                  Loading...
                </div>
                <div className="mt-4 animate-pulse">
                  <div className="h-[32px] rounded bg-slate-200"></div>
                </div>
              </>
            )}
            {isError && (
              <>
                <div className="mt-6 flex h-64 w-64 items-center justify-center rounded-xl border-2 border-gray-300">
                  Error...
                </div>
                <div className="mt-4">Error...</div>
              </>
            )}
            {!isLoading && pokemon && <PokeCard {...pokemon} />}

            {/* {session.data ? (
              <form className="relative my-8" onSubmit={leaveVote}>
                <input
                  ref={inputEl}
                  aria-label="Your rate"
                  placeholder="Your rate..."
                  type="number"
                  max="10"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                />
                <button
                  className="mt-4 flex w-full items-center justify-center rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            ) : (
              <button
                className="mt-4 flex w-full items-center justify-center rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                type="submit"
                onClick={nextPokemon}
              >
                Next
              </button>
            )} */}
            <button
              className="mt-4 flex w-full items-center justify-center rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-100"
              type="submit"
              onClick={nextPokemon}
            >
              Next
            </button>
          </div>
        </div>
      </Container>
    </Suspense>
  );
}
