export interface ILog {
	id?: string;
	createdAt: string;
	imageId: string | number;
	message: string;
	value?: "like" | "dislike" | "favourite";
}
