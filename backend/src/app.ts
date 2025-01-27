import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/db";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();
app.use("/", routes);

export default app;
