<template>
  <div class="w-full h-auto bg-slate-900">
    <div class="max-w-md mx-auto">
      <label
        for="pokemon-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search Pokémon</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="pokemon-search"
          v-model="pokemonName"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Pokémon..."
          required
        />
        <button
          @click="searchPokemon"
          class="text-white absolute right-2.5 top-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4"
    >
      <div
        v-for="img in sortedImages"
        :key="img.id"
        @click="changeToImageView(img.id)"
        class="rounded overflow-hidden shadow-lg flex flex-col items-center justify-around bg-slate-600 hover:cursor-pointer hover:bg-slate-500"
      >
        <p class="text-center text-white">{{ img.name.toUpperCase() }}</p>
        <img
          :src="img.sprites.get('front_default')"
          alt="image"
          class="w-full h-25"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const pokemonName = ref("");
const pokemones = ref(["bulbasaur", "squirtle", "charmander"]);
const images = ref<any[]>([]);

// Ordena los Pokémon en base a su ID de menor a mayor
const sortedImages = computed(() => {
  return images.value.sort((a, b) => a.id - b.id);
});

const changeToImageView = (id: number) => {
  console.log("Selected Pokémon ID:", id);
};

const searchPokemon = async () => {
  if (pokemonName.value === "" || pokemones.value.includes(pokemonName.value)) {
    return;
  }

  pokemones.value.push(pokemonName.value);

  const success = await loadImages(pokemonName.value);
  if (!success) {
    pokemones.value = pokemones.value.filter((p) => p !== pokemonName.value);
  }

  pokemonName.value = "";
};

const loadImages = async (pokemon: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const image = await response.json();

    if (!image || !image.id) {
      return false;
    }

    const id = image.id;
    const name = image.name;
    const sprites = new Map<string, string>();

    Object.keys(image.sprites).forEach((key) => {
      if (
        image.sprites[key] != null &&
        typeof image.sprites[key] === "string"
      ) {
        sprites.set(key, image.sprites[key]);
      }
    });

    const pokemonExists = images.value.some((img) => img.id === id);
    if (!pokemonExists) {
      images.value.push({ id, name, sprites });
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Cargar las imágenes iniciales cuando se monta el componente
onMounted(async () => {
  for (const pokemon of pokemones.value) {
    await loadImages(pokemon);
  }
});
</script>

<style scoped></style>
