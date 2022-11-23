import React, {
	ComponentPropsWithoutRef,
	FC,
	useEffect,
	useState,
} from "react";
import { Moon } from "../../assets/svg";
import Toggle from "../ui/toggle/toggle";
import { useTheme } from "next-themes";
import classNames from "classnames";

const DarkModeSwitcher: FC<ComponentPropsWithoutRef<"div">> = ({
	...props
}) => {
	const [enabled, setEnabled] = useState<boolean>(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setEnabled(theme === "dark");
	}, []);

	useEffect(() => {
		if (enabled) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}, [theme, enabled]);

	const darkModeSwitcherClasses = classNames({
		["flex items-center gap-2"]: true,
		[props.className as string]: true,
	});
	delete props.className;

	return (
		<div className={darkModeSwitcherClasses}>
			<div className="h-6 w-6 flex items-center justify-center rounded-full bg-white">
				<Moon />
			</div>
			<Toggle enabled={enabled} setEnabled={setEnabled} />
		</div>
	);
};

export default DarkModeSwitcher;
