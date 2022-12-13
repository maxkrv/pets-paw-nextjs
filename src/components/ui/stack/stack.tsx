import React, { ComponentPropsWithRef, FC, ReactNode } from "react";
import classes from "./stack.module.scss";
import classNames from "classnames";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export interface StackProps extends ComponentPropsWithRef<"div"> {
	children: ReactNode;
	gap?: number;
}

const Stack: FC<StackProps> = ({ children, gap = 10, ...props }) => {
	const stackClasses = classNames({
		[classes.stack]: true,
		[props.className as string]: true,
	});
	delete props.className;
	const [parent] = useAutoAnimate<any>();

	return (
		<div
			className={stackClasses}
			style={{ gap: gap }}
			{...props}
			ref={parent}
		>
			{children}
		</div>
	);
};

export default Stack;
