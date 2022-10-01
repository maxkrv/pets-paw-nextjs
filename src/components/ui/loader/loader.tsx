import React, { FC } from "react";
import classes from "./loader.module.scss";

interface LoaderProps {
	size?: "small" | "regular";
	variant?: "primary" | "white";
}

const Loader: FC<LoaderProps> = ({ size = "regular", variant = "primary" }) => {
	return (
		<span
			className={`
				${classes.loader} 
				${size === "regular" && classes.regular} 
				${size === "small" && classes.small}
				${variant === "primary" && classes.primary}
				${variant === "white" && classes.white}
			`}
		></span>
	);
};

export default Loader;
