import expres from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from "./routes";
import { handleError } from "./middlewares/handleError";
import { NotFoundError } from "./errors/not-found-error";

const app = expres();

app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(handleError);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connecting mongodb");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Linstening on port 3000!");
  });
};

start();
