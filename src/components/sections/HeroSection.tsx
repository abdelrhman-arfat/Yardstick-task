import React from "react";
import MonthlyExpensesChart from "../MonthlyExpensesChart";
import { TDate } from "@/app/types/Data";

import { TableLoop } from "../TableLoop";
import { PlusCircle, PlusIcon } from "lucide-react";
import Link from "next/link";
import ChartWithCategory from "../ChartWithCategory";

const HeroSection = ({
  data,
  getTran,
}: {
  data: TDate[] | null;
  getTran: () => Promise<void>;
}) => {
  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-medium text-gray-900">No Data Available</h3>
        <p className="mt-2 text-sm text-gray-500">
          There are no expenses recorded for this period.
        </p>
        <Link
          className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 ease-in-out mt-4"
          href={"/new-transaction"}
        >
          <PlusCircle />
        </Link>
      </div>
    );
  }

  const getLatestTransactions = () => {
    if (data?.length === 0) return [];
    return [...(data || [])]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent py-4 mb-2 text-center relative">
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 blur-xl"></span>
        Transaction Info
      </h1>
      {Array.isArray(data) && (
        <div className="w-full">
          <div className="w-full items-center md:justify-between flex flex-col md:flex-row gap-3 sm:gap-5">
            <div className=" w-full  md:min-h-[300px] bg-neutral-50 rounded-md shadow-sm text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pt-4 px-4">
                Monthly Expense Chart
              </h2>
              <div className="w-full h-full min-h-[280px] p-2 sm:p-4">
                <MonthlyExpensesChart data={data} />
              </div>
            </div>
            <div className=" w-full  md:min-h-[570px] bg-neutral-50 rounded-md shadow-sm text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pt-4 px-4">
                Monthly Expense Category Chart
              </h2>{" "}
              <ChartWithCategory data={data} />
            </div>
          </div>
          {data.length > 0 && (
            <div className="flex py-3 flex-col gap-2 mt-4 w-full">
              <div className="flex items-center justify-center gap-4 relative">
                <h1 className="text-2xl font-bold text-center py-4 px-5 my-3 relative z-10">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600  opacity-60 rounded-xl"></span>
                  <span className="relative z-20 text-white">
                    Most Recent 5 Transactions
                  </span>
                </h1>
                <Link
                  href="/new-transaction"
                  className="flex items-center p-2 justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <PlusIcon className="text-purple-600 hover:text-blue-500 transition-colors duration-200" />
                </Link>
              </div>

              <TableLoop getFunc={getTran} data={getLatestTransactions()} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
