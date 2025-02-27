import path from "path";
import { isNotNumber } from "./utils/parser.ts";

const currentFileName = path.basename(process.argv[1]);

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratingDescriptions = {
  1: "Exercise commitment is significantly below the target",
  2: "A decent effort, but there’s room for improvement.",
  3: "Great job! Exercise hours are fully met.",
};

const evaluateHours = (target: number, hoursArray: number[]): Result => {
  const periodLength = hoursArray.length;
  const average = hoursArray.reduce((sum, current) => sum + current, 0) / periodLength;
  const completionRate = average / target;

  const trainingDays = hoursArray.filter((period) => period > 0).length;
  const success = completionRate >= 1;

  let rating: 1 | 2 | 3 = 1;
  if (completionRate >= 1) rating = 3;
  else if (completionRate >= 0.8) rating = 2;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescriptions[rating],
    target,
    average,
  };
};

const parseArgs = (args: string[]): { target: number; hours: number[] } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (isNotNumber(...args.slice(2))) {
    throw new Error("Provided values were not numbers!");
  }

  const target = Number(args[2]);
  const hours = args.slice(3).map((hour) => Number(hour));

  return { target, hours };
};

try {
  const { target, hours } = parseArgs(process.argv);
  const result = evaluateHours(target, hours);
  console.log(result)
} catch (error: unknown) {
  let errorMessage = "";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  errorMessage += `\nUsage: ts-node ${currentFileName} <target (in hours)> <day1 hours> [day hours...]`;
  console.error(errorMessage);
}
