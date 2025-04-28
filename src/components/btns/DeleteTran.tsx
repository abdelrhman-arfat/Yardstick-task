"use client";
import { Button } from "../ui/button";
import { Loader, Trash2 } from "lucide-react";
import { axiosInstance } from "@/app/utils/axiosInstance";
import toast from "react-hot-toast";
import { useState } from "react";

const DeleteTran = ({
  id,
  getFunc,
}: {
  id: string;
  getFunc: () => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userId = localStorage.getItem("userId");
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      toast
        .promise(
          axiosInstance.delete(`/transaction?userId=${userId}&tranId=${id}`),
          {
            loading: "Deleting...",
            success: (res) => {
              console.log(res);
              return res.data.message || "Transaction Deleted Successfully";
            },
            error: (err) => err.response.data.message || "something went wrong",
          }
        )
        .then((res) => {
          console.log(res);
          getFunc();
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
      return;
    }
  };
  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-100"
      >
        {isLoading ? (
          <div className="animate-spin">
            <Loader />
          </div>
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default DeleteTran;
