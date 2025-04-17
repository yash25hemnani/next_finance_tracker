import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import SetBudget from "./SetBudget";
import BudgetChart from "./BudgetChart";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const years = ["2025"]

const BudgetOperations = ({ showBudget, current, color }) => {
    const [currentMonth, setCurrentMonth] = useState("");
    const [currentYear, setCurrentYear] = useState("");
    const [availableMonths, setAvailableMonths] = useState([])

    useEffect(() => {
        const date = new Date();

        const month = months[date.getMonth()];
        const year = date.getFullYear();

        let tempArray = [];
        for (let i = 0; i < date.getMonth() + 1; i++) {
            tempArray.push(months[i])
        }

        console.log(tempArray);

        setAvailableMonths(tempArray)

        setCurrentMonth(month);
        setCurrentYear(year.toString());
    }, []);

    return (
        <div className="flex gap-2 items-start">
            <SetBudget color={color} currentMonth={currentMonth} currentYear={currentYear} availableMonths={availableMonths} years={years} current={current} showBudget={showBudget}/>

            <BudgetChart color={color} currentMonth={currentMonth} currentYear={currentYear} availableMonths={availableMonths} years={years} current={current} showBudget={showBudget}/>

        </div>
    )
}

export default BudgetOperations