import round from "lodash/round";

//

export const MAX_32B_INTEGER_VALUE = 2_147_483_647;

//

const EN_US = "en-US";
const STRING_NUMBER_INVALID = "Invalid value";

// usd

const usdNumberFormatOptions = {
  style: "currency",
  currency: "USD",
} as const;

const usdNumberFormat = new Intl.NumberFormat(EN_US, usdNumberFormatOptions);

const usdNumberFormatNoDecimals = new Intl.NumberFormat(EN_US, {
  ...usdNumberFormatOptions,
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

const usdAbbreviateNumberFormat = new Intl.NumberFormat(EN_US, {
  ...usdNumberFormatOptions,
  minimumFractionDigits: 0,
});

const defaultNumberFormat = new Intl.NumberFormat(EN_US);

export const formatUSD = (value: number | string, noDecimals?: boolean) => {
  try {
    // if string, convert to number
    const number =
      typeof value === "string" ? getNumberFromString(value) : value;

    // if gte min, always abbreviate
    if (Math.abs(number) >= MIN_ABBREVIATED_NUMBER_DEFAULT) {
      return abbreviateNumber(number, usdAbbreviateNumberFormat);
    }

    return (noDecimals ? usdNumberFormatNoDecimals : usdNumberFormat).format(
      number
    );
  } catch (err) {
    // if error converting to number, return `invalid` string
    return `${STRING_NUMBER_INVALID}: ${err}`;
  }
};

// strings

const getNumberFromString = (value: string): number => {
  if (value === "") return 0;

  const number = parseFloat(value);

  if (isNaN(number)) {
    const error = new Error(
      `Value "${value}" passed to getNumberFromString is not a number.`
    );

    throw error;
  }

  return number;
};

//

export const formatNumber = (value: number) => {
  // if value gte minimum default to abbreviate, abbreviate
  if (Math.abs(value) >= MIN_ABBREVIATED_NUMBER_DEFAULT) {
    return abbreviateNumber(value);
  }

  return defaultNumberFormat.format(value);
};

export const formatStringNumber = (value: string) => {
  try {
    // convert to string and send to `formatNumber`
    const number = getNumberFromString(value);
    return formatNumber(number);
  } catch (err) {
    // if error converting to number, return `invalid` string
    return `${STRING_NUMBER_INVALID}${err}`;
  }
};

// abbreviate

const MIN_ABBREVIATED_NUMBER_ALL = 500;
const MIN_ABBREVIATED_NUMBER_DEFAULT = 100_000_000;

const magnitudeAbbreviations = new Map([
  [5, "P"],
  [4, "T"],
  [3, "B"],
  [2, "M"],
  [1, "K"],
]);

export const abbreviateNumber = (
  value: number,
  formatter?: Intl.NumberFormat,
  roundTo = 2
) => {
  // 0 to 499 just return
  if (Math.abs(value) < MIN_ABBREVIATED_NUMBER_ALL) return value.toString();

  // 500 to 999 round to 1000
  if (Math.abs(value) < 1000) value = 1000;

  let magnitude = 0;
  let num = value;

  do {
    magnitude++;
    num = round(num / 1000, roundTo);
  } while (Math.abs(num) >= 1000);

  return `${
    formatter ? formatter.format(num) : defaultNumberFormat.format(num)
  }${magnitudeAbbreviations.get(magnitude) ?? ""}`;
};

// pagination

export const getPaginationCount = (countTotal: number, countPerPage: number) =>
  Math.ceil((countTotal || 1) / countPerPage);

// ratio

export const getNonNanRatio = (part: number, total: number) =>
  part === 0 || total === 0 ? 0 : part / total;

export const getNonNanRatioInteger = (part: number, total: number) =>
  Math.floor(getNonNanRatio(part, total));

// percentage

export const getNonNanPercentage = (
  part: number,
  total: number,
  roundTo?: number
) => {
  const percentage = getNonNanRatio(part, total) * 100;
  return roundTo ? round(percentage, roundTo) : Math.floor(percentage);
};

export const isLteMaxDecimalPlaces = (
  value: number | string,
  places: number = 2
) => {
  const regExp = new RegExp(`^\\d+(\\.\\d{0,${places}})?$`);

  return regExp.test(value.toString());
};

export const isReallyNaN = (value: unknown) =>
  typeof value === "number" && isNaN(value);

// const

const MILLE = 1_000;

/**
 * Converts a cost to a cost per mille
 */
// TODO: cover with tests
export const toCPM = (cost: number) => {
  return cost * MILLE;
};

/**
 * Converts a cost per mille to a cost
 */
// TODO: cover with tests
export const fromCPM = (cpm: number) => {
  return cpm / MILLE;
};

// micros

const MICROS_PER_DOLLAR = 1_000_000;

/**
 * Converts a regular decimal value to micros (value * MICROS_PER_DOLLAR)
 */
// TODO: cover with tests
export const valueToMicros = (value: number): number => {
  return Math.round(value * MICROS_PER_DOLLAR);
};

/**
 * Converts micros to a regular decimal value (micros / MICROS_PER_DOLLAR)
 */
// TODO: cover with tests
export const microsToValue = (micros: number): number => {
  return micros / MICROS_PER_DOLLAR;
};

// micros and cpm

/**
 * Converts micros to a cost per mille (thousand)
 */
// TODO: cover with tests
export const microsToCPM = (micros: number): number => {
  return toCPM(microsToValue(micros));
};

/**
 * Converts a cost per mille to micros
 */
// TODO: cover with tests
export const cpmToMicros = (cpm: number): number => {
  return valueToMicros(fromCPM(cpm));
};
