import type { NextPage } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import React from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import img from "../../public/images/bg.png";

const DynamicAside = dynamic(() => import("../components/aside/aside"));

const Home: NextPage = () => {
	const xl = useMediaQuery("(max-width: 1201px)");
	
	return (
		<>
			{xl && <DynamicAside />}

			<div className="h-full w-full  bg-primary-soft rounded-[20px] dark:bg-black-soft overflow-hidden xl:hidden">
				<div className="h-full absolute top-0 right-0 overflow-hidden xl:w-2/4">
					<Image
						placeholder="blur"
						src={img}
						width={775}
						height={900}
						alt="home page img"
					/>
				</div>
			</div>
		</>
	);
};

export default Home;
