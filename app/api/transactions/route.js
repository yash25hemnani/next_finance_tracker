import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req) {
    await dbConnect();

        try {
            const body = await req.json();
            const { amount, description, date, category, color } = body;


            if (!amount || !date || !category){
                return NextResponse.json({
                    error: "Required Fields Missing"
                }, {status: 400})
            }

            const newTransaction = new Transaction({
                amount,
                description,
                date,
                category,
                color
            })

            const saved = await newTransaction.save();
            return NextResponse.json(saved, { status: 201 });

        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    } 
    
// GET /api/transactions
export async function GET(req) {
    await dbConnect();
  
    try {
      const transactions = await Transaction.find().sort({ date: -1 });
      return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
  } 