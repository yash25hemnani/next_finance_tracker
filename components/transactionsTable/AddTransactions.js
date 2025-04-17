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
import { useDispatch } from "react-redux";
import { addNewTransaction } from "@/store/transactionSlice";

const selectValues = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Education', 'Savings', 'Other']

const AddTransactions = ({isEditDialog = false}) => {
    const dispatch = useDispatch()
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')

    useEffect(() => {
        if(!date) {
            setDate(new Date().toISOString().split('T')[0]) 
        }
    }, []);

    const categoryColors = {
        Food: '#FF6384',
        Transport: '#36A2EB',
        Utilities: '#FFCE56',
        Entertainment: '#AA88FF',
        Healthcare: '#4BC0C0',
        Shopping: '#FF9F40',
        Education: '#9966FF',
        Savings: '#00C49F',
        Other: '#C0C0C0',
      };

    
    const addTransaction = async () => {
        try {
            console.log(date, amount, category);
            const color = categoryColors[category] || '#000000';
            console.log(color);
            const response = await axios.post("/api/transactions", {
                amount: parseInt(amount), description: 'Something', date, category, color
            })

            if (response.status === 201) {
                setDate(new Date().toISOString().split('T')[0]) 
                setAmount(0)
                setCategory('')
                dispatch(addNewTransaction(response.data))
                toast.success("Transaction Added Successfully.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog className="bg-[#1e1e1e]">
            <DialogTrigger className={`${buttonVariants({ variant: "default" })} bg-emerald-600`}>
                {isEditDialog ? 'Edit' : 'Add'}
            </DialogTrigger>

            <DialogContent className="flex flex-col gap-3">
                <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                </DialogHeader>
                <Input placeholder="Enter Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                <div className="w-full flex gap-3">
                    <Select value={category} onValueChange={(value) => setCategory(value)}>
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
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <Button onClick={addTransaction} className="bg-emerald-500 hover:bg-emerald-600">
                    Save
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default AddTransactions