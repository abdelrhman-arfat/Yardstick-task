"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import DeleteTran from "./btns/DeleteTran";
import UpdateTran from "./btns/UpdateTran";
import { TDate } from "@/app/types/Data";
import NoDataFound from "./NoDataFound";
import TableMainTag from "./TableMainTag";

export function TableLoop({
  data,
  getFunc,
}: {
  data: TDate[];
  getFunc: () => Promise<void>;
}) {
  return (
    <>
      {Array.isArray(data) && data.length > 0 ? (
        <TableMainTag>
          {data.map((tran: TDate, index) => (
            <TableRow
              key={index}
              className="border-b border-gray-200 transition-colors duration-300 hover:bg-gray-100"
            >
              <TableCell className="text-left  text-gray-700">
                {index + 1 + " -"}
              </TableCell>
              <TableCell className="text-left line-clamp-2 max-h-[50px] sm:min-h-[30px] py-3 px-6 text-gray-700">
                {tran.description}
              </TableCell>
              <TableCell className="text-left py-3 px-6 text-gray-700">
                $ {tran.amount}
              </TableCell>
              <TableCell className="text-left py-3 px-6 text-gray-700">
                {new Date(tran.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-left py-3 px-6 text-gray-700">
                <div className="flex gap-2">
                  <UpdateTran getFunc={getFunc} tran={tran} />
                  <DeleteTran getFunc={getFunc} id={tran._id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableMainTag>
      ) : (
        <NoDataFound />
      )}
    </>
  );
}
