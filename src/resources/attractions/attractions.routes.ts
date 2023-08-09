import debug from 'debug';
import express, { Router } from 'express';
import { Service } from 'typedi';
import { CreateAttractionRequest } from '../../generated/models/CreateAttractionRequest.generated';
import { UpdateAttractionRequest } from '../../generated/models/UpdateAttractionRequest.generated';
import { AddExternalLinkRequest } from '../../generated/models/AddExternalLinkRequest.generated';
import { RemoveExternalLinkRequest } from '../../generated/models/RemoveExternalLinkRequest.generated';
import { AttractionsController } from './controllers/attractions.controller';
import { SearchAttractionsRequest } from '../../generated/models/SearchAttractionsRequest.generated';
import { getPagination } from '../../utils/RequestUtil';


const log: debug.IDebugger = debug('app:attractions-routes');

@Service()
export class AttractionsRoutes {

	constructor(public attractionsController: AttractionsController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get('/', (req: express.Request, res: express.Response) => {
				const asReference = req.query.asReference; 
				const { page, pageSize} = getPagination(req);
				
				if(asReference){
					this.attractionsController.listAttractionsAsReference(res, page, pageSize);
				} else {
				this.attractionsController.listAttractions(res, page, pageSize);
				}
			})
			.post('/', (req: express.Request, res: express.Response) => {
				const createAttractionRequest = req.body as CreateAttractionRequest;
				this.attractionsController.createAttraction(res, createAttractionRequest);
			});

		router
			.post('/bulk-create', (req: express.Request, res: express.Response) => {
				const createAttractionRequest = req.body as CreateAttractionRequest[];
				
				this.attractionsController.createAttractions(res, createAttractionRequest);
			});	

		router
			.post('/search', (req: express.Request, res: express.Response) => {
				const { page, pageSize} = getPagination(req);

				const searchAttractionsRequest = req.body as SearchAttractionsRequest;
				this.attractionsController.searchAttractions(res, searchAttractionsRequest, page, pageSize);
			});

		router
			.get('/:identifier', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const asReference = req.query.asReference;
				if(asReference){
					this.attractionsController.getAttractionReferenceById(res, identifier);
				} else {
				this.attractionsController.getAttractionById(res, identifier);
				}
			})
			.patch('/:identifier', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const updateAttractionRequest = req.body as UpdateAttractionRequest;
				this.attractionsController.updateAttraction(res, identifier, updateAttractionRequest);
			});

		router
			.post('/:identifier/externallinks', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const addExternalLinkRequest = req.body as AddExternalLinkRequest;
				this.attractionsController.addExternalLink(res, identifier, addExternalLinkRequest);
			})
			.delete('/:identifier/externallinks', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const removeExternalLinkRequest = req.body as RemoveExternalLinkRequest;
				this.attractionsController.removeExternalLink(res, identifier, removeExternalLinkRequest);
			});

		router
			.post('/:identifier/archive', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.attractionsController.archiveAttraction(res, identifier);
			})
			.post('/:identifier/unarchive', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.attractionsController.unarchiveAttraction(res, identifier);
			})	
			.post('/:identifier/publish', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.attractionsController.publishAttraction(res, identifier);
			})	
			.post('/:identifier/unpublish', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.attractionsController.unpublishAttraction(res, identifier);
			})

		return router;
	}
}
