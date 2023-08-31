import { Event } from '../../../generated/models/Event.generated';
import { EventsRepository } from '../repositories/events.repository';
import { EventsService } from './events.service';
import { mock } from 'ts-mockito';



describe('test intersection and removeDuplicates', () => {

	it(' should return the intersection of two event arrays ', async () => {
		const eventsA : Event[] = [
			{ 
				identifier: '1'
			},
			{ 
				identifier: '2'
			},
		];
		const eventsB : Event[] = [
			{ 
				identifier: '2'
			},
			{ 
				identifier: '3'
			},
		];	

		const eventService: EventsService = new EventsService(mock<EventsRepository>());

		expect(eventService.getIntersection(eventsA, eventsB)).toStrictEqual([
			{ 
				identifier: '2'
			},
		]);
	});

	it(' should return all events without duplicates', async () => {
		const eventsA : Event[] = [
			{ 
				identifier: '1'
			},
			{ 
				identifier: '2'
			},
		];
		const eventsB : Event[] = [
			{ 
				identifier: '2'
			},
			{ 
				identifier: '3'
			},
		];	

		const eventService: EventsService = new EventsService(mock<EventsRepository>());

		expect(eventService.removeDuplicates([...eventsA, ...eventsB])).toStrictEqual([
			{ 
				identifier: '1'
			},
			{ 
				identifier: '2'
			},
			{ 
				identifier: '3'
			},
		]);
	});

	it(' MatchMode "any" should return all events without duplicates', async () => {
		const eventsA : Event[] = [
			{ 
				identifier: '1'
			},
			{ 
				identifier: '2'
			},
		];
		const eventsB : Event[] = [
			{ 
				identifier: '2'
			},
			{ 
				identifier: '3'
			},
		];	

		const eventService: EventsService = new EventsService(mock<EventsRepository>());

		expect(eventService.match(eventsA, eventsB, 'any')).toStrictEqual([
			{ 
				identifier: '1'
			},
			{ 
				identifier: '2'
			},
			{ 
				identifier: '3'
			},
		]);
	});

	it(' MatchMode "all" should return the intersection of two event arrays ', async () => {
		const eventsA : Event[] = [
			{ 
				identifier: '1'
			},
			{ 
				identifier: '2'
			},
		];
		const eventsB : Event[] = [
			{ 
				identifier: '2'
			},
			{ 
				identifier: '3'
			},
		];	

		const eventService: EventsService = new EventsService(mock<EventsRepository>());

		expect(eventService.match(eventsA, eventsB, 'all')).toStrictEqual([
			{ 
				identifier: '2'
			},
		]);
	});


});