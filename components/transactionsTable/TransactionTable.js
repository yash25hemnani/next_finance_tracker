"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import AddTransactions from "./AddTransactions"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import EditTransactions from "./EditTransactions";
import { loadTransactionArray } from "@/store/transactionSlice";


const TransactionTable = ({ isDetailedView }) => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL : process.env.NEXT_PUBLIC_DEVELOPMENT_BACKEND_URL;

    const dispatch = useDispatch()

    const router = useRouter();
    const transactionData = useSelector(state => state.transactions.transactionData)
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState('')
    const [toDelete, setToDelete] = useState([])

    const handleRowClick = (id) => {
        console.log(id);
        setCurrentId(id)
        setOpen(true)
    }

    const handleCheckBox = (checked, id) => {
        console.log(id);
        if (checked) {
            setToDelete((prev) => [...prev, id]);
        } else {
            setToDelete((prev) => prev.filter((item) => item !== id));
        }
    };
    useEffect(() => {
        console.log(toDelete);
    }, [toDelete])

    const transactions = useSelector(state => state.transactions.transactionData)

    const handleDelete = async (toDelete) => {
        try {
            for (const id of toDelete) {
                const response = await axios.delete(`${BACKEND_URL}/api/transactions/${id}`);

                if (response.status === 200) {
                    const temp = transactions.filter(element => element._id !== id);
                    dispatch(loadTransactionArray(temp));
                    toast("Deleted Succesfully!")
                }
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex flex-col gap-2">
            <EditTransactions open={open} setOpen={setOpen} currentId={currentId} />

            <div className="bg-[#1e1e1e] text-white p-4 rounded-lg w-full shadow-md">
                <div className="flex justify-between pb-2">
                    <h2 className="text-sm font-semibold mb-3 text-emerald-400">Recent Expenses</h2>
                    {isDetailedView ?
                        <div className="flex gap-2">
                            <AddTransactions />
                            <Button onClick={() => handleDelete(toDelete)} className="bg-red-800">Delete</Button>
                        </div> :
                        <div className="flex gap-2">
                            <AddTransactions />
                            <Button onClick={() => router.push("/transactions")} className="bg-blue-800">All</Button>
                        </div>
                    }
                </div>

                {/* Header Row */}
                <div className="flex justify-between text-xs text-gray-400 font-medium px-2 py-1">
                    {isDetailedView ?
                        <div className="w-1/12 truncate ">
                            Select
                        </div> : ''}
                    <div className="w-1/3">Amount</div>
                    <div className="w-1/4">Category</div>
                    <div className="w-1/6 text-right font-semibold">Date</div>
                </div>

                {/* Expense Rows */}
                {transactionData.length === 0 ? '' : transactionData.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center px-2 py-2 text-sm hover:bg-[#2a2a2a] rounded-md transition">
                        {isDetailedView ?
                            <div className="w-1/12 truncate">
                                <Checkbox onCheckedChange={(checked) => handleCheckBox(checked, item._id)} />
                            </div> : ''}
                        <div onClick={() => handleRowClick(item._id)} className="w-1/3 truncate">{item.amount}</div>
                        <div className="w-1/4">
                            <span className={`text-xs text-white px-2 py-1 rounded-full`} style={{ backgroundColor: item.color }}>
                                {item.category}
                            </span>
                        </div>
                        <div className="w-1/6 text-right font-semibold">{new Date(item.date).toLocaleDateString()}</div>
                    </div>
                ))}
            </div>
            <span className="text-gray-500 mx-auto">Click to Edit or View Description</span>
        </div>

    )
}

export default TransactionTable;