import dbConnect from "@/lib/dbConnect";
import Budget from "@/models/Budget";
import Transaction from "@/models/Transaction";
import { NextResponse, NextRequest } from "next/server";


export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const month = searchParams.get("month");
        const year = searchParams.get("year");
        const category = searchParams.get("category");

        if (!month || !year) {
            return NextResponse.json(
                { error: "Both month and year are required." },
                { status: 400 }
            );
        }

        console.log(month, year, category);

        const budget = await Budget.find({ month, year, category }, { amount: 1, _id: 0 })

        const amount = await Transaction.aggregate([
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $month: "$date" }, parseInt(month)] },
                    { $eq: [{ $year: "$date" }, parseInt(year)] },
                  ],
                },
                category: category,
              },
            },
            {
              $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
              },
            },
            {
              $project: {
                _id: 0,
                totalAmount: 1,
              },
            },
          ]);

        console.log(amount);
          
          

        return NextResponse.json(
            {
                budget: budget[0]?.amount ?? 0,
                actual: amount[0]?.totalAmount ?? 0,
            },
            { status: 200 }
        );
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
    }
}