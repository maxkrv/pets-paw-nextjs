import React, { ComponentPropsWithoutRef, FC } from "react";
import Logo from "../logo";
import DarkModeSwitcher from "../darkModeSwitcher/darkModeSwitcher";
import Nav from "../nav/nav";

interface AsideProps extends ComponentPropsWithoutRef<"aside"> {}

const Aside: FC<AsideProps> = ({ ...props }) => {
	return (
		<aside className="h-full m-auto sm:w-full" {...props}>
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
		</aside>
	);
};

export default Aside;
