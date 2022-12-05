import api from "./api";
import { Breed } from "../types/breed";

export const BreedService = {
	getBreedByName: async (name: string) => {
		const response = await api.get<Breed[]>(`/breeds/search?q=${name}`);
		return response.data;
	},
};
