import { Event } from "../generated/models/Event.generated";

export const getTodayAsString = () => {
	return new Date().toISOString().slice(0, 10);
};

export const getStartDateAsISO = (event: Event) => {
	return `${event.schedule?.startDate}T${event.schedule?.startTime || ""}`;
};
