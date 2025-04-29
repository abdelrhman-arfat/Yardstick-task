import React from "react";
import MonthlyExpensesChart from "../MonthlyExpensesChart";
import { TDate } from "@/app/types/Data";

import { TableLoop } from "../TableLoop";
import { PlusCircle, PlusIcon } from "lucide-react";
import Link from "next/link";
import CategoryChartSection from "./CategoryChartSection";
import { getLatestTransactions } from "@/app/utils/getLatestTransactions";

const HeroSection = ({
  data,
  getTran,
}: {
  data: TDate[] | null;
  getTran: () => Promise<void>;
}) => {
  if (data?.length === 0 || data == null) {
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

  const latestDate = getLatestTransactions(data);
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent py-4 mb-2 text-center relative">
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 blur-xl"></span>
        Transaction Info
      </h1>
      {Array.isArray(data) && (
        <div className="w-full">
          <div className="w-full items-center md:justify-between flex flex-col md:flex-row gap-3 sm:gap-5">
            <div className=" w-full  md:min-h-[300px] bg-neutral-50 rounded-xl overflow-hidden shadow-md text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pt-4 px-4">
                Monthly Expense Chart
              </h2>
              <div className="w-full h-full min-h-[280px] p-2 sm:p-4">
                <MonthlyExpensesChart data={data} />
              </div>
            </div>
            <CategoryChartSection data={data} />
          </div>
          {data.length > 0 && (
            <div className="flex py-3 flex-col gap-2 mt-4 w-full">
              <div className="flex items-center justify-center gap-4 relative">
                <h1 className="sm:text-2xl font-bold text-center px-1 py-1.5 sm:py-4 sm:px-5 my-3 relative z-10">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600  opacity-60 rounded-xl"></span>
                  <span className="relative z-20 text-white">
                    Most Recent {latestDate.length} Transactions
                  </span>
                </h1>
                <Link
                  href="/new-transaction"
                  className="flex items-center p-2 justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <PlusIcon className="text-purple-600 hover:text-blue-500 transition-colors duration-200" />
                </Link>
              </div>
              <div>
                <h1 className="text-base sm:text-lg md:text-xl text-center text-gray-700 font-medium px-4 py-2 bg-gray-50 rounded-lg shadow-sm">
                  Total Transactions :
                  <span className="font-bold text-purple-600">
                    {" "}
                    {data.length}
                  </span>
                </h1>
              </div>
              <TableLoop getFunc={getTran} data={latestDate} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
