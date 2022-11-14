import api from "./api";
import { GetResponse } from "../types/getResponse";
import { GetParams } from "../types/getParams";
import { SetResponse } from "../types/setResponse";
import { SetParams } from "../types/setParams";

export interface SetVoteServiceParams extends SetParams {
	value: 1 | 0;
}

export const VoteService = {
	setVote: async ({ image_id, sub_id, value }: SetVoteServiceParams) => {
		const response = await api.post<SetResponse>("/votes", {
			image_id,
			sub_id,
			value,
		});
		return response.data;
	},
	getVotes: async ({
		attach_image,
		sub_id,
		page,
		limit,
		order,
	}: GetParams) => {
		const response = await api.get<GetResponse[]>("/votes", {
			params: {
				attach_image,
				sub_id,
				page,
				limit,
				order,
			},
		});
		return response.data;
	},
};
