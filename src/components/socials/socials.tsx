import React, { ComponentPropsWithoutRef, FC } from "react";
import Button from "../ui/button/button";
import { API, GitHub, LinkedIn } from "../../assets/svg";

const Socials: FC<ComponentPropsWithoutRef<"div">> = ({ ...props }) => {
	return (
		<div className="flex gap-4" {...props}>
			<Button
				component="a"
				href="https://github.com/maxkrv/pets-paw-nextjs/"
				target="_blank"
			>
				<GitHub />
			</Button>
			<Button
				component="a"
				href="https://www.linkedin.com/in/maxkrv/"
				target="_blank"
			>
				<LinkedIn />
			</Button>
			<Button
				component="a"
				href="https://www.thecatapi.com/"
				target="_blank"
			>
				<API />
			</Button>
		</div>
	);
};

export default Socials;
