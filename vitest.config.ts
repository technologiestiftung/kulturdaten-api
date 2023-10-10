/// <reference types="vitest" />
import { defineConfig } from "vite";

process.env = Object.assign(process.env, {
	JWT_SECRET: "test-secret",
});

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			provider: "v8",
			reportsDirectory: "coverage",
		},
		globals: true,
		slowTestThreshold: 5,
	},
});
