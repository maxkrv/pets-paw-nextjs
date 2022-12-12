import React, { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import classes from "./tag.module.scss";
import classNames from "classnames";

interface TagProps extends ComponentPropsWithoutRef<"h5"> {
	variant?: "primary" | "primarySoft";
	children: ReactNode;
}

const Tag: FC<TagProps> = ({ variant = "primary", children, ...props }) => {
	const tagClasses = classNames({
		[classes.tag]: true,
		[classes.tag__primary]: variant === "primary",
		[classes.tag__primmarySoft]: variant === "primarySoft",
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<span className={tagClasses} {...props}>
			{children}
		</span>
	);
};

export default Tag;
