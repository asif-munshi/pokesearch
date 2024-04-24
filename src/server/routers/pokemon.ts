import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";

const Pokemon = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
});
const Pokemons = z.array(Pokemon);

export type Pokemon = z.infer<typeof Pokemon>;
export type Pokemons = z.infer<typeof Pokemons>;

export const pokemonRouter = router({
  getById: publicProcedure
    .input(z.number())
    .output(Pokemon)
    .query(async ({ input }) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
      const data = await res.json();

      if (!data) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `could not find pokemon with id ${input}`,
        });
      }

      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
      };
    }),
});
