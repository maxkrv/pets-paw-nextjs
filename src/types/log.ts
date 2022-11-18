export interface ILog {
	id?: string;
	createdAt: string;
	imageId: string;
	message: string;
	value?: "like" | "dislike" | "favourite";
}
