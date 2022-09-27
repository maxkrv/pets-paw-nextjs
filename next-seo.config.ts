export default {
	title: "PetsPaw",
	description: "Explore cats and have fun",
	openGraph: {
		type: "website",
		locale: "en_IE",
		url:
			process.env.NODE_ENV === "production"
				? "http://localhost:3000/"
				: process.env.SITE_URL,
		site_name: "PetsPaw",
	},
	twitter: {
		handle: "@leenp1ck",
		site: "@PetsPaw",
		cardType: "summary_large_image",
	},
};
