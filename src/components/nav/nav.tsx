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
						className={`${classes.nav__item} ${getActive(
							classes.nav__item__active,
							"/voting"
						)}`}
					>
						<div
							className={`${classes.nav__item__image} bg-purple`}
						>
							<Image
								src="/images/vote-table.svg"
								alt="voting"
								width={100}
								height={125}
							/>
						</div>
						<Button
							fullWidth
							component="div"
							className={classes.nav__item__button}
							variant="default"
						>
							voting
						</Button>
					</a>
				</Link>
				<Link href="/breeds">
					<a
						className={`${classes.nav__item} ${getActive(
							classes.nav__item__active,
							"/breeds"
						)}`}
					>
						<div
							className={`${classes.nav__item__image} bg-success`}
						>
							<Image
								src="/images/pet-breeds.svg"
								alt="breeds"
								width={117}
								height={163}
							/>
						</div>
						<Button
							fullWidth
							component="div"
							className={classes.nav__item__button}
							variant="default"
						>
							breeds
						</Button>
					</a>
				</Link>
				<Link href="/gallery">
					<a
						className={`${classes.nav__item} ${getActive(
							classes.nav__item__active,
							"/gallery"
						)}`}
					>
						<div
							className={`${classes.nav__item__image} bg-warning`}
						>
							<Image
								src="/images/images-search.svg"
								alt="gallery"
								width={112}
								height={190}
							/>
						</div>
						<Button
							fullWidth
							component="div"
							className={classes.nav__item__button}
							variant="default"
						>
							gallery
						</Button>
					</a>
				</Link>
			</div>
		</nav>
	);
};

export default Nav;
