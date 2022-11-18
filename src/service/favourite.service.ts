import api from "./api";
import { GetResponse } from "../types/getResponse";
import { SetParams } from "../types/setParams";
import { SetResponse } from "../types/setResponse";

export const FavouriteService = {
	setFavourite: async ({ image_id, sub_id }: SetParams) => {
		const response = await api.post<SetResponse>("/favourites", {
			image_id,
			sub_id,
		});
		return response.data;
	},
	removeFavourite: async ({ favourite_id }: { favourite_id: number }) => {
		const response = await api.delete<{ message: string }>(
			`/favourites/${favourite_id}`
		);
		return response.data;
	},
	getFavourites: async ({ sub_id }: { sub_id?: string }) => {
		const response = await api.get<GetResponse[]>("/favourites", {
			params: { sub_id },
		});
		return response.data;
	},
};
