import React, { useEffect, useState } from "react";
import { Moon } from "../../assets/svg";
import Toggle from "../ui/toggle/toggle";
import { useTheme } from "next-themes";

const DarkModeSwitcher = () => {
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

	return (
		<div className="flex items-center gap-2">
			<div className="h-6 w-6 flex items-center justify-center rounded-full bg-white">
				<Moon />
			</div>
			<Toggle enabled={enabled} setEnabled={setEnabled} />
		</div>
	);
};

export default DarkModeSwitcher;
