import { db, User, Pokemons } from "astro:db";

export default async function seed() {
  await db.insert(User).values([
    {
      id: "0",
      username: "Admin",
      password: "1234",
      email: "admin@admin.com",
    },
  ]);

  await db.insert(Pokemons).values([
    {
      id: "1",
      name: "bulbasaur",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    },
    {
      id: "4",
      name: "charmander",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    },
    {
      id: "7",
      name: "squirtle",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    },
  ]);
}
