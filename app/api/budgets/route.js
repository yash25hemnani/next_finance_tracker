import dbConnect from "@/lib/dbConnect";
import Budget from "@/models/Budget";
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

        const data = await Budget.find({ month, year, category })

        if (data) {
            return NextResponse.json(
                data,
                { status: 200 }
            )
        } else {
            return NextResponse.json(
                { message: "No Budget Yet" },
                { status: 404 }
            )
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
      await dbConnect();
      const updateData = await req.json(); 
  
      const { month, year, category, ...rest } = updateData;
  
      if (!month || !year || !category) {
        return NextResponse.json({ error: "Month and Year required" }, { status: 400 });
      }
  
      const updatedBudget = await Budget.findOneAndUpdate(
        { month, year, category },
        { $set: rest },
        { new: true, upsert: true } 
      );
  
      return NextResponse.json({
        message: "Budget Updated Successfully",
        data: updatedBudget,
      }, {status: 201});
    } catch (error) {
      console.error("PATCH Error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  

  export async function DELETE(req) {
    try {
      await dbConnect();
      const updateData = await req.json(); 
  
      const { month, year } = updateData;
  
      if (!month || !year) {
        return NextResponse.json({ error: "Month and Year required" }, { status: 400 });
      }
  
      const updatedBudget = await Budget.findOneAndDelete(
        { month, year },
      );
  
      return NextResponse.json({
        message: "Budget Deleted Successfully",
      });
    } catch (error) {
      console.error("DELETE Error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }