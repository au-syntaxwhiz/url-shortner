import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { urlRoutes } from "./routes/urlRoutes";
import { connectToDatabase } from "./config/db";
import userRoutes from "./routes/userRoutes";
import { redirectToUrl } from "./controllers/urlController";

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectToDatabase();

app.use("/urls", urlRoutes);
app.use("/auth", userRoutes);
app.get("/:slug", redirectToUrl);

export default app;
