import "reflect-metadata";
import "express-async-errors";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import AppError from "./errors/AppError";
import routes from "./routes";
import "./database";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		response.status(err.statusCode).json({
			status: "error",
			message: err.message,
		});
	}

	console.log({ err });

	return response.status(500).json({
		status: "error",
		message: "Internal server error",
	});
});

app.listen(3333, () => {
	console.log(`SERVER RUNNING ON PORT 3333`);
});
