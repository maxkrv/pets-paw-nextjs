import React, { ComponentPropsWithoutRef, FC, useEffect } from "react";
import classes from "./header.module.scss";
import classNames from "classnames";
import SearchBar from "../search/searchBar";
import Link from "next/link";
import Button from "../ui/button/button";
import { BurgerMenu, Close, Heart, Sad, Smile } from "../../assets/svg";
import getActive from "../../utils/getActive";
import { useAppDispatch } from "../../hooks/redux";
import { closeDrawer, openDrawer } from "../../store/reducers/drawerSlice";
import dynamic from "next/dynamic";
import useMediaQuery from "../../hooks/useMediaQuery";
import Nav from "../nav/nav";
import Logo from "../logo";
import DarkModeSwitcher from "../darkModeSwitcher/darkModeSwitcher";
import Socials from "../socials/socials";

interface HeaderProps extends ComponentPropsWithoutRef<"header"> {}

const DynamicDrawer = dynamic(() => import("../ui/drawer/drawer"));

const Header: FC<HeaderProps> = ({ ...props }) => {
	const dispatch = useAppDispatch();

	const headerClasses = classNames({
		[classes.header]: true,
		[props.className as string]: true,
	});
	delete props.className;

	const xl = useMediaQuery("(max-width: 1280px)");

	useEffect(() => {
		if (!xl) {
			dispatch(closeDrawer());
		}
	}, [xl]);

	return (
		<>
			<header className={headerClasses} {...props}>
				<Button
					className="!hidden !px-[15px] !rounded-[20px] !mr-auto xl:!block"
					variant="default"
					aria-label="open menu"
					onClick={() => dispatch(openDrawer())}
				>
					<BurgerMenu />
				</Button>
				<SearchBar className="flex-1 sm:order-4 sm:min-w-full" />
				<Link href="/likes" passHref>
					<Button
						className={getActive(classes.active, "/likes")}
						component="a"
						variant="default"
						aria-label="likes"
					>
						<Smile />
					</Button>
				</Link>
				<Link href="/favourites" passHref>
					<Button
						className={getActive(classes.active, "/favourites")}
						component="a"
						variant="default"
						aria-label="favourites"
					>
						<Heart />
					</Button>
				</Link>
				<Link href="/dislikes" passHref>
					<Button
						className={getActive(classes.active, "/dislikes")}
						component="a"
						variant="default"
						aria-label="dislikes"
					>
						<Sad />
					</Button>
				</Link>
			</header>

			{xl && (
				<DynamicDrawer className="bg-gray dark:bg-black">
					<div className="p-[20px]">
						<div className="w-full flex">
							<Logo
								className="mr-auto"
								onClick={() => dispatch(closeDrawer())}
							/>
							<DarkModeSwitcher />
							<Button
								className="h-[60px] w-[60px] ml-[10px] !rounded-[20px]"
								variant="default"
								aria-label="close menu"
								onClick={() => dispatch(closeDrawer())}
							>
								<Close />
							</Button>
						</div>
						<Nav className="flex justify-center sm:block" />

						<Socials className="mt-[20px] justify-center" />
					</div>
				</DynamicDrawer>
			)}
		</>
	);
};

export default Header;
