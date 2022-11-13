export interface GetResponse {
	id: number;
	image_id: string;
	sub_id: string;
	created_at: Date;
	value: number;
	country_code: string;
	image?: {
		id: string;
		url: string;
	};
}
