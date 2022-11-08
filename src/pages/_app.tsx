import "../styles/globals.scss";
import type { AppProps } from "next/app";
import SEO from "../../next-seo.config";
import { DefaultSeo } from "next-seo";
import Layout from "../components/layout/layout";
import { ThemeProvider } from "next-themes";
import {
	DehydratedState,
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "../store/store";

function MyApp({
	Component,
	pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			})
	);

	return (
		<>
			<DefaultSeo {...SEO} />
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<Provider store={store}>
						<ThemeProvider enableSystem attribute="class">
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</ThemeProvider>
					</Provider>
				</Hydrate>
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
