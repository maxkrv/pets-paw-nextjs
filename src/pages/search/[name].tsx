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
import UserLogItem from "../../components/userLog/userLogItem";
import GridItem from "../../components/grid/gridItem";
import Image from "next/image";

const Search: NextPage<{ name: string }> = ({ name }) => {
	const breed = useQuery({
		queryKey: ["breed"],
		queryFn: () => BreedService.getBreedByName(name),
		refetchOnMount: true,
		select: (data) => data.filter((breed) => breed.reference_image_id),
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
		images.map((item) => item.data),
		10
	);
	const isLoading =
		images.some((item) => item.isLoading) ||
		images.some((item) => item.isFetching) ||
		breed.isLoading ||
		breed.isFetching;

	useEffect(() => {
		breed.refetch();
	}, [name]);

	return (
		<Container>
			<ContainerHeader title="search" />

			{isLoading ? null : (
				<div className="text-gray-dark">
					Search results for:{" "}
					<span className="mb-[20px] font-medium text-black dark:text-white">
						{name}
					</span>
				</div>
			)}

			{isLoading ? (
				<Loader centered />
			) : breed.data?.length ? (
				data.map((grid, i) => (
					<Grid className="mt-[20px] w-full" key={i}>
						{grid.map((item) => (
							<GridItem
								component="div"
								tabIndex="0"
								isHoverable
								title={item?.breeds![0].name}
								key={item?.id}
							>
								<Image
									src={item?.url || ""}
									layout="fill"
									placeholder="blur"
									blurDataURL={item?.url}
								/>
							</GridItem>
						))}
					</Grid>
				))
			) : (
				<UserLogItem className="mt-[20px]" text="No item found" />
			)}
		</Container>
	);
};

Search.getInitialProps = async ({ query }) => {
	const { name } = query as { name: string };

	return { name };
};

export default Search;
