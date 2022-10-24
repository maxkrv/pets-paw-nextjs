import React, { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import classNames from "classnames";
import classes from "./container.module.scss";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
	children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children, ...props }) => {
	const containerClasses = classNames({
		[classes.container]: true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<div className={containerClasses} {...props}>
			<PerfectScrollbar component="main">{children}</PerfectScrollbar>
		</div>
	);
};

export default Container;
