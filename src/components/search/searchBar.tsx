import React, {
	ComponentPropsWithoutRef,
	FC,
	useEffect,
	useState,
} from "react";
import classNames from "classnames";
import classes from "./searchBar.module.scss";
import Button from "../ui/button/button";
import { Search } from "../../assets/svg";
import { useRouter } from "next/router";

interface SearchBarProps extends ComponentPropsWithoutRef<"form"> {}

const SearchBar: FC<SearchBarProps> = ({ ...props }) => {
	const router = useRouter();
	const name = router.query.name as string;
	const [value, setValue] = useState<string>();
	const [focus, setFocus] = useState<boolean>(false);
	const searchClasses = classNames({
		[classes.search]: true,
		[classes.search__active]: focus,
		[props.className as string]: true,
	});
	delete props.className;

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (value) {
			await router.push(`/search/${value}`);
		}
	};

	useEffect(() => {
		if (router.pathname === "/search/[name]") {
			setValue(name);
		}
	}, [router]);

	return (
		<form className={searchClasses} onSubmit={(e) => onSubmit(e)}>
			<input
				type="text"
				className={classes.search__input}
				placeholder="Search for breeds by name"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			/>
			<Button variant="primarySoft" aria-label="search">
				<Search />
			</Button>
		</form>
	);
};

export default SearchBar;
