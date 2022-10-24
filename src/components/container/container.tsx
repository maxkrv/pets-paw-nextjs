import React, { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import classNames from "classnames";
import classes from "./container.module.scss";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
	title?: string;
	headerElements?: ReactNode;
	children: ReactNode;
}

const Container: FC<ContainerProps> = ({
	title,
	headerElements,
	children,
	...props
}) => {
	const containerClasses = classNames({
		[classes.container]: true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<div className={containerClasses} {...props}>
			<PerfectScrollbar component="main" options={{ swipeEasing: false }}>
				{children}
			</PerfectScrollbar>
		</div>
	);
};

export default Container;
