import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import calculateBMI from "./bmiCalculator";
import { isNotNumber } from "./utils/parser";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const queries = req.query;
  const height = queries.height && queries.height.toString();
  const weight = queries.weight && queries.weight.toString();

  if (!height || !weight) {
    throw new Error("malformatted parameters");
  }

  if (isNotNumber(height, weight)) {
    throw new Error("Provided values were not numbers!");
  }

  const result = {
    weight,
    height,
    bmi: calculateBMI(Number(height), Number(weight)),
  };

  res.json(result);
});


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
