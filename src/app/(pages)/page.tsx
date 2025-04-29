"use client";
import { useCallback, useEffect, useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import { TDate } from "../types/Data";
import fetchData from "../utils/GetAllTransactions";
import HeroSectionSkeleton from "@/components/sections/HeroSectionSkeleton";

export default function Home() {
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
    return <HeroSectionSkeleton />;
  }

  return (
    <div>
      <HeroSection data={data} getTran={getTran} />
    </div>
  );
}
