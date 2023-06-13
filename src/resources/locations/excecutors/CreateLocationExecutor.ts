import { Service } from 'typedi';
import { CommandExecutor } from "../../../common/interfaces/command.executor.abstract";
import { Command } from "../../../generated/models/Command.generated";
import { ExecutionResult } from "../../../generated/models/ExecutionResult.generated";
import { User } from "../../../generated/models/User.generated";
import { LocationsService } from '../services/locations.service';
import { CreateLocationCommand, schemaForCreateLocationCommand } from '../../../generated/models/CreateLocationCommand.generated';



@Service()
export class CreateLocationExecutor extends CommandExecutor {

	constructor(public locationsService: LocationsService){
		super();
	}

	getExecutableCommandTypes(): string[] {
		return schemaForCreateLocationCommand.properties.type.enum;
	}
	async execute(command: Command, user?: User, identifier?: string): Promise<ExecutionResult> {
		const canExecute = this.canExecuteCommandType(command.type);
		if(!canExecute.success){return canExecute;}
		const createLocationCommand = command as CreateLocationCommand;
		return await this.locationsService.create(createLocationCommand);
	}
	
}