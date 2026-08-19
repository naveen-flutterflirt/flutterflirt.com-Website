"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, MessageSquare, LogOut } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const adminItems = [
    {
        title: "Blog Management",
        url: "/flutterflirt-admin-login",
        icon: FileText,
    },
    {
        title: "Query Management",
        url: "/flutterflirt-admin-login/queries",
        icon: MessageSquare,
    },
]

export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem("flutterflirt_admin_token");
        router.push("/flutterflirt-admin-login");
    };

    return (
        <Sidebar collapsible="none">
            <SidebarHeader className="px-4 py-6">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563eb] text-white font-bold">
                        FF
                    </div>
                    <span className="font-serif font-bold text-lg text-[#142845]">Admin Panel</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminItems.map((item) => {
                                const isActive = pathname === item.url || (item.url !== "/flutterflirt-admin-login" && pathname?.startsWith(item.url));
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton render={<Link href={item.url} />} isActive={isActive}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLogout} className="text-[#dc2626] hover:text-[#b91c1c] hover:bg-[#fef2f2]">
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}