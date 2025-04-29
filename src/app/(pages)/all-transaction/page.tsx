"use client";
import { TDate } from "@/app/types/Data";
import fetchData from "@/app/utils/GetAllTransactions";
import NoDataFound from "@/components/NoDataFound";
import { TableLoop } from "@/components/TableLoop";
import TableSkeleton from "@/components/TableSkeleton";
import React, { useCallback, useEffect, useState } from "react";
const Page = () => {
  const [data, setDate] = useState<TDate[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const getTran = useCallback(async () => {
    setDate(await fetchData());
    setIsLoading(false);
  }, []);
  useEffect(() => {
    getTran();
  }, [getTran]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      {Array.isArray(data) && data.length > 0 ? (
        <TableLoop getFunc={getTran} data={data} />
      ) : (
        <div>
          <NoDataFound />
        </div>
      )}
    </div>
  );
};

export default Page;
