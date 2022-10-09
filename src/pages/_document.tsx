import { Head, Html, Main, NextScript } from "next/document";
import Favicon from "../components/favicon";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<Favicon />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
