import React, { FC } from "react";
import classes from "./nav.module.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/button/button";
import getActive from "../../utils/getActive";

interface NavProps {
	text?: string;
}

const Nav: FC<NavProps> = ({ text }) => {
	return (
		<nav className={classes.nav}>
			<h3 className={classes.nav__text}>{text}</h3>

			<div className={classes.nav__container}>
				<Link href="/voting">
					<a
						className={`${classes.nav__button} ${getActive(
							classes.nav__button__active,
							"/voting"
						)}`}
					>
						<div className={classes.nav__button__image}>
							<Image
								src="/images/vote-table.svg"
								width={100}
								height={125}
							/>
						</div>
						<Button fullWidth variant="default">
							voting
						</Button>
					</a>
				</Link>
				<Link href="/breeds">
					<a
						className={`${classes.nav__button} ${getActive(
							classes.nav__button__active,
							"/breeds"
						)}`}
					>
						<div className={classes.nav__button__image}>
							<Image
								src="/images/pet-breeds.svg"
								width={117}
								height={163}
							/>
						</div>
						<Button fullWidth variant="default">
							breeds
						</Button>
					</a>
				</Link>
				<Link href="/gallery">
					<a
						className={`${classes.nav__button} ${getActive(
							classes.nav__button__active,
							"/gallery"
						)}`}
					>
						<div className={classes.nav__button__image}>
							<Image
								src="/images/images-search.svg"
								width={112}
								height={190}
							/>
						</div>
						<Button fullWidth variant="default">
							gallery
						</Button>
					</a>
				</Link>
			</div>
		</nav>
	);
};

export default Nav;
