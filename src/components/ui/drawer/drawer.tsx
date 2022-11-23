import React, { ComponentPropsWithoutRef, FC } from "react";
import classes from "./drawer.module.scss";
import classNames from "classnames";
import { useAppSelector } from "../../../hooks/redux";

const Drawer: FC<ComponentPropsWithoutRef<"div">> = ({
	children,
	...props
}) => {
	const { isDrawerOpen } = useAppSelector((state) => state.drawer);

	const drawerClasses = classNames({
		[classes.drawer]: true,
		[classes.drawer__active]: isDrawerOpen,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<div className={drawerClasses} {...props}>
			{children}
		</div>
	);
};

export default Drawer;
