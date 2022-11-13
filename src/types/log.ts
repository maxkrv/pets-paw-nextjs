export interface ILog {
	createdAt: string;
	imageId: string;
	message: string;
	value?: "like" | "dislike" | "favourite";
}
