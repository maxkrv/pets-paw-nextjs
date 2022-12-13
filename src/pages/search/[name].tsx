import React from "react";
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
import Link from "next/link";

const Search: NextPage<{ name: string }> = ({ name }) => {
	const breed = useQuery({
		queryKey: ["breed", name],
		queryFn: () => BreedService.getBreedByName(name),
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
							<Link
								href={`../breeds/${item?.breeds![0]?.id}`}
								passHref
								key={item?.id}
							>
								<GridItem
									component="a"
									tabIndex="1"
									isHoverable
									title={item?.breeds![0].name}
								>
									<Image
										src={item?.url || ""}
										layout="fill"
										placeholder="blur"
										blurDataURL={item?.url}
										alt={item?.breeds![0].name}
									/>
								</GridItem>
							</Link>
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
