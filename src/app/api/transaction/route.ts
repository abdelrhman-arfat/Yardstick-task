import { isValidObjectId } from "mongoose";
import dbConnect from "../../../lib/db/dbConnect";
import Transaction from "../../../lib/schema/Transactions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { message: "userId is required", data: null },
      { status: 400 }
    );
  }
  await dbConnect();
  const transactions = await Transaction.find({ userId });

  return NextResponse.json({
    message: "Transactions fetched successfully",
    data: transactions,
  });
}
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const transactionId = searchParams.get("tranId");
  if (!userId || !isValidObjectId(transactionId)) {
    return NextResponse.json(
      { message: "ids are required", data: null },
      { status: 400 }
    );
  }
  await dbConnect();
  const transactions = await Transaction.findByIdAndDelete({
    userId,
    _id: transactionId,
  });

  return NextResponse.json({
    message: "Transactions fetched successfully",
    data: transactions,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.userId) {
    return NextResponse.json(
      { message: "userId is required", data: null },
      { status: 400 }
    );
  }

  if (
    !body.date ||
    new Date(body.date).toString() === "Invalid Date" ||
    new Date().getTime() < new Date(body.date).getTime()
  ) {
    return NextResponse.json(
      { message: "date is required", data: null },
      { status: 400 }
    );
  }

  if (!body.description || !body.amount) {
    return NextResponse.json(
      { message: "description and amount  required", data: null },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const newTransaction = new Transaction(body);

    await newTransaction.save();

    return NextResponse.json(
      {
        message: "Transaction created successfully",
        data: newTransaction,
      },
      { status: 201 }
    );
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      {
        message: error.message || "internal error",
        data: null,
      },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  const body = await request.json();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  // Validate the tranId and userId
  if (!userId || !isValidObjectId(body.tranId)) {
    return NextResponse.json(
      { message: "Invalid or missing IDs", data: null },
      { status: 400 }
    );
  }

  try {
    // Establish database connection
    await dbConnect();

    // Attempt to update the transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      { _id: body.tranId, userId },
      {
        $set: {
          date: body.date,
          description: body.description,
          amount: body.amount,
        },
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return NextResponse.json(
        { message: "Transaction not found or user unauthorized", data: null },
        { status: 404 }
      );
    }

    // Return the updated transaction
    return NextResponse.json(
      { message: "Transaction updated successfully", data: updatedTransaction },
      { status: 200 }
    );
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      { message: error.message || "Internal server error", data: null },
      { status: 500 }
    );
  }
}
