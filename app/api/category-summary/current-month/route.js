import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import { NextResponse, NextRequest } from "next/server";


export async function GET(req) {
    // Here we will group each of the spending for the required month by category
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const month = searchParams.get("month");
        const year = searchParams.get("year");

        if (!month || !year) {
            return NextResponse.json(
                { error: "Both month and year are required." },
                { status: 400 }
            );
        }

        console.log(month, year);

        const categoryWiseSpending = await Transaction.aggregate([
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [{ $month: "$date" }, parseInt(month)] },
                    { $eq: [{ $year: "$date" }, parseInt(year)] },
                  ]
                }
              }
            },
            {
              $group: {
                _id: "$category",
                totalAmount: { $sum: "$amount" },
                color: { $first: "$color" }, 
              }
            },
            {
              $project: {
                _id: 0,
                category: "$_id",
                totalAmount: 1,
                fill: "$color"  
              }
            },
            {
              $sort: { totalAmount: -1 } 
            }
          ]);
          

        console.log(categoryWiseSpending);

        return NextResponse.json(
            categoryWiseSpending,
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
    }
}