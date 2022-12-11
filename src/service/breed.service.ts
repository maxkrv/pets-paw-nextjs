import api from "./api";
import { Breed } from "../types/breed";
import { GetParams } from "../types/getParams";

export const BreedService = {
	getBreedByName: async (name: string) => {
		const response = await api.get<Breed[]>(`/breeds/search?q=${name}`);
		return response.data;
	},
	getBreeds: async (
		{ limit, order, page, sub_id, attach_image }: GetParams,
		returnValue: "headers" | "data" = "data"
	) => {
		const response = await api.get<Breed[]>("/breeds", {
			params: {
				limit,
				order,
				page,
				sub_id,
				attach_image,
			},
		});

		return returnValue === "headers"
			? response.headers
			: (response.data as Breed[]);
	},
};
