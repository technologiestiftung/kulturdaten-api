export const getTodayAsString = () => {
	return new Date().toISOString().slice(0, 10);
};
