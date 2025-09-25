export const isReallyNaN = (value: unknown) =>
  typeof value === "number" && isNaN(value);
