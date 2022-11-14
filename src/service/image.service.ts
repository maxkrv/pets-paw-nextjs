import api from "./api";
import { Breed } from "../types/breed";
import { Category } from "../types/category";
import { GetParams } from "../types/getParams";

export interface getImageServiceParams extends GetParams {
	size?: "small" | "med" | "full";
	mime_types?: "gif" | "jpg" | "png";
	format?: "src" | "json";
	category_ids?: number;
	breed_id?: string;
	has_breeds?: 1 | 0;
}

export interface getImageResponse {
	breeds?: Breed[];
	categories?: Category[];
	id: string;
	url: string;
	width: number;
	height: number;
}

export const ImageService = {
	getImages: async ({
		size,
		mime_types,
		format,
		order,
		page,
		limit,
		category_ids,
		breed_id,
		has_breeds,
	}: getImageServiceParams) => {
		const response = await api.get<getImageResponse[]>("/images/search", {
			params: {
				size,
				mime_types,
				format,
				order,
				page,
				limit,
				category_ids,
				breed_id,
				has_breeds,
			},
		});
		return response.data;
	},
};
