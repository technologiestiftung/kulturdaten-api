import express from 'express';
import { EventsService } from '../services/events.service';
import debug from 'debug';
import { Service } from 'typedi';
import { CreateEvent } from '../../generated/models/CreateEvent.generated';
import { PatchEvent } from '../../generated/models/PatchEvent.generated';

const log: debug.IDebugger = debug('app:events-controller');

@Service()
export class EventsController {

	constructor(
		public eventsService: EventsService) { }

	async listEvents(res: express.Response) {
		const events = await this.eventsService.list(100, 0);

		res = res.status(200).send({ "events": events });
	}

	async getEventById(res: express.Response, eventId: string) {
		
		const event = await this.eventsService.readById(eventId);
		if (event){
			res.status(200).send({ "event": event });
		} 
		else {
			res.status(404).send({error: {msg: 'Event not found'}});
		} 
	}

	async createEvent(res: express.Response, createEvent: CreateEvent) {
		const eventId = await this.eventsService.create(createEvent);
		res.status(201).send({ identifier: eventId });
	}

	async patch(res: express.Response, eventId: string, patchEvent: PatchEvent) {
		if(await this.eventsService.patchById(eventId, patchEvent)){
			res.status(204).send();
		} 
		else {
			res.status(404).send({error: {msg: 'Event not found'}});
		}
	}


	async removeEvent(res: express.Response, eventId: string) {
		if(await this.eventsService.deleteById(eventId))
		{
			res.status(204).send();
		}
		else {
			res.status(404).send({error: {msg: 'Event not found'}});
		} 
	}

}
