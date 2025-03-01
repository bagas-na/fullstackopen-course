import express from "express";
import calculateBMI from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
import { isNotNumber } from "./utils/parser";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const queries = req.query;
  const height = queries.height && JSON.stringify(queries.height);
  const weight = queries.weight && JSON.stringify(queries.weight);

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

app.post("/exercises", (req, res) => {
  interface postBody {
    target?: unknown;
    daily_exercises?: unknown;
  }

  const { target, daily_exercises } = req.body as postBody;

  // Ensure received json contains required properties
  if (target === undefined || daily_exercises === undefined) {
    throw new Error("parameters missing");
  }

  // Validate type of "target" to be a number
  if (typeof target !== "number" || isNaN(Number(target))) {
    throw new Error ("malformatted parameters");
  }

  // Validate type of "daily_exercises" to be number[]
  if (!Array.isArray(daily_exercises) || isNotNumber(daily_exercises)) {
    throw new Error("malformatted parameters");
  }

  const targetHour = Number(target);
  const exercisesArray = daily_exercises.map(Number);

  const result = calculateExercises(targetHour, exercisesArray);

  res.json(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
