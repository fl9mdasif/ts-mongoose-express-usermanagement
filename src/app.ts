import express, { Application, Request, Response } from "express";
import cors from "cors";
// import { studentRoute } from './app/modules/students/route.student';

const app: Application = express();

// parser middleware
app.use(express.json());
app.use(cors());

// application routes
// /api/v1/students/create-student
// app.use('/api/v1/students', studentRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from next level developer");
});

app.all("*", (req, res) => {
  res.status(400).json({
    success: false,
    message: "Route not find",
  });
});

export default app;
