import { useRouter } from "next/router";

const getActive = (classToAdd: string, link: string): string | void => {
	const router = useRouter();
	const currentRoute = router.pathname;

	if (currentRoute === link) {
		return `${classToAdd}`;
	}
};

export default getActive;
