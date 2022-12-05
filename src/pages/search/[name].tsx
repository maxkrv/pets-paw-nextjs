import React, { useEffect } from "react";
import { NextPage } from "next";
import Container from "../../components/container/container";
import ContainerHeader from "../../components/containerHeader/containerHeader";
import { useQueries, useQuery } from "@tanstack/react-query";
import { BreedService } from "../../service/breed.service";
import { ImageService } from "../../service/image.service";
import splitIntoChunks from "../../utils/splitIntoChunks";
import Loader from "../../components/ui/loader/loader";
import Grid from "../../components/grid/grid";
import GridItem from "../../components/grid/gridItem";
import UserLogItem from "../../components/userLog/userLogItem";
import Image from "next/image";

const Search: NextPage<{ name: any }> = ({ name }) => {
	const breed = useQuery({
		queryKey: ["breed"],
		queryFn: () => BreedService.getBreedByName(name),
		refetchOnMount: true,
	});
	const breeds = !breed.isLoading || !breed.isFetching ? breed.data : [];

	const images = useQueries({
		queries: breeds!.map((breed) => {
			return {
				queryKey: ["images", breed.reference_image_id],
				queryFn: () =>
					ImageService.getImageById(breed.reference_image_id),
				enabled: !!breed,
			};
		}),
	});

	const data = splitIntoChunks(
		images
			.map((item) => item.data)
			.filter((item) => typeof item !== "undefined"),
		10
	);

	useEffect(() => {
		breed.refetch();
	}, [name]);

	return (
		<Container>
			<ContainerHeader title="search" />
			{!breed.isLoading ||
				(!breed.isFetching && (
					<div className="text-gray-dark">
						Search results for:{" "}
						<span className="mb-[20px] font-medium text-black dark:text-white">
							{name}
						</span>
					</div>
				))}
			{breed.isLoading || breed.isFetching ? (
				<Loader centered />
			) : breed.data?.length ? (
				data.map((grid, i) => (
					<Grid className="mt-[20px] w-full" key={i}>
						{grid.map((item) => (
							<GridItem
								component="div"
								tabIndex="0"
								isHoverable
								title={item!.breeds![i].name}
								key={item?.id}
							>
								<Image
									src={item!.url}
									layout="fill"
									placeholder="blur"
									blurDataURL={item!.url}
								/>
							</GridItem>
						))}
					</Grid>
				))
			) : (
				<UserLogItem text="No item found" />
			)}
		</Container>
	);
};

Search.getInitialProps = async ({ query }) => {
	const { name } = query;

	return { name };
};

export default Search;
