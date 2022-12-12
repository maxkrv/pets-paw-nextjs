export interface GetParams {
	attach_image?: 1 | 0;
	sub_id?: string;
	page?: number;
	limit?: number;
	order?: "ASC" | "DESC" | "RANDOM";
}
