import { PERSONAL_INFO, INCREMENT, DECREMENT } from "./constants";

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
  MAX_AGE,
  MIN_AGE,
  DEFAULT_MEN_WEIGHT,
  DEFAULT_WOMEN_WEIGHT,
} = PERSONAL_INFO;

export const validateAndSetFeet = (heightFeet, type, setHeightFeet) => {
  if (
    (type === INCREMENT && heightFeet + 1 > MAX_FEET) ||
    (type === DECREMENT && heightFeet - 1 < MIN_FEET)
  )
    return;
  type === INCREMENT
    ? setHeightFeet((prevHeigthFeet) => prevHeigthFeet + 1)
    : setHeightFeet((prevHeigthFeet) => prevHeigthFeet - 1);
};

export const validateAndSetInches = (heightInch, type, setHeightInch) => {
  if (
    (type === INCREMENT && heightInch + 1 > MAX_INCHES) ||
    (type === DECREMENT && heightInch - 1 < MIN_INCHES)
  )
    return;
  type === INCREMENT
    ? setHeightInch((prevHeigthInch) => prevHeigthInch + 1)
    : setHeightInch((prevHeigthInch) => prevHeigthInch - 1);
};

export const validateAndSetWeight = (type, weight, setWeight) => {
  if (
    (type === INCREMENT && weight + 1 > MAX_WEIGHT) ||
    (type === DECREMENT && weight - 1 < MIN_WEIGHT)
  )
    return;
  type === INCREMENT
    ? setWeight((weight) => weight + 1)
    : setWeight((weight) => weight - 1);
};

export const validateWeightOnLongPress = (type, setWeight) => {
  type === INCREMENT
    ? setWeight((weight) =>
        weight + 10 <= MAX_WEIGHT ? weight + 10 : MAX_WEIGHT
      )
    : setWeight((weight) =>
        weight - 10 >= MIN_WEIGHT ? weight - 10 : MIN_WEIGHT
      );
};

export const validateAndSetAge = (type, isLongPress, setAge) => {
  const count = isLongPress ? 10 : 1;
  type === INCREMENT
    ? setAge((age) => (age + count <= MAX_AGE ? age + count : MAX_AGE))
    : setAge((age) => (age - count >= MIN_AGE ? age - count : MIN_AGE));
};
