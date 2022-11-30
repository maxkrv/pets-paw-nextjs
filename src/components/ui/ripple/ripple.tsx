import React, { FC, useLayoutEffect, useState } from "react";
import classes from "./ripple.module.scss";

const useDebouncedRippleCleanUp = (
	rippleCount: number,
	duration: number,
	cleanUpFunction: () => void
) => {
	useLayoutEffect(() => {
		let bounce: string | number | NodeJS.Timeout | undefined = undefined;
		if (rippleCount > 0) {
			clearTimeout(bounce);

			bounce = setTimeout(() => {
				cleanUpFunction();
				clearTimeout(bounce);
			}, duration * 4);
		}

		return () => clearTimeout(bounce);
	}, [rippleCount, duration, cleanUpFunction]);
};
const Ripple: FC<{ duration?: number }> = ({ duration = 500 }) => {
	const [rippleArray, setRippleArray] = useState<
		{ x: number; y: number; size: number }[]
	>([]);

	useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
		setRippleArray([]);
	});

	const addRipple = (event: {
		currentTarget: { getBoundingClientRect: () => any };
		pageX: number;
		pageY: number;
	}) => {
		const rippleContainer = event.currentTarget.getBoundingClientRect();
		const size =
			rippleContainer.width > rippleContainer.height
				? rippleContainer.width
				: rippleContainer.height;
		const x = event.pageX - rippleContainer.x - size / 2;
		const y = event.pageY - rippleContainer.y - size / 2;
		const newRipple = {
			x,
			y,
			size,
		};
		setRippleArray([...rippleArray, newRipple]);
	};

	return (
		<div className={classes.ripple} onMouseDown={addRipple}>
			{rippleArray.length > 0 &&
				rippleArray.map((ripple, index) => {
					return (
						<span
							key={"span" + index}
							style={{
								top: ripple.y,
								left: ripple.x,
								width: ripple.size,
								height: ripple.size,
							}}
						/>
					);
				})}
		</div>
	);
};

export default Ripple;
