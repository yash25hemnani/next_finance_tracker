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
import { toast } from "sonner";

const SetBudget = ({color, currentMonth, currentYear, availableMonths, years, current, showBudget}) => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL : process.env.NEXT_PUBLIC_DEVELOPMENT_BACKEND_URL;

    const [isEditable, setIsEditable] = useState(false)
    const [budgetData, setBudgetData] = useState({
        budget: 0,
        month: '',
        year: ''
    })

    useEffect(() => {
        setBudgetData((prev) => ({
          ...prev,
          month: currentMonth,
          year: currentYear
        }));
      }, [currentMonth, currentYear]);

    
    useEffect(() => {
      const getBudget = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/budgets?month=${availableMonths.indexOf(budgetData.month) + 1 || availableMonths.indexOf(currentMonth) + 1}&year=${budgetData.year || currentYear}&category=${current}`)

            if (response.status === 200){
                const amount = response.data[0]?.amount ?? 0;
                setBudgetData({...budgetData, budget: amount})
            }

        } catch (error) {
            console.log(error);
        }
      }
      getBudget()
    }, [current, budgetData.month, budgetData.year])

    const addBudget = async () => {
        try {
            const response = await axios.patch(`${BACKEND_URL}/api/budgets/`, {category: current, amount: budgetData.budget, month: availableMonths.indexOf(budgetData.month) + 1, year: budgetData.year})
            
            if(response.status === 201){
                toast("Budget has been created")
            } else {
                toast("Failed to create Budget")
            }

        } catch (error) {
            console.log(error);
        }
    }
    
      
    
    return (
        <div className="w-1/4 bg-[#1e1e1e] rounded-lg p-4 flex flex-col gap-2 h-auto">
            <h1 className="text-emerald-500 font-bold text-lg">Set Budget : <span style={{ color: color }}>{current}</span></h1>
            {showBudget ?
                (<div className="flex">
                    <div className="w-full">
                        <div className="w-full space-y-2">
                            <Input type="number" min="0" value={budgetData.budget} onChange={(e) => setBudgetData({...budgetData, budget: e.target.value})}/>
                            <Select value={budgetData.month} onValueChange={(value) => setBudgetData({...budgetData, month: value})}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Month" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableMonths.map((element) => (
                                        <SelectItem key={element} value={element}>{element}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* Select Year */}
                            <Select value={budgetData.year} onValueChange={(value) => setBudgetData({...budgetData, year: value})}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((element) => (
                                        <SelectItem key={element} value={element}>{element}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={addBudget} className="w-full">Save</Button>
                        </div>
                    </div>
                </div>)
                : (<h6 className="text-gray-400">Click a Category to Get Started!</h6>)}
        </div>
    )
}

export default SetBudget