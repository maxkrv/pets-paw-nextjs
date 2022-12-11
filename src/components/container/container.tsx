import React, { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import classNames from "classnames";
import classes from "./container.module.scss";
import { Scrollbars } from "react-custom-scrollbars-2";

interface ContainerProps extends ComponentPropsWithoutRef<"main"> {
	children: ReactNode;
}

const renderThumb = ({ style, ...props }: ComponentPropsWithoutRef<"div">) => {
	return (
		<div
			className="bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50"
			style={{
				borderRadius: "5px",
				...style,
			}}
			{...props}
		/>
	);
};

const renderTrackHorizontal = ({
	style,
	...props
}: ComponentPropsWithoutRef<"div">) => {
	return (
		<div
			style={{
				display: "none",
				...style,
			}}
			{...props}
		/>
	);
};

const Container: FC<ContainerProps> = ({ children, ...props }) => {
	const containerClasses = classNames({
		[classes.container]: true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<main className={containerClasses} {...props}>
			<Scrollbars
				renderThumbVertical={renderThumb}
				renderTrackHorizontal={renderTrackHorizontal}
				universal
			>
				{children}
			</Scrollbars>
		</main>
	);
};

export default Container;
