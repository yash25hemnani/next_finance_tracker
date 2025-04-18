"use client"
import Image from "next/image";
import Header from "@/components/Header";
import TransactionTable from "@/components/transactionsTable/TransactionTable";
import { useEffect, useState } from "react";
import axios from "axios";
import MonthlyExpense from "@/components/monthlyExpense/MonthlyExpense";
import { useSelector, useDispatch } from "react-redux";
import { loadTransactionArray } from "@/store/transactionSlice";

export default function Home() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL : process.env.NEXT_PUBLIC_DEVELOPMENT_BACKEND_URL;

  const dispatch = useDispatch()
  const transactionData = useSelector(state => state.transactions.transactionData)
  const [data, setData] = useState([])
  

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
          const response = await axios.get(`${BACKEND_URL}/api/transactions`, )

          if (response.status === 200) {
            console.log(response.data);
            dispatch(loadTransactionArray(response.data));
            setData(response.data)
          }
      } catch (error) {
          console.log(error);
      }
    }

    getAllTransactions()
  }, [])
  
  return (
    <div className="bg-[#0f0e0e] min-h-screen w-full overflow-x-hidden">
      <main className="max-w-screen-xl mx-auto flex flex-col gap-8 text-white px-4 py-8 ">
        <Header title={"Finance Tracker"}/>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-1/2">
          <TransactionTable />
          </div>
          <div className="w-full lg:w-1/2">
            <MonthlyExpense />
          </div>
        </div>
        <div>

        </div>
      </main>
    </div>
  );
}
