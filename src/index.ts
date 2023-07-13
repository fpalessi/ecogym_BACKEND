import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import connect from "./utils/connect.util";
import cookieParser from "cookie-parser";

const app = express();

// env files
dotenv.config();

// Body parser
app.use(express.json());

// Parse cookies
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(authRouter);

const port: string = process.env.PORT as string;

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);

  await connect();
});
