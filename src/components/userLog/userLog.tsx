import React, { ComponentPropsWithoutRef, FC } from "react";
import classes from "./userLog.module.scss";
import classNames from "classnames";
import Stack from "../ui/stack/stack";
import UserLogItem from "./userLogItem";
import { useAppSelector } from "../../hooks/redux";
import { Heart, Sad, Smile } from "../../assets/svg";

const UserLog: FC<ComponentPropsWithoutRef<"div">> = ({ ...props }) => {
	const { logs } = useAppSelector((state) => state.userLog);
	const userLogClasses = classNames({
		[classes.userLog]: true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<div className={userLogClasses} {...props}>
			<Stack gap={10} className="!flex-col-reverse">
				{logs.map((log) => (
					<UserLogItem
						time={log.createdAt}
						imageId={log.imageId}
						text={log.message}
						key={log.id}
						icon={
							<>
								{log.value === "favourite" && (
									<Heart className="fill-primary" />
								)}
								{log.value === "like" && (
									<Smile className="fill-success" />
								)}
								{log.value === "dislike" && (
									<Sad className="fill-warning" />
								)}
							</>
						}
					/>
				))}
			</Stack>
		</div>
	);
};

export default UserLog;
