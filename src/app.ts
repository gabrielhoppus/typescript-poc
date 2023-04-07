import "express-async-errors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleApplicationErrors } from "./middlewares/error.middleware.js";

import router from "./routes/app.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleApplicationErrors);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));