import React, { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import classes from "./userLogItem.module.scss";
import classNames from "classnames";

export interface UserLogItemProps extends ComponentPropsWithoutRef<"div"> {
	icon?: ReactNode;
	iconPosition?: "start" | "end";
	time?: string;
	text?: string;
	imageId?: string;
	variant?: "gray" | "white";
}

const UserLogItem: FC<UserLogItemProps> = ({
	icon,
	iconPosition = "end",
	time,
	text,
	imageId,
	variant = "gray",
	...props
}) => {
	const userLogItemClasses = classNames({
		[classes.userLogItem]: true,
		["bg-white-soft"]: variant === "gray",
		["bg-white"]: variant === "white",
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<div className={userLogItemClasses} {...props}>
			{iconPosition === "start" && icon}
			{time && <span className={classes.userLogItem__time}>{time}</span>}
			<p
				className={classNames({
					[classes.userLogItem__text]: true,
					["sm:order-1 sm:min-w-full"]: iconPosition === "end",
				})}
			>
				{imageId && (
					<>
						Image ID:{" "}
						<span className="w-fit inline">{imageId}</span>
					</>
				)}{" "}
				{text}
			</p>
			{iconPosition === "end" && icon}
		</div>
	);
};

export default UserLogItem;
