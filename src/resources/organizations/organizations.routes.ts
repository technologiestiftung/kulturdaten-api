import { Service } from 'typedi';
import { Response } from 'express';
import express, { Router } from 'express';
import { OrganizationsController } from './controllers/organizations.controller';
import { CreateOrganizationRequest } from '../../generated/models/CreateOrganizationRequest.generated';
import { UpdateOrganizationRequest } from '../../generated/models/UpdateOrganizationRequest.generated';
import { SearchOrganizationsRequest } from '../../generated/models/SearchOrganizationsRequest.generated';
import { getPagination } from '../../utils/RequestUtil';
import passport from 'passport';


@Service()
export class OrganizationsRoutes {

  constructor(public organizationsController: OrganizationsController) { }

  public getRouter(): Router {
    let router = express.Router();

    router
      .get('/', (req: express.Request, res: express.Response) => {
        const asReference = req.query.asReference;
        const { page, pageSize} = getPagination(req);

				if (asReference) {
          this.organizationsController.listOrganizationsAsReference(res, page, pageSize);
        } else {
          this.organizationsController.listOrganizations(res, page, pageSize);
        }
      })
      .post('/', 	
      passport.authenticate('authenticated-user', { session: false }),
      (req: express.Request, res: express.Response) => {
        const createOrganizationRequest = req.body as CreateOrganizationRequest;
        this.organizationsController.createOrganization(res, createOrganizationRequest);
      });

    router
      .post('/bulk-create', 
      passport.authenticate('authenticated-user', { session: false }),
      (req: express.Request, res: express.Response) => {
        const createOrganizationsRequest = req.body as CreateOrganizationRequest[];

        this.organizationsController.createOrganizations(res, createOrganizationsRequest);
      });

    router
      .post('/search', (req: express.Request, res: express.Response) => {
        const { page, pageSize} = getPagination(req);

        const searchOrganizationsRequest = req.body as SearchOrganizationsRequest;
        this.organizationsController.searchOrganizations(res, searchOrganizationsRequest, page, pageSize);
      });

    router
      .get('/:identifier', (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        const asReference = req.query.asReference;
				if (asReference) {
          this.organizationsController.getOrganizationReferenceById(res, identifier);          
        } else {
          this.organizationsController.getOrganizationById(res, identifier);
        }
      })
      .patch('/:identifier',
      passport.authenticate('authenticated-user', { session: false }),
      (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        const updateOrganizationRequest = req.body as UpdateOrganizationRequest;
        this.organizationsController.updateOrganization(res, identifier, updateOrganizationRequest);
      });

    router
      .post('/:identifier/activate',
      passport.authenticate('authenticated-user', { session: false }),
      (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        this.organizationsController.activateOrganization(res, identifier);
      })
      .post('/:identifier/deactivate',
      passport.authenticate('authenticated-user', { session: false }),
      (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        this.organizationsController.deactivateOrganization(res, identifier);
      })
      .post('/:identifier/retire',
      passport.authenticate('authenticated-user', { session: false }),
      (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        this.organizationsController.retireOrganization(res, identifier);
      })
      .post('/:identifier/archive',
      passport.authenticate('authenticated-user', { session: false }),
      (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        this.organizationsController.archiveOrganization(res, identifier);
      })
      .post('/:identifier/unarchive',
      passport.authenticate('authenticated-user', { session: false }),
      (req: express.Request, res: express.Response) => {
        const identifier = req.params.identifier;
        this.organizationsController.unarchiveOrganization(res, identifier);
      });

    return router;
  }
}
