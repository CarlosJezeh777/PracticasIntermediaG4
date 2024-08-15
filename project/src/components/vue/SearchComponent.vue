<template>
  <div class="w-full h-auto bg-slate-100">
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
        v-for="img in useImages.images"
        :key="img[1].id"
        @click="changeToImageView(img[0])"
        href="/vue/image"
        class="rounded overflow-hidden shadow-lg flex flex-col items-center justify-around bg-slate-600 hover:cursor-pointer hover:bg-slate-500"
      >
        <p class="text-center text-white">{{ img[1].name.toUpperCase() }}</p>
        <img
          :src="img[1].getFile('front_default')"
          alt="image"
          class="w-full h-25"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { appStore } from "@/stores";
import { useImagesStore } from "@/stores/images";
import { useUtilsStore } from "@/stores/utils";
import { testStore } from "@/stores/testStore";

const props = defineProps(["pokemones"]);

const useImages = useImagesStore(appStore);
const utils = useUtilsStore(appStore);
const pokemones = ref(["bulbasaur", "squirtle", "charmander"]);
const pokemonName = ref("");

const changeToImageView = (id: number) => {
  useImages.setCurrentImage(id);
};

const searchPokemon = () => {
  if (pokemonName.value in pokemones.value) {
    return;
  }
  if (pokemonName.value !== "") {
    pokemones.value.push(pokemonName.value);
  }

  if (pokemones.value.length > 0) {
    pokemones.value.forEach(async (pokemon) => {
      try {
        const success = await loadImages(pokemon);
        if (!success) {
          // Elimina el Pokémon de la lista si no se encontró ninguna imagen
          pokemones.value = pokemones.value.filter((p) => p !== pokemon);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  pokemonName.value = "";
};

// Cada vez que se agregue un nuevo pokemon a la lista, se cargan las imágenes
watch(pokemones, (newValue) => {
  useImages.sortImages();
  newValue.forEach((pokemon) => {
    loadImages(pokemon);
  });
});

const loadImages = async (pokemon: string): Promise<boolean> => {
  if (pokemon === "") return false;
  try {
    const image: any = await utils.getImagesFromPokeAPI(pokemon);

    if (!image || !image.id) {
      // No se encontró la imagen
      return false;
    }

    const id: number = image?.id || -1;
    const name: string = image?.name || "";
    let sprites: Map<string, string> = new Map<string, string>();

    Object.keys(image.sprites).forEach((key) => {
      image.sprites[key] != null && typeof image.sprites[key] === "string"
        ? sprites.set(key, image.sprites[key])
        : null;
    });

    const file: { [key: string]: string } = image?.sprites || {};
    const fileMap = new Map<string, string>(Object.entries(file));

    useImages.addImage(id, name, fileMap);
    return true; // Indica que la carga de la imagen fue exitosa
  } catch (error) {
    console.log(error);
    return false; // Indica que hubo un error o no se encontraron imágenes
  }
};

onMounted(async () => {
  useImages.clearImages();
  searchPokemon();
});
</script>

<style scoped></style>
