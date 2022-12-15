import React, { ComponentPropsWithoutRef, FC, useState } from "react";
import { Error, File, Success } from "../../assets/svg";
import { useAppSelector } from "../../hooks/redux";
import { useMutation } from "@tanstack/react-query";
import { ImageService } from "../../service/image.service";
import Button from "../ui/button/button";
import UserLogItem from "../userLog/userLogItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const UploadPage: FC<ComponentPropsWithoutRef<"div">> = ({ ...props }) => {
	const [file, setFile] = useState<File | null>(null);
	const { id } = useAppSelector((state) => state.id);
	const [parent] = useAutoAnimate<any>();

	const uploadHandler = useMutation({
		mutationFn: () => ImageService.uploadImage(file!, id!),
		onSuccess: () => {
			setFile(null);
		},
	});

	return (
		<>
			<div className="mt-[40px] text-center" {...props}>
				<h1 className="font-medium text-[36px] sm:text-[20px]">
					Upload a .jpg or .png Cat Image
				</h1>
				<h2 className="mt-[10px] text-gray-dark">
					Any uploads must comply with the{" "}
					<a
						className="inline-block text-[20px] text-primary"
						href="https://thecatapi.com/privacy"
						target="_blank"
					>
						upload guidelines
					</a>{" "}
					or face deletion.
				</h2>
			</div>
			<div className="mt-[40px] mb-[20px]">
				<label
					className={`relative flex h-[320px] rounded-[20px] cursor-pointer border-2 border-dashed transition-all sm:h-[167px] ${
						uploadHandler.isError
							? "border-primary bg-primary-soft dark:bg-primary-dark"
							: "border-primary-soft bg-white dark:bg-[#333333] dark:border-primary-dark"
					}`}
					htmlFor="file"
					ref={parent}
				>
					{file ? (
						<img
							className="mx-auto rounded-[20px]"
							src={URL.createObjectURL(file)}
							alt={file.name}
						/>
					) : (
						<>
							<File className="h-[200px] w-[200px] absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 fill-white-soft dark:opacity-5 sm:h-[100px] sm:w-[100px]" />
							<p className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-center text-[20px] text-gray-dark whitespace-nowrap sm:whitespace-normal">
								<span className="inline-block text-black dark:text-white">
									Drag
								</span>{" "}
								here your file or{" "}
								<span className="inline-block text-black dark:text-white">
									Click here
								</span>{" "}
								to upload
							</p>
						</>
					)}
				</label>
				<input
					className="hidden"
					type="file"
					id="file"
					accept="image/png, image/jpg, image/jpeg"
					disabled={uploadHandler.isLoading}
					onChange={(e) => setFile(e.target.files![0])}
				/>
			</div>

			<figcaption className="text-center text-gray-dark">
				{file ? `Image File Name: ${file.name}` : "No file selected"}
			</figcaption>

			{file && (
				<div className="mt-[20px] flex items-center justify-center">
					<Button
						className="!px-[30px]"
						onClick={() => uploadHandler.mutate()}
						isLoading={uploadHandler.isLoading}
					>
						UPLOAD PHOTO
					</Button>
				</div>
			)}

			<div ref={parent}>
				{uploadHandler.status === "success" && (
					<UserLogItem
						className="mt-[20px]"
						variant="white"
						icon={<Success className="fill-success" />}
						iconPosition="start"
						text="Thanks for the Upload - Cat found!"
					/>
				)}

				{uploadHandler.status === "error" && (
					<UserLogItem
						className="mt-[20px]"
						variant="white"
						icon={<Error className="fill-primary" />}
						iconPosition="start"
						text="No Cat found - try a different one"
					/>
				)}
			</div>
		</>
	);
};

export default UploadPage;
