import React, { ComponentPropsWithoutRef, FC } from "react";
import classes from "./modal.module.scss";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { closeModal } from "../../../store/reducers/modalSlice";

const Modal: FC<ComponentPropsWithoutRef<"div">> = ({ ...props }) => {
	const dispatch = useAppDispatch();

	const { isModalOpen } = useAppSelector((state) => state.modal);

	const modalClasses = classNames({
		[classes.modal]: true,
		[classes.active]: isModalOpen,
		[props.className as string]: props.className,
	});
	delete props.className;

	return (
		<div className={modalClasses} onClick={() => dispatch(closeModal())}>
			{props.children}
		</div>
	);
};

export default Modal;
