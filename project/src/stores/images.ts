import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { Image } from "../types/Images";
import { useUtilsStore } from "./utils";

export const useImagesStore = defineStore("images", () => {
  const utilsStore = useUtilsStore();

  // Lista de imagenes
  const images = ref(new Map<number, Image>());

  // Imagen actual
  const currentImage = ref<Image>(new Image(-1, "", new Map<string, string>()));

  const setCurrentImage = (id: number) => (currentImage.value = getImage(id));
  const clearImages = () => (images.value = new Map<number, Image>());
  const removeImage = (id: number) => images.value.delete(id);

  // Ordenar la imagenes con base en su ID
  const sortImages = () => {
    const sortedImages = new Map(
      [...images.value.entries()].sort((a, b) => a[0] - b[0])
    );
    images.value = sortedImages;
  };

  const addImage = (id: number, name: string, file: Map<string, string>) => {
    if (id !== -1) {
      images.value.set(id, new Image(id, name, file));
      sortImages(); // Llamar a sortImages después de agregar una imagen para mantener el orden
    }
  };

  const getImage = (id: number): Image => {
    console.log("getImage", id);
    return images.value.get(id)
      ? new Image(
          id,
          images.value.get(id)?.name || "",
          images.value.get(id)?.files || new Map<string, string>()
        )
      : new Image(-1, "", new Map<string, string>());
  };

  const getLibrary = () => utilsStore.baseConfig.name;

  /* ==================== Paginado de imagenes ==================== */
  // Numero de elementos por pagina
  const itemsPerPage = ref(18);

  // Pagina actual
  const currentPage = ref(1);

  // Numero total de paginas
  const totalPages = computed(() =>
    Math.ceil(images.value.size / itemsPerPage.value)
  );

  // Rango de imagenes a mostrar
  const imagesRange = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return Array.from(images.value.values()).slice(start, end);
  });

  // Cambiar a una pagina especifica
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  // Cambiar a la siguiente pagina
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  // Cambiar a la pagina anterior
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  return {
    images,
    currentImage,
    setCurrentImage,
    clearImages,
    removeImage,
    sortImages,
    addImage,
    getImage,
    getLibrary,

    currentPage,
    totalPages,
    imagesRange,
    goToPage,
    nextPage,
    prevPage,
  };
});
