import "../styles/globals.scss";
import type { AppProps } from "next/app";
import SEO from "../../next-seo.config";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<DefaultSeo {...SEO} />
			<ThemeProvider enableSystem attribute="class">
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
