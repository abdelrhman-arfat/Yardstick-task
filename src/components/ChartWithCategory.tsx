"use client";
import { TBudged } from "@/app/types/Budged";
import { TDate } from "@/app/types/Data";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

type TCategoryChartData = {
  name: string;
  value: number;
  overBudget?: boolean;
};

const ChartWithCategory = ({
  data,
  budged,
}: {
  data: TDate[];
  budged: TBudged;
}) => {
  // Aggregate transactions by category and compare with budget
  const categoryData: TCategoryChartData[] = data
    .reduce((acc: TCategoryChartData[], txn) => {
      const found = acc.find((item) => item.name === txn.category);
      if (found) {
        found.value += +txn.amount;
      } else {
        acc.push({ name: txn.category, value: +txn.amount });
      }
      return acc;
    }, [])
    .map((item) => ({
      ...item,
      overBudget: item.value > (budged[item.name as keyof TBudged] ?? Infinity),
    }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Warnings */}
      <div className="mt-5 flex flex-col gap-2 px-2 text-start  space-y-1 text-sm text-red-600 font-medium">
        {categoryData
          .filter((item) => item.overBudget)
          .map((item) => (
            <p key={item.name}>
              ⚠️ You exceeded the budget for <strong>{item.name}</strong> by $
              {(item.value - budged[item.name as keyof TBudged]).toFixed(2)}
            </p>
          ))}
      </div>
    </div>
  );
};

export default ChartWithCategory;
