import React, { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import classes from "./grid.module.scss";
import classNames from "classnames";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface GridProps extends ComponentPropsWithoutRef<"div"> {
	children: ReactNode;
}

const Grid: FC<GridProps> = ({ children, ...props }) => {
	const gridClasses = classNames({
		[classes.grid]: true,
		[props.className as string]: true,
	});
	delete props.className;
	const [parent] = useAutoAnimate<any>();

	return (
		<div className={gridClasses} {...props} ref={parent}>
			{children}
		</div>
	);
};

export default Grid;
