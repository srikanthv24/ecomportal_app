import { PERSONAL_INFO } from "../../utils/constants";

const {
  MIN_INCHES,
  MAX_INCHES,
  MIN_FEET,
  MAX_FEET,
  DEFAULT_MEN_FEET,
  DEFAULT_MEN_INCHES,
  DEFAULT_WOMEN_FEET,
  DEFAULT_WOMEN_INCHES,
  MIN_WEIGHT,
  MAX_WEIGHT,
  DEFAULT_MEN_WEIGHT,
  DEFAULT_WOMEN_WEIGHT,
} = PERSONAL_INFO;

export class handleValidations {
  static ageValidation(age, type) {
    let newAge = 0;
    newAge = type === "increment" ? age + 1 : age - 1;
    let msg = "",
      error = false;
    if (newAge >= 95) {
      error = true;
      msg = "Please enter a valid age";
    } else if (newAge <= 15) {
      error = true;
      msg = "Please enter a valid age";
    }
    return {
      error,
      msg,
    };
  }

  static weigthValidation(weigth, type) {
    let newWeigth = 0;
    newWeigth = type === "increment" ? weigth + 1 : weigth - 1;
    let msg = "",
      error = false;
    if (newWeigth >= 100) {
      error = true;
      msg = "Enter valid weigth";
    } else if (newWeigth <= 40) {
      error = true;
      msg = "Enter valid weigth";
    }
    return {
      error,
      msg,
    };
  }

  static heightFeetValidation(heightFeet, type) {
    let newHeightFeet = 0;
    newHeightFeet = type === "increment" ? heightFeet + 1 : heightFeet - 1;
    let msg = "",
      error = false;
    if (newHeightFeet >= 12) {
      error = true;
      msg = "Enter valid height";
    } else if (newHeightFeet <= 1) {
      error = true;
      msg = "Enter valid height";
    }
    return {
      error,
      msg,
    };
  }

  static heightInchValidation(heightInch, type) {
    let newHeightInch = 0;
    newHeightInch = type === "increment" ? heightInch + 1 : heightInch - 1;
    let msg = "",
      error = false;
    if (newHeightInch >= 11) {
      error = true;
      msg = "Enter valid height";
    } else if (newHeightInch <= 0) {
      error = true;
      msg = "Enter valid height";
    }
    return {
      error,
      msg,
    };
  }
}
export default handleValidations;

export const validateAndSetFeet = (heightFeet, type, setHeightFeet) => {
  if (
    (type === "increment" && heightFeet + 1 > MAX_FEET) ||
    (type === "decrement" && heightFeet - 1 < MIN_FEET)
  )
    return;
  type === "increment"
    ? setHeightFeet((prevHeigthFeet) => prevHeigthFeet + 1)
    : setHeightFeet((prevHeigthFeet) => prevHeigthFeet - 1);
};

export const validateAndSetInches = (heightInch, type, setHeightInch) => {
  if (
    (type === "increment" && heightInch + 1 > MAX_INCHES) ||
    (type === "decrement" && heightInch - 1 < MIN_INCHES)
  )
    return;
  type === "increment"
    ? setHeightInch((prevHeigthInch) => prevHeigthInch + 1)
    : setHeightInch((prevHeigthInch) => prevHeigthInch - 1);
};

export const validateAndSetWeight = (type, longPress = false, weight, setWeight) => {
  if (
    (type === "increment" && weight + 1 > MAX_WEIGHT) ||
    (type === "increment" && weight + 10 > MAX_WEIGHT && longPress) ||
    (type === "decrement" && weight - 1 < MIN_WEIGHT) ||
    (type === "decrement" && weight - 10 < MIN_WEIGHT && longPress)
  )
    return;
  const incrementValue = longPress ? 10 : 1;
  type === "increment"
    ? setWeight((weight) => weight + incrementValue)
    : setWeight((weight) => weight - incrementValue);
};
