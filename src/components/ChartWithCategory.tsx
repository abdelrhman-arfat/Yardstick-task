"use client";
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
};
const ChartWithCategory = ({ data }: { data: TDate[] }) => {
  const categoryData: TCategoryChartData[] = data.reduce(
    (acc: TCategoryChartData[], txn) => {
      const found = acc.find((item) => item.name === txn.category);
      if (found) {
        found.value += +txn.amount;
      } else {
        acc.push({ name: txn.category, value: +txn.amount });
      }
      return acc;
    },
    []
  );
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
            label
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
    </div>
  );
};

export default ChartWithCategory;
