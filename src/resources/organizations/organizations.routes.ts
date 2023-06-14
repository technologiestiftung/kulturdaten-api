import { Service } from 'typedi';
import { Response } from 'express';
import express, { Router } from 'express';
import { OrganizationsController } from './controllers/organizations.controller';
import { CreateOrganizationRequest } from '../../generated/models/CreateOrganizationRequest.generated';
import { UpdateOrganizationRequest } from '../../generated/models/UpdateOrganizationRequest.generated';
import { SearchOrganizationsRequest } from '../../generated/models/SearchOrganizationsRequest.generated';

@Service()
export class OrganizationsRoutes {
  
  constructor(public organizationsController: OrganizationsController) {}

  public getRouter(): Router {
    let router = express.Router();
    
    router
      .get('/', (req: express.Request, res: express.Response) => {
        this.organizationsController.listOrganizations(res);
      })
      .post('/', (req: express.Request, res: express.Response) => {
        const createOrganizationRequest = req.body as CreateOrganizationRequest;
        this.organizationsController.createOrganization(res, createOrganizationRequest);
      });

    router
      .get('/search', (req: express.Request, res: express.Response) => {
        const searchOrganizationsRequest = req.body as SearchOrganizationsRequest;
        this.organizationsController.searchOrganizations(res, searchOrganizationsRequest);
      });

    router
      .get('/:identifier', (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        this.organizationsController.getOrganizationById(res, identifier);
      })
      .patch('/:identifier', (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        const updateOrganizationRequest = req.body as UpdateOrganizationRequest;
        this.organizationsController.updateOrganization(res, identifier, updateOrganizationRequest);
      });

    router
      .post('/:identifier/activate', (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        this.organizationsController.activateOrganization(res, identifier);
      })
      .post('/:identifier/deactivate', (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        this.organizationsController.deactivateOrganization(res, identifier);
      })
      .post('/:identifier/retire', (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        this.organizationsController.retireOrganization(res, identifier);
      })
      .post('/:identifier/archive', (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        this.organizationsController.archiveOrganization(res, identifier);
      })
      .post('/:identifier/unarchive', (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        this.organizationsController.unarchiveOrganization(res, identifier);
      });

    return router;
  }
}
