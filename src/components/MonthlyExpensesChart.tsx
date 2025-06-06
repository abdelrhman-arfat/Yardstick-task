"use client";
import { TDate } from "@/app/types/Data";
import { getMonthAndYear } from "@/app/utils/GetMonthAndYear";

import React, { useCallback, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const formatDataForChart = (data: TDate[]) => {
  const monthlyExpenses: { [key: string]: number } = {};

  data.forEach((item) => {
    const monthYear = new Date(item.date).toLocaleString("default", {
      year: "numeric",
      month: "long",
    });
    if (monthlyExpenses[monthYear]) {
      monthlyExpenses[monthYear] += Number(item.amount);
    } else {
      monthlyExpenses[monthYear] = Number(item.amount);
    }
  });

  return Object.keys(monthlyExpenses).map((month) => ({
    name: month,
    expenses: monthlyExpenses[month],
  }));
};

const MonthlyExpensesChart = ({ data }: { data: TDate[] }) => {
  const [chartData, setChartData] = useState<
    { expenses: number; name: string }[]
  >([]);
  const setChart = useCallback(async () => {
    const formattedData = formatDataForChart(data);
    setChartData(formattedData);
  }, [data]);
  useEffect(() => {
    setChart();
  }, [setChart]);

  if (chartData === undefined) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 w-full">
        <div className="w-full h-6 bg-gray-300 animate-pulse rounded-md"></div>{" "}
        <div className="w-full h-72 bg-gray-300 animate-pulse rounded-md">
          <div className="flex space-x-2 p-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="w-1/6 h-full bg-gray-400 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        </div>
        <div className="w-32 h-6 bg-gray-300 animate-pulse rounded-md"></div>{" "}
      </div>
    );
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="expenses" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-[18px] md:text-2xl sm:font-semibold text-gray-800 flex gap-3 items-center justify-between">
          <span>Your expenses in {getMonthAndYear()}</span>
          <span className="text-indigo-600 text-[18px] sm:text-3xl">
            $ {chartData[0]?.expenses.toLocaleString()}
          </span>
        </h1>
      </div>
    </>
  );
};

export default MonthlyExpensesChart;
