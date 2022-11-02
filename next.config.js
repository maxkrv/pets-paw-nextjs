/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.media.tumblr.com",
			},
			{
				protocol: "https",
				hostname: "**.thecatapi.com",
			},
		],
	},
};

module.exports = nextConfig;
