import "../styles/globals.scss";
import type { AppProps } from "next/app";
import SEO from "../../next-seo.config";
import { DefaultSeo } from "next-seo";
import Layout from "../components/layout/layout";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<DefaultSeo {...SEO} />
			<ThemeProvider enableSystem attribute="class">
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
