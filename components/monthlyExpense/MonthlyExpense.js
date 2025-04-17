"use client"
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { useSelector } from "react-redux";

const MonthlyExpense = () => {
    const transactionData = useSelector(state => state.transactions.transactionData)
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const monthlyExpenses = {}

        transactionData.forEach((transaction) => {
            const date = new Date(transaction.date);
            const month = `${date.getFullYear()}-${date.getMonth() + 1}`

            if (!monthlyExpenses[month]) {
                monthlyExpenses[month] = 0;
            }

            monthlyExpenses[month] += transaction.amount
        });

        // Prepare data for the chart
        const months = Object.keys(monthlyExpenses);
        const amounts = Object.values(monthlyExpenses);

        const chartData = months.map((month, index) => ({
            month,
            amount: amounts[index],
        }));

        setChartData(chartData);

    }, [transactionData])

    const chartConfig = {
        expenses: {
          label: "Monthly Expenses",
          color: "#059669",
        },
      }
      

    return (
        <div className="bg-[#1e1e1e] text-white p-4 rounded-lg w-full shadow-md">
            <div className="flex justify-between pb-2">
                <h2 className="text-sm font-semibold mb-3 text-emerald-400">Monthly Expenses</h2>
            </div>
            <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => {
                            const [year, month] = value.split("-");
                            return new Date(year, month - 1).toLocaleString('default', { month: 'short' });
                          }}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="amount" fill={chartConfig.expenses.color} radius={8} />

                </BarChart>
            </ChartContainer>
        </div>
    )
}

export default MonthlyExpense