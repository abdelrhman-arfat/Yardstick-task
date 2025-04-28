"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Pen, X } from "lucide-react";
import { TDate } from "@/app/types/Data";
import CalendarForm from "../CalendarForm";
import toast from "react-hot-toast";
import { axiosInstance } from "@/app/utils/axiosInstance";

const UpdateTran = ({
  getFunc,
  tran,
}: {
  getFunc: () => Promise<void>;
  tran: TDate;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const userId = localStorage.getItem("userId");
    const updatedData = {
      description: formData.get("description"),
      amount: formData.get("amount"),
      date: date,
      tranId: tran._id,
    };

    toast
      .promise(
        axiosInstance.put(`/transaction?userId=${userId}`, {
          description: updatedData.description,
          amount: updatedData.amount,
          date: updatedData.date,
          tranId: tran._id,
        }),
        {
          loading: "Updating...",
          success: (res) => res.data.message || "updated successfully",
          error: (err) =>
            err.response.data.message || "failed to update the transaction",
        }
      )
      .then(() => {
        getFunc();
        setIsOpen(false);
      });
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((p: boolean) => !p)}
        className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
      >
        <Pen className="h-4 w-4" />
      </Button>

      {/* Modal */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="relative bg-white shadow-md rounded-md p-6 space-y-4 w-96">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="my-2 font-bold bg-gray-100 py-2 px-4 w-fit rounded-[10px] ">
                  <h1>Date is {new Date(tran.date).toDateString()}</h1>
                </div>
                <CalendarForm date={date} setDate={setDate} />

                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="description"
                    className="font-semibold text-gray-700"
                  >
                    Description:
                  </label>
                  <input
                    type="text"
                    name="description"
                    defaultValue={tran.description}
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="amount"
                    className="font-semibold text-gray-700"
                  >
                    Amount:
                  </label>
                  <input
                    type="number"
                    name="amount"
                    defaultValue={tran.amount}
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Update Transaction
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateTran;
