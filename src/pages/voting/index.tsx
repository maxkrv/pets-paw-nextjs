import React, { useEffect } from "react";
import classes from "./voting.module.scss";
import { NextPage } from "next";
import Container from "../../components/container/container";
import ContainerHeader from "../../components/containerHeader/containerHeader";
import Image from "next/image";
import Button from "../../components/ui/button/button";
import { Heart, HeartFilled, Sad, Smile } from "../../assets/svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getImageResponse, ImageService } from "../../service/image.service";
import Loader from "../../components/ui/loader/loader";
import { SetVoteServiceParams, VoteService } from "../../service/vote.service";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { SetResponse } from "../../types/setResponse";
import { SetParams } from "../../types/setParams";
import { FavouriteService } from "../../service/favourite.service";
import UserLog from "../../components/userLog/userLog";
import { setLog } from "../../store/reducers/userLogSlice";
import { setIsFavourite } from "../../store/reducers/isFavouriteSlice";

const Voting: NextPage = () => {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const { id } = useAppSelector((state) => state.id);
	const { isFavourite, favouriteId } = useAppSelector(
		(state) => state.isFavourite
	);

	const { data, isLoading, isFetching } = useQuery<
		getImageResponse[],
		any,
		getImageResponse[],
		any
	>({
		queryKey: ["image"],
		queryFn: () =>
			ImageService.getImages({
				limit: 1,
			}),
		refetchOnMount: false,
	});
	const setVote = useMutation<SetResponse, any, SetVoteServiceParams>({
		mutationFn: ({ image_id, sub_id, value }) =>
			VoteService.setVote({
				image_id,
				sub_id,
				value,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["image"] });
		},
		onMutate: () => {
			dispatch(setIsFavourite({ value: false, id: null }));
		},
	});
	const setFavourite = useMutation<SetResponse, any, SetParams>({
		mutationFn: ({ image_id, sub_id }) =>
			FavouriteService.setFavourite({
				image_id,
				sub_id,
			}),
		onSuccess: () => {
			dispatch(
				setIsFavourite({
					value: true,
				})
			);
			dispatch(
				setLog({
					createdAt: `${new Date().getHours()}:${new Date().getMinutes()}`,
					imageId: data![0].id,
					message: "was added to Favourites",
					value: "favourite",
				})
			);
		},
	});
	const removeFavourite = useMutation<
		{ message: string },
		any,
		{ favourite_id: number }
	>({
		mutationFn: ({ favourite_id }) =>
			FavouriteService.removeFavourite({
				favourite_id,
			}),
		onSuccess: () => {
			dispatch(setIsFavourite({ value: false, id: null }));
			dispatch(
				setLog({
					createdAt: `${new Date().getHours()}:${new Date().getMinutes()}`,
					imageId: data![0].id,
					message: "was removed from Favourites",
				})
			);
		},
	});
	const voteHandler = (value: 0 | 1): void => {
		setVote.mutate({
			image_id: data![0].id,
			sub_id: id ? id : "",
			value: value,
		});

		if (value === 1) {
			dispatch(
				setLog({
					createdAt: `${new Date().getHours()}:${new Date().getMinutes()}`,
					imageId: data![0].id,
					message: "was added to Likes",
					value: "like",
				})
			);
		} else {
			dispatch(
				setLog({
					createdAt: `${new Date().getHours()}:${new Date().getMinutes()}`,
					imageId: data![0].id,
					message: "was added to Dislikes",
					value: "dislike",
				})
			);
		}
	};
	const loading = isLoading || isFetching || setVote.isLoading;

	useEffect(() => {
		dispatch(
			setIsFavourite({
				value: isFavourite,
				id: setFavourite.data?.id ? setFavourite.data?.id : favouriteId,
			})
		);
	}, [setFavourite.data]);

	return (
		<Container className="max-w-full">
			<ContainerHeader title="voting" />
			<div className={classes.voting}>
				<div
					className={classes.voting__image}
					style={{
						width: `${data?.[0]?.width}px`,
					}}
				>
					{loading ? (
						<Loader />
					) : (
						<Image
							src={data?.[0].url ? data?.[0].url : ""}
							layout="fill"
							priority
							placeholder="blur"
							blurDataURL={data?.[0].url ? data?.[0].url : ""}
							alt="voting image"
						/>
					)}
				</div>
				<div className={classes.voting__buttons}>
					<Button
						disabled={
							loading ||
							setFavourite.isLoading ||
							removeFavourite.isLoading
						}
						onClick={() => {
							voteHandler(1);
						}}
						aria-label="like"
					>
						<Smile />
					</Button>
					<Button
						disabled={
							loading ||
							setFavourite.isLoading ||
							removeFavourite.isLoading
						}
						onClick={() => {
							if (isFavourite) {
								removeFavourite.mutate({
									favourite_id: setFavourite.data?.id
										? setFavourite.data?.id
										: favouriteId!,
								});
							} else {
								setFavourite.mutate({
									image_id: data![0].id,
									sub_id: id,
								});
							}
						}}
						aria-label="favourite"
					>
						{setFavourite.isLoading || removeFavourite.isLoading ? (
							<Loader
								variant="white"
								className="!h-[30px] !w-[30px]"
							/>
						) : isFavourite ? (
							<HeartFilled />
						) : (
							<Heart />
						)}
					</Button>
					<Button
						disabled={
							loading ||
							setFavourite.isLoading ||
							removeFavourite.isLoading
						}
						onClick={() => {
							voteHandler(0);
						}}
						aria-label="dislike"
					>
						<Sad />
					</Button>
				</div>
			</div>

			<UserLog className="mt-[50px]" />
		</Container>
	);
};

export default Voting;
