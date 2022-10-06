import React, { ComponentProps, ElementType, ReactNode } from "react";
import Ripples from "react-ripples";
import classes from "./button.module.scss";
import Loader from "../loader/loader";
import classNames from "classnames";

type ButtonOwnProps<E extends ElementType = ElementType> = {
	children: ReactNode;
	variant?: "primary" | "primarySoft" | "default" | "gray";
	isLoading?: boolean;
	loaderVariant?: "primary" | "white";
	loaderSize?: "small" | "regular";
	component?: E;
};

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
	Omit<ComponentProps<E>, keyof ButtonOwnProps>;

const defaultElement = "button";

function Button<E extends ElementType = typeof defaultElement>({
	children,
	variant = "primary",
	isLoading,
	loaderVariant = "white",
	loaderSize = "small",
	component,
	...props
}: ButtonProps<E>) {
	const TagName = component || defaultElement;
	const buttonClasses = classNames({
		[classes.button]: true,
		[classes.button__primary]: variant === "primary",
		[classes.button__primarySoft]: variant === "primarySoft",
		[classes.button__default]: variant === "default",
		[classes.button__gray]: variant === "gray",
	});

	return (
		<TagName className={buttonClasses} {...props}>
			{isLoading && <Loader variant={loaderVariant} size={loaderSize} />}
			{children}
		</TagName>
	);
}

export default Button;
