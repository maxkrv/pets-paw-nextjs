import React, { FC } from "react";
import classes from "./loader.module.scss";
import classNames from "classnames";

interface LoaderProps {
	size?: "small" | "regular";
	variant?: "primary" | "white";
}

const Loader: FC<LoaderProps> = ({ size = "regular", variant = "primary" }) => {
	const loaderClasses = classNames({
		[classes.loader]: true,
		[classes.regular]: size === "regular",
		[classes.small]: size === "small",
		[classes.primary]: variant === "primary",
		[classes.white]: variant === "white",
	});

	return <span className={loaderClasses}></span>;
};

export default Loader;
