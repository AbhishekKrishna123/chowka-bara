import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { Server } from "typescript-rest";

// Controllers (route handlers)
import { GameController } from "./controllers/gameController";
import { ProfileController } from "./controllers/profileController";

// create Express app
const app: express.Application = express();

// Express configuration
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


Server.buildServices(app, GameController, ProfileController);

export default app;