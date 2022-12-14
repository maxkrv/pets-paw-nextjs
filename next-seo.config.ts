export default {
	title: "PetsPaw",
	description: "Explore cats and have fun",
	openGraph: {
		type: "website",
		locale: "en_IE",
		url:
			process.env.NODE_ENV === "production"
				? process.env.SITE_URL
				: "http://localhost:3000",
		site_name: "PetsPaw",
		images: [
			{
				url: `${
					process.env.NODE_ENV === "production"
						? process.env.SITE_URL
						: "http://localhost:3000"
				}/favicon/android-chrome-192x192.png`,
				width: 192,
				height: 192,
				alt: "Og Image Alt",
			},
		],
	},
	twitter: {
		handle: "@leenp1ck",
		site: "@PetsPaw",
		cardType: "summary_large_image",
	},
};
