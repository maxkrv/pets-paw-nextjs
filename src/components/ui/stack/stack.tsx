import React, { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import classes from "./Stack.module.scss";
import classNames from "classnames";

export interface StackProps extends ComponentPropsWithoutRef<"div"> {
	children: ReactNode;
	gap?: number;
}

const Stack: FC<StackProps> = ({ children, gap = 10, ...props }) => {
	const stackClasses = classNames({
		[classes.stack]: true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<div className={stackClasses} style={{ gap: gap }} {...props}>
			{children}
		</div>
	);
};

export default Stack;
