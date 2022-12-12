import React, { useState } from "react";
import { NextPage } from "next";
import Container from "../../components/container/container";
import ContainerHeader from "../../components/containerHeader/containerHeader";
import Select from "../../components/ui/select/select";
import Button from "../../components/ui/button/button";
import { Arrow, ASC, DESC } from "../../assets/svg";
import { useQuery } from "@tanstack/react-query";
import { BreedService } from "../../service/breed.service";
import { getImageResponse, ImageService } from "../../service/image.service";
import splitIntoChunks from "../../utils/splitIntoChunks";
import Grid from "../../components/grid/grid";
import GridItem from "../../components/grid/gridItem";
import Image from "next/image";
import Loader from "../../components/ui/loader/loader";
import UserLogItem from "../../components/userLog/userLogItem";
import Link from "next/link";
import { Breed } from "../../types/breed";

interface IOptions {
	breed: string;
	limit: number;
	order: "ASC" | "DESC";
	page: number;
}

const Breeds: NextPage = () => {
	const [options, setOptions] = useState<IOptions>({
		breed: "",
		limit: 5,
		order: "ASC",
		page: 0,
	});

	const breedsOptions = useQuery<Breed[], any, Breed[], any>({
		queryKey: ["breedsOptions"],
		queryFn: () => BreedService.getBreeds({}, "data"),
		select: (data: Breed[]) => data.filter((breed) => breed.image),
	});
	const breeds = useQuery<Breed[][], any, Breed[][], any>({
		queryKey: ["breeds", options],
		queryFn: () =>
			BreedService.getBreeds(
				{
					limit: options.limit,
					order: options.order,
					page: options.page,
				},
				"data"
			),
		select: (data: Breed[]) =>
			splitIntoChunks(
				data.filter((breed) => breed.image),
				10
			),
	});
	const breedsHeaders = useQuery<Breed[], any, any, any>({
		queryKey: ["breedsHeaders", options],
		queryFn: () =>
			BreedService.getBreeds(
				{
					limit: options.limit,
					order: options.order,
					page: options.page,
				},
				"headers"
			),
	});

	const images = useQuery<
		getImageResponse[][],
		any,
		getImageResponse[][],
		any
	>({
		queryKey: ["images", options],
		queryFn: () =>
			ImageService.getImages({
				has_breeds: 1,
				limit: options.limit,
				breed_ids: options.breed,
				order: options.order,
				page: options.page,
			}),
		select: (data: getImageResponse[]) => splitIntoChunks(data, 10),
	});
	const imagesHeaders = useQuery<getImageResponse[], any, any, any>({
		queryKey: ["imagesHeaders", options],
		queryFn: () =>
			ImageService.getImages(
				{
					has_breeds: 1,
					limit: options.limit,
					breed_ids: options.breed,
					order: options.order,
					page: options.page,
				},
				"headers"
			),
	});

	const data = options.breed ? images.data : breeds.data;
	const paginationLimit = Math.floor(
		(options.breed
			? imagesHeaders.data?.["pagination-count"]
			: breedsHeaders.data?.["pagination-count"]) / options.limit
	);
	const isLoading =
		breedsOptions.isLoading ||
		breedsOptions.isFetching ||
		breeds.isLoading ||
		breeds.isFetching ||
		breedsHeaders.isLoading ||
		breedsHeaders.isFetching ||
		images.isLoading ||
		images.isFetching ||
		imagesHeaders.isLoading ||
		imagesHeaders.isFetching;

	return (
		<Container>
			<ContainerHeader className="flex-wrap" title="breeds">
				<Select
					value={options.breed}
					onChange={(e) =>
						setOptions({
							...options,
							breed: e.target.value,
							page: 0,
						})
					}
					className="flex-1 sm:min-w-full"
					disabled={isLoading}
				>
					<option value="">All Breeds</option>
					{breedsOptions.data?.map((breed) => (
						<option key={breed.id} value={breed.id}>
							{breed.name}
						</option>
					))}
				</Select>
				<Select
					value={options.limit}
					onChange={(e) =>
						setOptions({
							...options,
							limit: +e.target.value,
							page: 0,
						})
					}
					className="flex-1"
					disabled={isLoading}
				>
					<option value="5">Limit 5</option>
					<option value="10">Limit 10</option>
					<option value="15">Limit 15</option>
					<option value="20">Limit 20</option>
				</Select>
				<Button
					className="h-[40px]"
					variant="gray"
					aria-label="descending order"
					onClick={() =>
						setOptions({
							...options,
							order: "DESC",
							breed: "",
							page: 0,
						})
					}
					disabled={isLoading}
				>
					<DESC />
				</Button>
				<Button
					className="h-[40px]"
					variant="gray"
					aria-label="ascending order"
					onClick={() =>
						setOptions({
							...options,
							order: "ASC",
							breed: "",
							page: 0,
						})
					}
					disabled={isLoading}
				>
					<ASC />
				</Button>
			</ContainerHeader>

			{isLoading ? (
				<Loader centered />
			) : data?.length ? (
				data.map((grid, i) => (
					<Grid className="mt-[20px] w-full" key={i}>
						{grid.map((item: any) => (
							<Link
								key={item.id}
								href={`breeds/${
									options.breed ? item?.breeds[0].id : item.id
								}`}
								passHref
							>
								<GridItem
									component="a"
									isHoverable
									title={
										options.breed
											? item?.breeds[0].name
											: item.name
									}
								>
									<Image
										src={
											options.breed
												? item.url
												: item?.image.url
										}
										layout="fill"
										placeholder="blur"
										blurDataURL={
											options.breed
												? item.url
												: item?.image.url
										}
										alt={
											options.breed
												? item?.breeds[0].name
												: item.name
										}
									/>
								</GridItem>
							</Link>
						))}
					</Grid>
				))
			) : (
				<UserLogItem className="mt-[20px]" text="No item found" />
			)}

			{!isLoading && (
				<div className="mt-[20px] flex items-center justify-evenly">
					<Button
						variant="primarySoft"
						disabled={isLoading || options.page === 0}
						onClick={() =>
							setOptions({ ...options, page: options.page - 1 })
						}
					>
						<Arrow /> prev
					</Button>
					<Button
						variant="primarySoft"
						disabled={isLoading || options.page === paginationLimit}
						onClick={() =>
							setOptions({ ...options, page: options.page + 1 })
						}
					>
						next <Arrow className="rotate-180" />
					</Button>
				</div>
			)}
		</Container>
	);
};

export default Breeds;
