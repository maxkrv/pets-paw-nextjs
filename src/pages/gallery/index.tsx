import React, { useState } from "react";
import { NextPage } from "next";
import classes from "./gallery.module.scss";
import Container from "../../components/container/container";
import ContainerHeader from "../../components/containerHeader/containerHeader";
import Button from "../../components/ui/button/button";
import { Arrow, Close, Refresh, Upload } from "../../assets/svg";
import dynamic from "next/dynamic";
import { useAppDispatch } from "../../hooks/redux";
import { closeModal, openModal } from "../../store/reducers/modalSlice";
import { useQuery } from "@tanstack/react-query";
import { BreedService } from "../../service/breed.service";
import { Breed } from "../../types/breed";
import { getImageResponse, ImageService } from "../../service/image.service";
import splitIntoChunks from "../../utils/splitIntoChunks";
import Select from "../../components/ui/select/select";
import Loader from "../../components/ui/loader/loader";
import Grid from "../../components/grid/grid";
import GridItem from "../../components/grid/gridItem";
import Image from "next/image";
import UserLogItem from "../../components/userLog/userLogItem";
import UploadPage from "../../components/uploadPage/uploadPage";

interface IOptions {
	order: "ASC" | "DESC" | "RANDOM";
	mime_types: "all" | "gif" | "jpg" | "png";
	breed_ids: string;
	limit: number;
	page: number;
}

const DynamicModal = dynamic(() => import("../../components/ui/modal/modal"));

const Gallery: NextPage = () => {
	const dispatch = useAppDispatch();

	const [options, setOptions] = useState<IOptions>({
		order: "RANDOM",
		mime_types: "all",
		breed_ids: "",
		limit: 5,
		page: 0,
	});

	const breeds = useQuery<Breed[], any, Breed[], any>({
		queryKey: ["breeds"],
		queryFn: () => BreedService.getBreeds({}, "data"),
		select: (data: Breed[]) => data.filter((breed) => breed.image),
	});
	const {
		data,
		isLoading: ImageLoading,
		isFetching,
		refetch,
	} = useQuery<getImageResponse[], any, getImageResponse[][], any>({
		queryKey: ["images", options.page],
		queryFn: () =>
			ImageService.getImages(
				{
					...options,
					has_breeds: options.breed_ids ? 1 : 0,
				},
				"data"
			),
		select: (data: getImageResponse[]) => splitIntoChunks(data, 10),
	});
	const imageHeaders = useQuery<any, any, any, any>({
		queryKey: ["imagesHeaders", options.page],
		queryFn: () =>
			ImageService.getImages(
				{
					...options,
					has_breeds: options.breed_ids ? 1 : 0,
					order: "ASC",
				},
				"headers"
			),
	});
	const isLoading =
		ImageLoading ||
		isFetching ||
		breeds.isLoading ||
		breeds.isFetching ||
		imageHeaders.isLoading ||
		imageHeaders.isFetching;

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setOptions({ ...options, page: 0 });
		refetch();
		imageHeaders.refetch();
	};

	return (
		<>
			<Container className="!static">
				<ContainerHeader className="flex-wrap" title="gallery">
					<Button
						className="ml-auto h-[40px] !px-[30px] sm:min-w-full"
						variant="primarySoft"
						disabled={isLoading}
						onClick={() => dispatch(openModal())}
					>
						<Upload />
						upload
					</Button>
				</ContainerHeader>

				<form className={classes.gallery__options} onSubmit={onSubmit}>
					<div>
						<div className={classes.gallery__options__title}>
							order
						</div>
						<Select
							className={classes.gallery__options__select}
							value={options.order}
							onChange={(e) =>
								setOptions({
									...options,
									order: e.target.value as IOptions["order"],
								})
							}
							disabled={isLoading}
						>
							<option value="RANDOM">Random</option>
							<option value="ASC">Ascending</option>
							<option value="DESC">Descending</option>
						</Select>
					</div>
					<div>
						<div className={classes.gallery__options__title}>
							type
						</div>
						<Select
							className={classes.gallery__options__select}
							value={options.mime_types}
							onChange={(e) =>
								setOptions({
									...options,
									mime_types: e.target
										.value as IOptions["mime_types"],
								})
							}
							disabled={isLoading}
						>
							<option value="all">All</option>
							<option value="gif">Gif</option>
							<option value="jpg">Jpg</option>
							<option value="png">Png</option>
						</Select>
					</div>
					<div>
						<div className={classes.gallery__options__title}>
							breed
						</div>
						<Select
							className={classes.gallery__options__select}
							value={options.breed_ids}
							onChange={(e) =>
								setOptions({
									...options,
									breed_ids: e.target.value,
								})
							}
							disabled={isLoading}
						>
							<option value="">All</option>
							{breeds.data?.map((breed) => (
								<option key={breed.id} value={breed.id}>
									{breed.name}
								</option>
							))}
						</Select>
					</div>
					<div>
						<div className={classes.gallery__options__title}>
							limit
						</div>
						<div className="flex gap-[10px] sm:flex-wrap">
							<Select
								className={classes.gallery__options__select}
								value={options.limit}
								onChange={(e) =>
									setOptions({
										...options,
										limit: +e.target.value,
									})
								}
								disabled={isLoading}
							>
								<option value="5">5 items per page</option>
								<option value="10">10 items per page</option>
								<option value="15">15 items per page</option>
								<option value="20">20 items per page</option>
							</Select>
							<Button
								variant="default"
								className="!h-[40px] !w-[44px] dark:!bg-black sm:min-w-full"
								disabled={isLoading}
							>
								<Refresh />
							</Button>
						</div>
					</div>
				</form>

				{isLoading ? (
					<Loader className="!block !mt-[20px] !mx-auto" />
				) : data?.length ? (
					data?.map((grid, i) => (
						<Grid className="mt-[20px] w-full" key={i}>
							{grid.map((item) => (
								<GridItem component="div" key={item.id}>
									<Image
										src={item.url}
										layout="fill"
										placeholder="blur"
										blurDataURL={item.url}
										alt={item.id}
									/>
								</GridItem>
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
								setOptions({
									...options,
									page: options.page - 1,
								})
							}
						>
							<Arrow /> prev
						</Button>
						<Button
							variant="primarySoft"
							disabled={
								isLoading ||
								options.page ===
									Math.floor(
										imageHeaders.data!["pagination-count"] /
											options.limit
									)
							}
							onClick={() =>
								setOptions({
									...options,
									page: options.page + 1,
								})
							}
						>
							next <Arrow className="rotate-180" />
						</Button>
					</div>
				)}
			</Container>

			<DynamicModal
				className="flex p-[30px] sm:p-[20px]"
				aria-modal={true}
			>
				<Container
					className="ml-auto !mt-0 !w-2/4 !bg-white-soft dark:!bg-black-soft xl:!w-full"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex justify-end">
						<Button
							className="dark:!bg-[#333333]"
							variant="default"
							onClick={() => dispatch(closeModal())}
						>
							<Close />
						</Button>
					</div>
					<UploadPage />
				</Container>
			</DynamicModal>
		</>
	);
};

export default Gallery;
