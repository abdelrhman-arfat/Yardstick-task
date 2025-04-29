"use client";
import CalendarForm from "@/components/CalendarForm";
import React, { FormEvent } from "react";

import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { axiosInstance } from "@/app/utils/axiosInstance";
import CategoryDropMenu from "@/components/CategoryDropMenu";

const TranPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [category, setCategory] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const userId = localStorage.getItem("userId");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const description = formData.get("description") as string;
    const amount = formData.get("amount") as string;

    if (!description || !amount || !category || !date) {
      toast.error("Please fill all the fields");
      return;
    }

    setIsLoading(true);
    toast.promise(
      axiosInstance.post(
        `/transaction`,
        {
          description,
          date,
          amount,
          category: category,
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
      {
        loading: "Create new Transaction",
        success: (res) => {
          const data = res.data;
          if (data) {
            setIsLoading(false);
            console.log(data);
          }
          return data.message || "created successfully";
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add New Transaction
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={2}
              maxLength={255}
            />
          </div>

          {/* Amount Input */}
          <div>
            <label
              htmlFor="amount"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Amount ($ | USD)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={0}
            />
          </div>

          {/* Category Input with with dorp menu */}
          <div>
            <CategoryDropMenu value={category} setValue={setCategory} />
          </div>
          {/* Date Input with Calendar */}
          <div>
            <CalendarForm date={date} setDate={setDate} />
          </div>

          {/* Submit Button */}
          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 flex items-center justify-center rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              {isLoading ? <Loader className="animate-spin" /> : "submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TranPage;
