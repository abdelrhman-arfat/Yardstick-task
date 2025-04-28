import React from "react";
import { Skeleton } from "./ui/skeleton";
import TableMainTag from "./TableMainTag";

const SkeletonRow = ({ index }: { index: number }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 px-6">{index}</td> {/* Display row number */}
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-40 bg-gray-200 rounded" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-24 bg-gray-200 rounded" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-28 bg-gray-200 rounded" />
      </td>
      <td className="py-4 px-6">
        <div className="flex gap-3">
          <Skeleton className="h-8 w-8 bg-gray-200 rounded-full" />
          <Skeleton className="h-8 w-8 bg-gray-200 rounded-full" />
        </div>
      </td>
    </tr>
  );
};

const TableSkeleton = () => {
  return (
    <TableMainTag>
      {Array.from({ length: 5 }).map((_, idx) => (
        <SkeletonRow key={idx} index={idx + 1} />
      ))}
    </TableMainTag>
  );
};

export default TableSkeleton;
