import React from "react";
import { NextPage } from "next";
import Container from "../../components/container/container";
import ContainerHeader from "../../components/containerHeader/containerHeader";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import splitIntoChunks from "../../utils/splitIntoChunks";
import { FavouriteService } from "../../service/favourite.service";
import Loader from "../../components/ui/loader/loader";
import Grid from "../../components/grid/grid";
import GridItem from "../../components/grid/gridItem";
import Image from "next/image";
import UserLogItem from "../../components/userLog/userLogItem";
import UserLog from "../../components/userLog/userLog";
import Button from "../../components/ui/button/button";
import { HeartFilled } from "../../assets/svg";
import { setIsFavourite } from "../../store/reducers/isFavouriteSlice";
import { setLog } from "../../store/reducers/userLogSlice";
import { GetResponse } from "../../types/getResponse";

const Favourites: NextPage = () => {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const { id } = useAppSelector((state) => state.id);
	const { favouriteId } = useAppSelector((state) => state.isFavourite);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["favourites"],
		queryFn: () => FavouriteService.getFavourites({ sub_id: id! }),
		select: (data) => splitIntoChunks(data, 10),
	});
	const removeFavourite = useMutation<
		{ message: string },
		any,
		{ favourite_id: number }
	>({
		mutationFn: ({ favourite_id }) =>
			FavouriteService.removeFavourite({ favourite_id }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["favourites"] });
		},
	});

	const removeFavouriteHandler = (item: GetResponse) => {
		removeFavourite.mutate({
			favourite_id: item.id,
		});

		dispatch(
			setLog({
				createdAt: `${new Date().getHours()}:${new Date().getMinutes()}`,
				imageId: item.image_id,
				message: "was removed from Favourites",
			}),
		);

		if (item.id === favouriteId) {
			dispatch(setIsFavourite({ value: false, id: item.id }));
		}
	};

	const isItemLoading = removeFavourite.isLoading || isFetching || isLoading;

	return (
		<Container className="h-full w-full relative">
			<ContainerHeader title="favourites" />
			{isLoading ? (
				<Loader centered />
			) : data?.length ? (
				data?.map((grid, i) => (
					<Grid className="mt-[20px] w-full" key={i}>
						{grid.map((item) => (
							<GridItem
								isHoverable
								tabIndex={0}
								actionButton={
									<Button
										variant="default"
										className="h-[40px] w-[40px]"
										aria-label="remove from favourite"
										disabled={isItemLoading}
										onClick={() =>
											removeFavouriteHandler(item)
										}
									>
										{isItemLoading &&
										removeFavourite.variables
											?.favourite_id === item.id ? (
											<Loader className="!h-5 !w-5 !border-2" />
										) : (
											<HeartFilled className="!fill-primary" />
										)}
									</Button>
								}
								key={item.id}
							>
								<Image
									src={item.image!.url}
									layout="fill"
									placeholder="blur"
									blurDataURL={item.image!.url}
									alt="favourite image"
								/>
							</GridItem>
						))}
					</Grid>
				))
			) : (
				<UserLogItem text="No item found" />
			)}

			{!isLoading && <UserLog className="mt-[20px]" />}
		</Container>
	);
};

export default Favourites;
