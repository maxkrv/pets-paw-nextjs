import React, { ComponentPropsWithoutRef, FC } from "react";
import Button from "../ui/button/button";
import { API, GitHub, LinkedIn } from "../../assets/svg";
import classNames from "classnames";

const Socials: FC<ComponentPropsWithoutRef<"div">> = ({ ...props }) => {
	const socialsClasses = classNames({
		"flex gap-4": true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<div className={socialsClasses} {...props}>
			<Button
				component="a"
				href="https://github.com/maxkrv/pets-paw-nextjs/"
				target="_blank"
				aria-label="GitHub"
			>
				<GitHub />
			</Button>
			<Button
				component="a"
				href="https://www.linkedin.com/in/maxkrv/"
				target="_blank"
				aria-label="LinkedIn"
			>
				<LinkedIn />
			</Button>
			<Button
				component="a"
				href="https://www.thecatapi.com/"
				target="_blank"
				aria-label="The Cat API"
			>
				<API />
			</Button>
		</div>
	);
};

export default Socials;
