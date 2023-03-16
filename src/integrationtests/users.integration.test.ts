import express from "express";
import request from "supertest";
import { UsersController } from "../users/controllers/users.controller";
import { UsersMiddleware } from "../users/middleware/users.middleware";
import { UsersService } from "../users/services/users.service";
import { UsersRoutes } from "../users/users.routes";
import { DateUtil } from "../utils/DateUtil";

const app = express();
app.use(express.json());