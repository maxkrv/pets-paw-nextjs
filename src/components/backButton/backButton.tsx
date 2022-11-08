import React, { ComponentPropsWithoutRef, FC } from "react";
import Button from "../ui/button/button";
import classNames from "classnames";
import { LeftArrow } from "../../assets/svg";
import { useRouter } from "next/router";

interface BackButtonProps extends ComponentPropsWithoutRef<"button"> {}

const BackButton: FC<BackButtonProps> = ({ ...props }) => {
	const router = useRouter();
	const backButtonClasses = classNames({
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<>
			{router.pathname !== "/" && (
				<Button
					className={backButtonClasses}
					variant="primarySoft"
					onClick={() => router.back()}
					aria-label="back"
					{...props}
				>
					<LeftArrow />
				</Button>
			)}
		</>
	);
};

export default BackButton;
