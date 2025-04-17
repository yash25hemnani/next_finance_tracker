"use client"

import { LabelList, Pie, PieChart } from "recharts"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import axios from "axios"

const chartConfig = {
    Food: {
        label: "Food",
        color: "#FF6384",
    },
    Transport: {
        label: "Transport",
        color: "#36A2EB",
    },
    Utilities: {
        label: "Utilities",
        color: "#FFCE56",
    },
    Entertainment: {
        label: "Entertainment",
        color: "#AA88FF",
    },
    Healthcare: {
        label: "Healthcare",
        color: "#4BC0C0",
    },
    Shopping: {
        label: "Shopping",
        color: "#FF9F40",
    },
    Education: {
        label: "Education",
        color: "#9966FF",
    },
    Savings: {
        label: "Savings",
        color: "#00C49F",
    },
    Other: {
        label: "Other",
        color: "#C0C0C0",
    },
};


const CurrentMonthChart = ({currentMonth, currentYear, availableMonths, years, current}) => {
    const [chartData, setChartData] = useState([])

    const [dataQuery, setDataQuery] = useState({
        month: '',
        year: ''
    })

    useEffect(() => {
        setDataQuery((prev) => ({
            ...prev,
            month: currentMonth,
            year: currentYear
        }));
    }, [currentMonth, currentYear]);

    useEffect(() => {
        const getCurrentMonthData = async () => {
            try {
                const response = await axios.get(`/api/category-summary/current-month?month=${availableMonths.indexOf(dataQuery.month) + 1 || availableMonths.indexOf(currentMonth) + 1}&year=${dataQuery.year || currentYear}`)
                if (response.status === 200) {
                    console.log(response.data);
                    setChartData(response.data)
                }
            } catch (error) {
                console.log(error);
            }

        }

        getCurrentMonthData()
    }, [dataQuery.month, dataQuery.year])


    return (
        <div className="w-1/2 bg-[#1e1e1e] rounded-lg p-4 flex flex-col gap-2">
            <h1 className="text-emerald-500 font-bold text-lg">Month Wise Spending</h1>
            <div className="flex gap-2 ">
                {/* Select Month */}
                <Select value={dataQuery.month} onValueChange={(value) => setDataQuery({ ...dataQuery, month: value })}>

                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableMonths?.map((element) => (
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
                        {years?.map((element) => (
                            <SelectItem key={element} value={element}>{element}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div >
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px] [&_.recharts-text]:fill-background"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="totalAmount" hideLabel />}
                        />
                        {/* To get the colors, use fill in chartData */}
                        <Pie data={chartData} dataKey="totalAmount">
                            <LabelList
                                dataKey="category"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value) =>
                                    chartConfig[value]?.label
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </div>
        </div>
    )
}

export default CurrentMonthChart