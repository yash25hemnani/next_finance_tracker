import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { ObjectId } = mongoose.Types;

    try {
        await dbConnect();

        const { id } = await params

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const transaction = await Transaction.findById(id);

        console.log(transaction);

        if (!transaction) {
            return NextResponse.json({ error: "Transaction Not Found" }, { status: 404 });
        }

        return NextResponse.json(transaction, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req) {

    try {
        await dbConnect();

        const body = await req.json();
        const { _id, ...updateFields } = body;

        if (!_id) {
            return NextResponse.json({ error: "Month and Year required" }, { status: 400 });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            _id,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedTransaction) {
            return NextResponse.json({ error: "Transaction Not Found" }, { status: 404 });
        }

        return NextResponse.json(updatedTransaction, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {

    try {
        await dbConnect();

        const { id } = await params

        if (!id) {
            return NextResponse.json({ error: "ID Required" }, { status: 400 });
        }

        const deletedTransaction = await Transaction.findByIdAndDelete(
            id
        );

        if (!deletedTransaction) {
            return NextResponse.json({ error: "Transaction Not Found" }, { status: 404 });
        }

        return NextResponse.json(deletedTransaction, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
