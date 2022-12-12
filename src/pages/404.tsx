import React from "react";
import { NextPage } from "next";
import Container from "../components/container/container";
import { Sad } from "../assets/svg";

const NotFound: NextPage = () => {
	return (
		<Container>
			<div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<Sad className="mb-[10px] h-28 w-28 fill-primary" />
				<h1 className="text-6xl text-primary">404</h1>
			</div>
		</Container>
	);
};

export default NotFound;
