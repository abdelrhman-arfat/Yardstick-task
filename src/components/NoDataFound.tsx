import { FileX2, Link } from "lucide-react";
import React from "react";

const NoDataFound = () => {
  return (
    <Link
      href="/new-transaction"
      className="flex flex-col items-center justify-center py-16"
    >
      <FileX2 className="h-16 w-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        No Data Found
      </h2>
      <p className="text-gray-500 text-sm text-center max-w-md">
        We couldn&apos;t find any data to display. Try adding some records or
        adjust your filters.
      </p>
    </Link>
  );
};

export default NoDataFound;
