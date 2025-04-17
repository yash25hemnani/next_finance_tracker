"use client"
import Header from "@/components/Header";
import TransactionTable from "@/components/transactionsTable/TransactionTable";

export default function Home() {
  return (
    <div className="bg-[#0f0e0e] min-h-screen w-full overflow-x-hidden">
        <main className="max-w-screen-xl mx-auto flex flex-col gap-8 text-white px-4 py-8 ">
        <Header title={"Transactions"}/>
        <div className="w-full">
          <TransactionTable isDetailedView={true}/>
        </div>
      </main>
    </div>
  );
}
