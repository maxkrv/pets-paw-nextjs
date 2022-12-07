import React from "react";
import { NextPage } from "next";
import Container from "../../components/container/container";
import ContainerHeader from "../../components/containerHeader/containerHeader";
import { useQuery } from "@tanstack/react-query";
import { VoteService } from "../../service/vote.service";
import { useAppSelector } from "../../hooks/redux";
import splitIntoChunks from "../../utils/splitIntoChunks";
import Grid from "../../components/grid/grid";
import Loader from "../../components/ui/loader/loader";
import GridItem from "../../components/grid/gridItem";
import Image from "next/image";
import UserLogItem from "../../components/userLog/userLogItem";

const Dislikes: NextPage = () => {
	const { id } = useAppSelector((state) => state.id);

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["dislikes"],
		queryFn: () =>
			VoteService.getVotes({
				attach_image: 1,
				order: "ASC",
				sub_id: id!,
			}),
		select: (data) =>
			splitIntoChunks(
				data.filter((item) => item.value === 0),
				10
			),
	});

	return (
		<Container>
			<ContainerHeader title="dislikes" />
			{isLoading || isFetching ? (
				<Loader centered />
			) : data?.length ? (
				data?.map((grid, i) => (
					<Grid className="mt-[20px] w-full" key={i}>
						{grid.map((item) => (
							<GridItem component="div" key={item.id}>
								<Image
									src={item.image!.url}
									layout="fill"
									placeholder="blur"
									blurDataURL={item.image!.url}
									alt="disliked image"
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

export default Dislikes;
