import { TBudged } from "@/app/types/Budged";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";

const SetUpBudged = ({
  budged,
  setBudged,
}: {
  budged: TBudged;
  setBudged: React.Dispatch<React.SetStateAction<TBudged>>;
}) => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBudged: TBudged = {
      food: Number(formData.get("food")),
      shopping: Number(formData.get("shopping")),
      bills: Number(formData.get("bills")),
      entertainment: Number(formData.get("entertainment")),
      transport: Number(formData.get("transport")),
    };

    const isValid = Object.values(newBudged).every((val) => val >= 0);

    if (!isValid) {
      toast.error("All values must be positive numbers");
      return;
    }

    setBudged(() => {
      localStorage.setItem("budged", JSON.stringify(newBudged));
      return newBudged;
    });
    toast.success("Budget updated ✅");
    setShowForm(false);
  };

  return (
    <div className=" w-full">
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
      >
        <Pencil className="w-4 h-4" />
        Set Budget
      </button>

      {showForm && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <form
            onSubmit={handleSubmit}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white shadow-lg border rounded-xl p-6 space-y-4"
          >
            {Object.keys(budged).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium capitalize text-gray-700">
                  {key}
                </label>
                <input
                  type="number"
                  name={key}
                  defaultValue={budged[key as keyof TBudged]}
                  className="mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={0}
                  required
                />
              </div>
            ))}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default SetUpBudged;
