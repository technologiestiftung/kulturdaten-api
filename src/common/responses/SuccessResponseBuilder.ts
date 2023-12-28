import { Response } from "../../generated/models/Response.generated";

export class SuccessResponseBuilder<T extends Response> {
	private success: boolean = true;
	private message?: string;
	private data?: T["data"];
	private related?: T["related"];

	setMessage(message: string): SuccessResponseBuilder<T> {
		this.message = message;
		return this;
	}

	setData(data: T["data"]): SuccessResponseBuilder<T> {
		this.data = data;
		return this;
	}

	setRelated(related: T["related"]): SuccessResponseBuilder<T> {
		this.related = related;
		return this;
	}

	okResponse(data?: T["data"], related?: T["related"]): SuccessResponseBuilder<T> {
		this.message = "Operation Successful";
		this.data = data;
		this.related = related;
		return this;
	}

	createdResponse(data?: T["data"], related?: T["related"]): SuccessResponseBuilder<T> {
		this.message = "Resource Created";
		this.data = data;
		this.related = related;
		return this;
	}

	build(): T {
		return {
			success: this.success,
			message: this.message,
			data: this.data,
			related: this.related,
		} as T;
	}
}

export class ErrorResponseBuilder {
	private success: boolean = false;
	private message?: string;
	private errorCode?: number;
	private errorMessage?: string;
	private errorDetails?: string;

	setMessage(message: string): ErrorResponseBuilder {
		this.message = message;
		return this;
	}

	setErrorCode(code: number): ErrorResponseBuilder {
		this.errorCode = code;
		return this;
	}

	setErrorMessage(errorMessage: string): ErrorResponseBuilder {
		this.errorMessage = errorMessage;
		return this;
	}

	setErrorDetails(details?: string): ErrorResponseBuilder {
		this.errorDetails = details;
		return this;
	}

	badRequestResponse(details?: string): ErrorResponseBuilder {
		this.errorCode = 400;
		this.errorMessage = "Bad Request";
		this.errorDetails = details;
		return this;
	}

	unauthorizedResponse(details?: string): ErrorResponseBuilder {
		this.errorCode = 401;
		this.errorMessage = "Unauthorized";
		this.errorDetails = details;
		return this;
	}

	notFoundResponse(details?: string): ErrorResponseBuilder {
		this.errorCode = 404;
		this.errorMessage = "Resource Not Found";
		this.errorDetails = details;
		return this;
	}

	serverErrorResponse(details?: string): ErrorResponseBuilder {
		this.errorCode = 500;
		this.errorMessage = "Server Error";
		this.errorDetails = details;
		return this;
	}

	build(): Response {
		return {
			success: this.success,
			message: this.message,
			error: {
				code: this.errorCode,
				message: this.errorMessage,
				details: this.errorDetails,
			},
		};
	}
}
