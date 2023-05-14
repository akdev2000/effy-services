import express, { Application, Request, Response } from "express";
import { CompanyRouter } from "./routes/CompanyRouter";
import { UserRouter } from "./routes/UserRouter";
import bodyParser from "body-parser";
import cors from "cors"

const app: Application = express();
const port = 8005;

app.use(cors());

// Body parsing Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: `Db Alive`,
  });
});

app.use("/api/v1", [CompanyRouter, UserRouter]);

try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`);
}
