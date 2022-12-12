import React, { ComponentPropsWithRef, FC } from "react";
import classes from "./select.module.scss";
import classNames from "classnames";

const Select: FC<ComponentPropsWithRef<"select">> = ({ ...props }) => {
	const selectClasses = classNames({
		[classes.select]: true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<select className={selectClasses} {...props}>
			{props.children}
		</select>
	);
};

export default Select;
