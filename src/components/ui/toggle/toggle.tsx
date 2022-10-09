import React, { FC } from "react";
import classes from "./toggle.module.scss";
import classNames from "classnames";

interface ToggleProps {
	enabled: boolean;
	setEnabled: (arg0: boolean) => void;
}

const Toggle: FC<ToggleProps> = ({ enabled, setEnabled }) => {
	return (
		<div onClick={() => setEnabled(!enabled)} className={classes.toggle}>
			<span
				aria-hidden="true"
				className={classNames({
					"translate-x-5": enabled,
					"translate-x-1": !enabled,
					[classes.toggle__button]: true,
				})}
			></span>
		</div>
	);
};

export default Toggle;
