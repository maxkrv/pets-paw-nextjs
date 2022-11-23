const splitIntoChunks = <T>(arr: T[], chunkSize: number): T[][] => {
	const chunks = [];

	for (let i = 0; i < arr.length; i += chunkSize) {
		chunks.push(arr.slice(i, i + chunkSize));
	}

	return chunks;
};

export default splitIntoChunks;
