import React, { FC, ReactNode } from "react";
import dynamic from "next/dynamic";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useRouter } from "next/router";
import Header from "../header/header";

interface LayoutProps {
	children: ReactNode;
}

const DynamicAside = dynamic(() => import("../aside/aside"));

const Layout: FC<LayoutProps> = ({ children }) => {
	const router = useRouter();
	const xl = useMediaQuery("(min-width: 1200px)");

	return (
		<div className="h-full flex w-full">
			{xl && <DynamicAside />}
			<div className="h-full w-2/4 ml-auto flex flex-col xl:w-full">
				{router.pathname !== "/" && <Header />}
				{children}
			</div>
		</div>
	);
};

export default Layout;
