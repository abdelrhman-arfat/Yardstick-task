import { Home, BadgePlus, Wallet } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },

  {
    title: "Add new Transaction",
    url: "/new-transaction",
    icon: BadgePlus,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            className="flex items-center gap-x-2 rounded-md py-6 px-3 text-sm font-semibold leading-6 text-gray-900"
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#0466c8",
              padding: "8px 12px",
              margin: "10px 0px",
            }}
          >
            <Wallet />
            Transaction App
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className="flex items-center gap-x-2 rounded-md py-6 px-3 text-sm font-semibold leading-6 "
                      href={item.url}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
