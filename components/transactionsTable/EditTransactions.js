"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import axios from "axios";
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux";
import { loadTransactionArray } from "@/store/transactionSlice";

const selectValues = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Education', 'Savings', 'Other']


const EditTransactions = ({ open, setOpen, currentId }) => {
    const dispatch = useDispatch()

    const [transactionData, setTransactionData] = useState({
        amount: 0,
        category: '',
        date: '',
        description: '',
        color: ''
    })

    const transactions = useSelector(state => state.transactions.transactionData)

    useEffect(() => {
      const getTransactionDetails =  (currentId) => {
        try {
            const data = transactions.find(element => element._id === currentId)
            console.log(data);

            if(data){
                const temp = {
                    amount: data.amount,
                    category: data.category,
                    date: data.date,
                    description: data.description,
                    color: data.color
                }

                setTransactionData(temp)
            }

        } catch (error) {
            console.log(error);
        }
      }

      getTransactionDetails(currentId)
    }, [currentId])

    const updateData = async (currentId) => {
        try {
            const updateResponse = await axios.patch(
                `/api/transactions/${currentId}`,
                { ...transactionData, _id: currentId }
            );
    
            if(updateResponse.status === 200){
                toast("Updated Successfully!")
                const updatedTransactionData = transactions.map((element) => {
                    if(element._id === currentId){
                        element.amount = transactionData.amount;
                        element.category = transactionData.category;
                        element.date = transactionData.date;
                        element.description = transactionData.description;
                        element.color = transactionData.color;
                    }

                    return element
                })

                dispatch(loadTransactionArray(updatedTransactionData))
            }
        } catch (error) {
            console.error("Update failed:", error.response?.data || error.message);
        }
    };
    

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen} className="bg-[#1e1e1e]">


                <DialogContent className="flex flex-col gap-3">
                    <DialogHeader>
                        <DialogTitle>Update Transaction</DialogTitle>
                    </DialogHeader>

                    <Input placeholder="Enter Amount" type="number" value={transactionData.amount ?? 0} onChange={(e) => setTransactionData({...transactionData, amount: e.target.value})} />

                    <div className="w-full flex gap-3">
                        <Select value={transactionData.category} onValueChange={(value) => setTransactionData({...transactionData, category: value})}>
                            <SelectTrigger className="w-1/2">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup >
                                    <SelectLabel>Category</SelectLabel>
                                    {selectValues.map((item) => (
                                        <SelectItem key={item} value={item}>{item}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-1/2 justify-start text-left font-normal bg-transparent",
                                        !transactionData.date  && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {transactionData.date ? format(transactionData.date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={transactionData.date}
                                    onSelect={(value) => setTransactionData({...transactionData, date: value})}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Button onClick={() => updateData(currentId)} className="bg-emerald-500 hover:bg-emerald-600">
                        Update
                    </Button>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default EditTransactions