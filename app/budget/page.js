"use client"
import Header from "@/components/Header";
import BudgetBox from "@/components/budgetComponents/BudgetBox";
import BudgetOperations from "@/components/budgetComponents/BudgetOperations";
import { Utensils, Bus, Plug, Gamepad, HeartPulse, ShoppingBag, BookOpen, PiggyBank, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const categoryMeta = [
    {
        text: "Food",
        icon: <Utensils />,
        color: "#FF6384",
    },
    {
        text: "Transport",
        icon: <Bus />,
        color: "#36A2EB",
    },
    {
        text: "Utilities",
        icon: <Plug />,
        color: "#FFCE56",
    },
    {
        text: "Entertainment",
        icon: <Gamepad />,
        color: "#AA88FF",
    },
    {
        text: "Healthcare",
        icon: <HeartPulse />,
        color: "#4BC0C0",
    },
    {
        text: "Shopping",
        icon: <ShoppingBag />,
        color: "#FF9F40",
    },
    {
        text: "Education",
        icon: <BookOpen />,
        color: "#9966FF",
    },
    {
        text: "Savings",
        icon: <PiggyBank />,
        color: "#00C49F",
    },
    {
        text: "Other",
        icon: <MoreHorizontal />,
        color: "#C0C0C0",
    },
];
export default function Home() {
    const [showBudget, setShowBudget] = useState(false)
    const [current, setCurrent] = useState('')
    const [color, setColor] = useState('')

    return (
        <div className="bg-[#0f0e0e] min-h-screen w-full overflow-x-hidden">
            <main className="max-w-screen-xl mx-auto flex flex-col gap-8 text-white px-4 py-8 ">
                <Header title={"Budget"} />
                <div className="w-full flex flex-col lg:flex-row gap-2 flex-wrap flex-1">
                    {categoryMeta.map((element) => (
                        <BudgetBox key={element.text} text={element.text} color={element.color} icon={element.icon} setShowBudget={setShowBudget} setCurrent={setCurrent} setColor={setColor}/>
                    ))}
                </div>
                <div>
                    <BudgetOperations showBudget={showBudget} current={current} color={color}/>
                </div>
            </main>
        </div>
    );
}
