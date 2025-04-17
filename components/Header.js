"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"


const Header= ({title}) => {
    return (
        <header className="flex items-center justify-between border-b-2 border-emerald-600">
            <h3 className="font-bold text-2xl text-transparent bg-clip-text bg-emerald-500">
                {title}
            </h3>

            <SidebarTrigger />
        </header>
    )
}

export default Header;