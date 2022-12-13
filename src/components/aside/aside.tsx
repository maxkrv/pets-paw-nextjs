import React, { ComponentPropsWithoutRef, FC } from "react";
import Logo from "../logo";
import DarkModeSwitcher from "../darkModeSwitcher/darkModeSwitcher";
import Nav from "../nav/nav";
import classNames from "classnames";
import Socials from "../socials/socials";

interface AsideProps extends ComponentPropsWithoutRef<"aside"> {}

const Aside: FC<AsideProps> = ({ ...props }) => {
	const asideClasses = classNames({
		"h-full m-auto sm:w-full": true,
		[props.className as string]: true,
	});

	delete props.className;

	return (
		<aside className={asideClasses} {...props}>
			<div className="w-full flex justify-between">
				<Logo />
				<DarkModeSwitcher />
			</div>

			<div className="mt-[80px] mb-[60px]">
				<h2 className="font-medium text-[44px] leading-[58px]">
					Hello!
				</h2>
				<h2 className="text-gray-dark text-[20px]">
					Explore cats and have fun
				</h2>
			</div>

			<Nav text="Lets start using The Cat API" />

			<Socials className="mt-[20px] justify-center" />
		</aside>
	);
};

export default Aside;
