import React from "react";
import { TableBody, TableHead, TableHeader, TableRow, Table } from "./ui/table";

const TableMainTag = ({ children }: { children: React.ReactNode }) => {
  return (
    <Table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
      <TableHeader>
        <TableRow className="border-b border-gray-300">
          <TableHead>No.</TableHead> {/* Add a TableHead for the row number */}
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export default TableMainTag;
