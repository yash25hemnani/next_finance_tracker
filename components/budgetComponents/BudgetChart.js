import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const BudgetChart = ({ color, currentMonth, currentYear, availableMonths, years, current, showBudget }) => {
    const [chartData, setChartData] = useState([
        { category: "", budget: 0, actual: 0 }
    ]);

    const [dataQuery, setDataQuery] = useState({
        month: '',
        year: ''
    })

    const chartConfig = {
        expenses: {
            label: "Budget vs Actual",
            color: "#059669",
        },
    }

    useEffect(() => {
        setDataQuery((prev) => ({
            ...prev,
            month: currentMonth,
            year: currentYear
        }));
    }, [currentMonth, currentYear]);

    useEffect(() => {
      const getActualAndBudget = async () => {
        try {
            const response = await axios.get(`/api/budget-summary?month=${availableMonths.indexOf(dataQuery.month) + 1 || availableMonths.indexOf(currentMonth) + 1}&year=${dataQuery.year || currentYear}&category=${current}`)

            if(response.status === 200) {
                console.log(response.data);
                setChartData([{
                    category: current,
                    budget: response.data.budget,
                    actual: response.data.actual
                }])
            }

        } catch (error) {
            console.log(error);
        }
      }

      getActualAndBudget()
    }, [current, dataQuery.month, dataQuery.year])
    

    return (
        <div className="w-full bg-[#1e1e1e] rounded-lg p-4 flex flex-col gap-2">
            <h1 className="text-emerald-500 font-bold text-lg">Budget Insights : <span style={{ color: color }}>{current}</span></h1>
            {showBudget ?
                (<div className="flex gap-4">
                    <div className="flex flex-col gap-2 ">
                        {/* Select Month */}
                        <Select value={dataQuery.month} onValueChange={(value) => setDataQuery({ ...dataQuery, month: value })}>

                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Month" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableMonths.map((element) => (
                                    <SelectItem key={element} value={element}>{element}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {/* Select Year */}
                        <Select value={dataQuery.year} onValueChange={(value) => setDataQuery({ ...dataQuery, year: value })}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((element) => (
                                    <SelectItem key={element} value={element}>{element}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full">
                        <ChartContainer config={chartConfig}>
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="category" 
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="actual" fill={chartConfig.expenses.color} radius={8} />
                                <Bar dataKey="budget" fill={color} radius={8} /> 
                            </BarChart>
                        </ChartContainer>

                    </div>
                </div>)
                : (<h6 className="text-gray-400">Click a Category to Get Started!</h6>)}
        </div>
    )
}

export default BudgetChart