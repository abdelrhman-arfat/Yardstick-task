import { TDate } from "../types/Data";

export const getLatestTransactions = (data: TDate[]) => {
  if (data?.length === 0) return [];
  return [...(data || [])]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
};
