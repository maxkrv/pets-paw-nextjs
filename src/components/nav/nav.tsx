import React, { ComponentPropsWithoutRef, FC } from "react";
import classes from "./nav.module.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/button/button";
import getActive from "../../utils/getActive";
import classNames from "classnames";
import { useAppDispatch } from "../../hooks/redux";
import { closeDrawer } from "../../store/reducers/drawerSlice";

interface NavProps extends ComponentPropsWithoutRef<"nav"> {
	text?: string;
}

const Nav: FC<NavProps> = ({ text, ...props }) => {
	const dispatch = useAppDispatch();

	const navClasses = classNames({
		[classes.nav]: true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<nav className={navClasses} {...props}>
			<h3 className={classes.nav__text}>{text}</h3>

			<div className={classes.nav__container}>
				<Link href="/voting">
					<a
						className={`${classes.nav__item} ${getActive(
							classes.nav__item__active,
							"/voting"
						)}`}
						onClick={() => dispatch(closeDrawer())}
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
						onClick={() => dispatch(closeDrawer())}
					>
						<div
							className={`${classes.nav__item__image} bg-success`}
						>
							<Image
								src="/images/pet-breeds.webp"
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
						onClick={() => dispatch(closeDrawer())}
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
