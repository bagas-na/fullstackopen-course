import path from "path";
import { isNotNumber } from "./utils/parser";

const currentFileName = path.basename(process.argv[1]);

// Calculates BMI (kg/m2) using height (in cm) and mass (kg)
const calculateBMI = (height: number, mass: number): number => {
  return (mass / height ** 2) * 10000;
};

type Classification =
  | "Underweight"
  | "Normal Weight"
  | "Overweight"
  | "Obese class I"
  | "Obese class II"
  | "Obese class III";
const classifyBMI = (bmi: number): Classification => {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal Weight";
  } else if (bmi < 30) {
    return "Overweight";
  } else if (bmi < 35) {
    return "Obese class I";
  } else if (bmi < 40) {
    return "Obese class II";
  } else {
    return "Obese class III";
  }
};

const parseArgs = (args: string[]): { height: number; mass: number } => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNotNumber([args[2], args[3]])) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    height: Number(args[2]),
    mass: Number(args[3]),
  };
};

const main = () => {
  try {
    const { height, mass } = parseArgs(process.argv);
    const BMI = calculateBMI(height, mass);
    console.log("BMI:", BMI.toFixed(2), "| Classification:", classifyBMI(BMI));
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    errorMessage += `\nUsage: ts-node ${currentFileName} <height (in cm)> <mass (in kg)>`;
    console.error(errorMessage);
  }
};

if (require.main === module) {
  main();
}

export default (height: number, weight: number): Classification => {
  return classifyBMI(calculateBMI(height, weight));
};
