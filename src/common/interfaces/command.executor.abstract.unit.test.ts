import { ExecutionResult } from "../../generated/models/ExecutionResult.generated";
import { CommandExecutor } from "./command.executor.abstract";



describe('AbstractCommandExecutor', () => {
    let executor: CommandExecutor;

    beforeEach(() => {
        executor = new class extends CommandExecutor {
            getExecutableCommandTypes(): string[] {
                return ['command1', 'command2'];
            }
            execute(): Promise<ExecutionResult> {
                return Promise.resolve({success: true});
            }
        };
    });

    test('canExecuteCommandType returns true if command type is executable', () => {
        const result = executor.canExecuteCommandType('command1');
        expect(result.success).toBe(true);
    });

    test('canExecuteCommandType returns false if command type is not executable', () => {
        const result = executor.canExecuteCommandType('command3');
        expect(result.success).toBe(false);
        expect(result.message).toBe('This command type is not executable');
    });
});
