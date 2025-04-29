import React from "react";

import ChartWithCategory from "../ChartWithCategory";
import { TDate } from "@/app/types/Data";
import SetUpBadged from "../SetUpBadged";
import { TBudged } from "@/app/types/Budged";

const CategoryChartSection = ({ data }: { data: TDate[] }) => {
  const [budged, setBudged] = React.useState<TBudged>(() => {
    const storedBudged = localStorage.getItem("budged");
    return storedBudged
      ? JSON.parse(storedBudged)
      : {
          food: 0,
          entertainment: 0,
          transport: 0,
          shopping: 0,
          other: 0,
        };
  });

  return (
    <div className="w-full h-fit md:min-h-[580px] bg-neutral-50 rounded-xl overflow-hidden shadow-md text-center">
      <div>
        <SetUpBadged budged={budged} setBudged={setBudged} />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 pt-4 px-4">
        Monthly Expense Category Chart
      </h2>
      <ChartWithCategory budged={budged} data={data} />
    </div>
  );
};

export default CategoryChartSection;
