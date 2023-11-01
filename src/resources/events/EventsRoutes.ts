import debug from "debug";
import express, { Router } from "express";
import passport from "passport";
import { Service } from "typedi";
import { Pagination } from "../../common/parameters/Pagination";
import { AddEventAttractionRequest } from "../../generated/models/AddEventAttractionRequest.generated";
import { AddEventLocationRequest } from "../../generated/models/AddEventLocationRequest.generated";
import { CreateEventRequest } from "../../generated/models/CreateEventRequest.generated";
import { RemoveEventAttractionRequest } from "../../generated/models/RemoveEventAttractionRequest.generated";
import { RemoveEventLocationRequest } from "../../generated/models/RemoveEventLocationRequest.generated";
import { RescheduleEventRequest } from "../../generated/models/RescheduleEventRequest.generated";
import { SearchEventsRequest } from "../../generated/models/SearchEventsRequest.generated";
import { SetEventOrganizerRequest } from "../../generated/models/SetEventOrganizerRequest.generated";
import { UpdateEventRequest } from "../../generated/models/UpdateEventRequest.generated";
import { getPagination } from "../../utils/RequestUtil";
import { EventsController } from "./controllers/EventsController";
import { Permit } from "../auth/middleware/Permit";

const log: debug.IDebugger = debug("app:events-routes");

@Service()
export class EventsRoutes {
	constructor(public eventsController: EventsController) {}

	static readonly basePath = "/events";

	public getRouter(): Router {
		const router = express.Router();

		router
			.get(EventsRoutes.basePath + "/", (req: express.Request, res: express.Response) => {
				const asReference = req.query.asReference;
				const pagination: Pagination = getPagination(req);

				if (asReference) {
					this.eventsController.listEventsAsReference(res, pagination);
				} else {
					this.eventsController.listEvents(res, pagination);
				}
			})
			.post(
				EventsRoutes.basePath + "/",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const createEventRequest = req.body as CreateEventRequest;
					this.eventsController.createEvent(res, createEventRequest);
				},
			);

		router.post(
			EventsRoutes.basePath + "/bulk-create",
			passport.authenticate("authenticated-user", { session: false }),
			Permit.authorizesForAction(),
			(req: express.Request, res: express.Response) => {
				const createEventsRequest = req.body as CreateEventRequest[];

				this.eventsController.createEvents(res, createEventsRequest);
			},
		);

		router.post(EventsRoutes.basePath + "/search", (req: express.Request, res: express.Response) => {
			const pagination: Pagination = getPagination(req);

			const searchEventsRequest = req.body as SearchEventsRequest;
			this.eventsController.searchEvents(res, searchEventsRequest, pagination);
		});

		router
			.get(EventsRoutes.basePath + "/:identifier", (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const asReference = req.query.asReference;
				if (asReference) {
					this.eventsController.getEventReferenceById(res, identifier);
				} else {
					this.eventsController.getEventById(res, identifier);
				}
			})
			.patch(
				EventsRoutes.basePath + "/:identifier",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.eventsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const updateEventRequest = req.body as UpdateEventRequest;
					this.eventsController.updateEvent(res, identifier, updateEventRequest);
				},
			);

		router
			.put(
				EventsRoutes.basePath + "/:identifier/locations",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.eventsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const addEventLocationRequest = req.body as AddEventLocationRequest;
					this.eventsController.addEventLocation(res, identifier, addEventLocationRequest);
				},
			)
			.delete(
				EventsRoutes.basePath + "/:identifier/locations",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.eventsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const removeEventLocationRequest = req.body as RemoveEventLocationRequest;
					this.eventsController.removeEventLocation(res, identifier, removeEventLocationRequest);
				},
			);

		router
			.put(
				EventsRoutes.basePath + "/:identifier/attractions",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.eventsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const addEventAttractionRequest = req.body as AddEventAttractionRequest;
					this.eventsController.addEventAttraction(res, identifier, addEventAttractionRequest);
				},
			)
			.delete(
				EventsRoutes.basePath + "/:identifier/attractions",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.eventsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const removeEventAttractionRequest = req.body as RemoveEventAttractionRequest;
					this.eventsController.removeEventAttraction(res, identifier, removeEventAttractionRequest);
				},
			);

		router
			.put(
				EventsRoutes.basePath + "/:identifier/organizer",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.eventsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const setEventOrganizerRequest = req.body as SetEventOrganizerRequest;
					this.eventsController.setEventOrganizer(res, identifier, setEventOrganizerRequest);
				},
			)
			.delete(
				EventsRoutes.basePath + "/:identifier/organizer",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.eventsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.eventsController.deleteEventOrganizer(res, identifier);
				},
			);

		router
			.post(
				EventsRoutes.basePath + "/:identifier/publish",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.eventsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.eventsController.publishEvent(res, identifier);
				},
			)
			.post(
				EventsRoutes.basePath + "/:identifier/unpublish",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.eventsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.eventsController.unpublishEvent(res, identifier);
				},
			);

		router.post(
			EventsRoutes.basePath + "/:identifier/reschedule",
			passport.authenticate("authenticated-user", { session: false }),
			Permit.authorizesForAction(),
			Permit.authorizesToManipulateResource(this.eventsController),
			(req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const rescheduleEventRequest = req.body as RescheduleEventRequest;
				this.eventsController.rescheduleEvent(res, identifier, rescheduleEventRequest);
			},
		);

		router.post(
			EventsRoutes.basePath + "/:identifier/postpone",
			passport.authenticate("authenticated-user", { session: false }),
			Permit.authorizesForAction(),
			Permit.authorizesToManipulateResource(this.eventsController),
			(req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.eventsController.postponeEvent(res, identifier);
			},
		);

		router.post(
			EventsRoutes.basePath + "/:identifier/cancel",
			passport.authenticate("authenticated-user", { session: false }),
			Permit.authorizesForAction(),
			Permit.authorizesToManipulateResource(this.eventsController),
			(req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.eventsController.cancelEvent(res, identifier);
			},
		);

		router
			.post(
				EventsRoutes.basePath + "/:identifier/archive",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.eventsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.eventsController.archiveEvent(res, identifier);
				},
			)
			.post(
				EventsRoutes.basePath + "/:identifier/unarchive",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.eventsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.eventsController.unarchiveEvent(res, identifier);
				},
			);

		router.post(
			EventsRoutes.basePath + "/:identifier/duplicate",
			passport.authenticate("authenticated-user", { session: false }),
			Permit.authorizesForAction(),
			(req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.eventsController.duplicateEvent(res, identifier);
			},
		);

		return router;
	}
}
