import React, { ComponentPropsWithoutRef, FC } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Paw } from "../assets/svg";

const Logo: FC<ComponentPropsWithoutRef<"a">> = ({ ...props }) => {
	const logoClasses = classNames({
		["inline-flex items-center justify-center gap-1"]: true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<Link href="/">
			<a className={logoClasses} {...props}>
				<Paw />
				<h1 className="font-medium">PetsPaw</h1>
			</a>
		</Link>
	);
};

export default Logo;
