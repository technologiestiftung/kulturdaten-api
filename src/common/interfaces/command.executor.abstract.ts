import { Command } from "../../generated/models/Command.generated";
import { ExecutionResult } from "../../generated/models/ExecutionResult.generated";
import { User } from "../../generated/models/User.generated";

export abstract class CommandExecutor {
    abstract getExecutableCommandTypes(): string[];
    abstract execute(command: Command, user?: User, identifier?: string): Promise<ExecutionResult> ;

    canExecuteCommandType(commandType: string): ExecutionResult {
        const executableCommandTypes = this.getExecutableCommandTypes();
        if(executableCommandTypes.includes(commandType)){
            return {success: true};
        } else {
            return {success: false, message: 'This command type is not executable'};
        }
    }
}