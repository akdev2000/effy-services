import express, { Application, Request, Response } from "express";
import router from "./routes";

const app: Application = express();
const port = 8005;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res
    .status(200)
    .send({
      message: `Db Alive`,
    });
});

app.use("/api/v1",router);

try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`);
}
