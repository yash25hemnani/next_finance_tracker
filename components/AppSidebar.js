"use client"
import { Calendar, Home, WalletCards, PieChart, Coins } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: WalletCards,
  },
  {
    title: "Category",
    url: "/category",
    icon: PieChart,
  },
  {
    title: "Budget",
    url: "/budget",
    icon: Coins,
  },
]

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarContent className="bg-[#1e1e1e] text-white">
        <SidebarGroup className="border-none">
          <SidebarGroupLabel className="text-white font-bold">Finance Tracker</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
