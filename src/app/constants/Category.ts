export const categories = [
  "food",
  "transport",
  "shopping",
  "bills",
  "entertainment",
];

export type TCategory =
  | "food"
  | "transport"
  | "shopping"
  | "bills"
  | "entertainment";

export const categoriesListObj = categories.map((category) => {
  return {
    label: category,
    value: category,
  };
});
