import api from "./api";
import { Breed } from "../types/breed";
import { Category } from "../types/category";
import { GetParams } from "../types/getParams";

export interface getImageServiceParams extends GetParams {
	size?: "small" | "med" | "full";
	mime_types?: "all" | "gif" | "jpg" | "png";
	format?: "src" | "json";
	category_ids?: number;
	breed_ids?: string;
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

export interface uploadImageResponse {
	id: string;
	url: string;
	sub_id: string;
	width: number;
	height: number;
}

export const ImageService = {
	getImages: async (
		{
			size,
			mime_types,
			format,
			order,
			page,
			limit,
			category_ids,
			breed_ids,
			has_breeds,
		}: getImageServiceParams,
		returnValue: "headers" | "data" = "data"
	) => {
		const response = await api.get<getImageResponse[]>("/images/search", {
			params: {
				size,
				mime_types,
				format,
				order,
				page,
				limit,
				category_ids,
				breed_ids,
				has_breeds,
			},
		});
		return returnValue === "headers" ? response.headers : response.data;
	},
	getImageById: async (id: string) => {
		const response = await api.get<getImageResponse>(`/images/${id}`);
		return response.data;
	},
	uploadImage: async (file: File, subId?: string) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("sub_id", subId || "");
		const response = await api.post<uploadImageResponse>(
			"/images/upload",
			formData
		);
		return response.data;
	},
};
