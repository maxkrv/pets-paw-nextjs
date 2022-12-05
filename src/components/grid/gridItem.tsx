import React, { ComponentProps, ElementType, ReactNode } from "react";
import classes from "./gridItem.module.scss";
import classNames from "classnames";

type GridItemOwnProps<E extends ElementType = ElementType> = {
	children: ReactNode;
	component?: E;
	isHoverable?: boolean;
	actionButton?: ReactNode;
	title?: ReactNode;
};

export type GridItemProps<E extends ElementType> = GridItemOwnProps<E> &
	Omit<ComponentProps<E>, keyof GridItemOwnProps>;

const defaultElement = "div";

function GridItem<E extends ElementType = typeof defaultElement>(
	{
		children,
		component,
		isHoverable,
		actionButton,
		title,
		...props
	}: GridItemProps<E>,
	ref: React.Ref<GridItemProps<E>>
) {
	const TagName = component || defaultElement;
	const buttonClasses = classNames({
		[classes.grid__item]: true,
		[classes.grid__item__hover]: isHoverable,
		[props.className]: true,
	});
	delete props.className;

	return (
		<TagName className={buttonClasses} {...ref} {...props}>
			{children}
			{isHoverable && (
				<>
					<div className={classes.grid__item__wrapper}>
						<div className={classes.grid__item__action}>
							{actionButton}
						</div>
					</div>

					<div className={classes.grid__item__title}>{title}</div>
				</>
			)}
		</TagName>
	);
}

export default React.forwardRef(GridItem);
