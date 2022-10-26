import React, { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import classes from "./containerHeader.module.scss";
import classNames from "classnames";
import BackButton from "../backButton/backButton";
import Tag from "../tag/tag";

interface ContainerHeaderProps extends ComponentPropsWithoutRef<"div"> {
	title: string;
	children?: ReactNode;
}

const ContainerHeader: FC<ContainerHeaderProps> = ({
	title,
	children,
	...props
}) => {
	const ContainerHeaderClasses = classNames({
		[classes.header]: true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<div className={ContainerHeaderClasses} {...props}>
			<BackButton />
			<Tag>{title}</Tag>
			{children}
		</div>
	);
};

export default ContainerHeader;
