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
	removeFavourite: async ({ image_id }: { image_id: number }) => {
		const response = await api.delete<{ message: string }>(
			`/favourites/${image_id}`
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
