"use client";
import React, { useCallback, useEffect, useState } from "react";
import MonthlyExpensesChart from "../MonthlyExpensesChart";
import { TDate } from "@/app/types/Data";
import fetchData from "@/app/utils/GetAllTransactions";
import HeroSectionSkeleton from "./HeroSectionSkeleton";
import { TableLoop } from "../TableLoop";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  const [data, setDate] = useState<TDate[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getTran = useCallback(async () => {
    setDate(await fetchData());
    setIsLoading(false);
  }, []);
  useEffect(() => {
    getTran();
  }, [getTran]);

  if (isLoading) {
    return <HeroSectionSkeleton />;
  }

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent py-4 mb-2 text-center relative">
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 blur-xl"></span>
        Transaction Info
      </h1>
      {Array.isArray(data) && (
        <div className="w-full">
          <div className="w-full items-center sm:justify-between flex flex-col sm:flex-row gap-3 sm:gap-5">
            <div className=" w-full  min-h-[300px] bg-neutral-50 rounded-md shadow-sm text-center">
              <MonthlyExpensesChart data={data} />
            </div>
          </div>
          <div className="flex py-3 flex-col gap-2 mt-4 w-full">
            <div className="flex items-center justify-center gap-4 relative">
              <h1 className="text-2xl font-bold text-center py-4 px-5 my-3 relative z-10">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600  opacity-60 rounded-xl"></span>
                <span className="relative z-20 text-white">
                  All Transactions
                </span>
              </h1>
              <Link
                href="/new-transaction"
                className="flex items-center p-2 justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <PlusIcon className="text-purple-600 hover:text-blue-500 transition-colors duration-200" />
              </Link>
            </div>

            <TableLoop getFunc={getTran} data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
