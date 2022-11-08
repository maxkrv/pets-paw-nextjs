import React, { ComponentPropsWithoutRef, FC } from "react";
import classes from "./header.module.scss";
import classNames from "classnames";
import SearchBar from "../search/searchBar";
import Link from "next/link";
import Button from "../ui/button/button";
import { Heart, Sad, Smile } from "../../assets/svg";
import getActive from "../../utils/getActive";

interface HeaderProps extends ComponentPropsWithoutRef<"header"> {}

const Header: FC<HeaderProps> = ({ ...props }) => {
	const headerClasses = classNames({
		[classes.header]: true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<header className={headerClasses} {...props}>
			<SearchBar className="flex-1" />
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
	);
};

export default Header;
