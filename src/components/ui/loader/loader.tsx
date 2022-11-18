import React, { ComponentPropsWithoutRef, FC } from "react";
import classes from "./loader.module.scss";
import classNames from "classnames";

interface LoaderProps extends ComponentPropsWithoutRef<"span"> {
	size?: "small" | "regular";
	variant?: "primary" | "white";
	centered?: boolean;
}

const Loader: FC<LoaderProps> = ({
	size = "regular",
	variant = "primary",
	centered = false,
	...props
}) => {
	const loaderClasses = classNames({
		[classes.loader]: true,
		[classes.regular]: size === "regular",
		[classes.small]: size === "small",
		[classes.primary]: variant === "primary",
		[classes.white]: variant === "white",
		["absolute top-2/4 left-2/4"]: centered,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<span className={loaderClasses} {...props}>
			<div className="sr-only">...Loading</div>
		</span>
	);
};

export default Loader;
