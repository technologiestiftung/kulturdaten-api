import express from "express";

export abstract class CommonRoutesConfig {
	constructor(private name: string) {}

	getName() {
		return this.name;
	}

	abstract configureRoutes(app: express.Application, preRoute: string): express.Application;
}
