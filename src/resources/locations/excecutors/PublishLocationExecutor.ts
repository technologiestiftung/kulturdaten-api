import { Service } from 'typedi';
import { CommandExecutor } from "../../../common/interfaces/command.executor.abstract";
import { Command } from "../../../generated/models/Command.generated";
import { ExecutionResult } from "../../../generated/models/ExecutionResult.generated";
import { PublishLocationCommand, schemaForPublishLocationCommand } from "../../../generated/models/PublishLocationCommand.generated";
import { User } from "../../../generated/models/User.generated";
import { LocationsService } from '../services/locations.service';



@Service()
export class PublishLocationExecutor extends CommandExecutor {

	constructor(public locationsService: LocationsService){
		super();
	}

	getExecutableCommandTypes(): string[] {
		return schemaForPublishLocationCommand.properties.type.enum;
	}
	async execute(command: Command, user?: User | undefined): Promise<ExecutionResult> {
		const canExecute = this.canExecuteCommandType(command.type);
		if(!canExecute.success){return canExecute;}
		const publishLocationCommand = command as PublishLocationCommand;
		return await this.locationsService.publishLocation(publishLocationCommand);
	}
	
}