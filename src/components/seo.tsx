import React, { FC } from "react";
import Head from "next/head";

interface SeoProps {
	title?: string;
	description?: string;
	twitterHandle?: string;
}

const Seo: FC<SeoProps> = ({
	title = "pets-paw",
	description = "Explore cats.",
	twitterHandle = "@pets-paw",
}) => {
	return (
		<Head>
			<title key="title">{title}</title>
			<meta name="description" content={description} />

			<meta key="og_type" property="og:type" content="website" />
			<meta key="og_title" property="og:title" content={title} />
			<meta
				key="og_description"
				property="og:description"
				content={description}
			/>
			<meta key="og_site_name" property="og:site_name" content={title} />

			<meta key="twitter:card" name="twitter:card" content="summary" />
			<meta
				key="twitter:site"
				name="twitter:site"
				content={twitterHandle}
			/>
			<meta
				key="twitter:title"
				property="twitter:title"
				content={title}
			/>
			<meta
				key="twitter:description"
				property="twitter:description"
				content={description}
			/>
		</Head>
	);
};

export default Seo;
