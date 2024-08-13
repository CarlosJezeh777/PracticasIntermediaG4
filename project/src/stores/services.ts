import { defineStore } from "pinia";

export const useServicesStore = defineStore("services", () => {
  const defaultBaseURL = "http://localhost:3000/";

  const fetchRequest = async (
    endPoint: string,
    options: RequestInit,
    baseURL: string = defaultBaseURL // Base URL opcional
  ): Promise<any> => {
    try {
      // Verifica si el endPoint es una URL completa
      const isFullURL =
        endPoint.startsWith("http://") || endPoint.startsWith("https://");
      const url = isFullURL ? endPoint : baseURL + endPoint; // No concatenar si es una URL completa
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${
            errorData.message || response.statusText
          }`
        );
      }
      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw new Error("Ocurrió un error al realizar la solicitud.");
    }
  };

  const postData = async (
    endPoint: string,
    cuerpo: object,
    customOptions: RequestInit = {},
    baseURL?: string // Parámetro opcional para baseURL
  ) => {
    const defaultOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    };
    const options = { ...defaultOptions, ...customOptions };
    return fetchRequest(endPoint, options, baseURL);
  };

  const getData = async (
    endPoint: string,
    customOptions: RequestInit = {},
    baseURL?: string // Parámetro opcional para baseURL
  ) => {
    const defaultOptions: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const options = { ...defaultOptions, ...customOptions };
    return fetchRequest(endPoint, options, baseURL);
  };

  return { postData, getData };
});
