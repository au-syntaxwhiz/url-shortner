import app from "./app";
import dotenv from "dotenv";
import { logger } from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT ?? 8000;
const BASE_URL = process.env.BASE_URL;

app.listen(PORT, () => {
  logger.info(`Server is running at ${BASE_URL}`);
});
