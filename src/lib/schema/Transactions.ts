import mongoose from "mongoose";

type TTransactions = {
  userId: string;
  description: string;
  amount: number;
  date: Date;
};

const transactionSchema = new mongoose.Schema<TTransactions>({
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;