"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Video, Users, GraduationCap, LayoutDashboard, FileText, MessageSquare } from "lucide-react";
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
        title: "Dashboard",
        url: "/flutterflirt-admin-login/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "IoT Masterclasses",
        url: "/flutterflirt-admin-login/iot-labs",
        icon: Video,
    },
    {
        title: "Students",
        url: "/flutterflirt-admin-login/students",
        icon: Users,
    },
    {
        title: "College Requests",
        url: "/flutterflirt-admin-login/college-requests",
        icon: GraduationCap,
    },
    {
        title: "Blog Management",
        url: "/flutterflirt-admin-login/blogs",
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
        <Sidebar className="border-none bg-white">
            <SidebarHeader className="px-5 py-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#2563eb] text-white font-black text-sm shadow-xs">
                        FF
                    </div>
                    <div>
                        <span className="font-bold text-base text-[#142845] tracking-tight block">Flutterflirt</span>
                        <span className="text-[11px] font-semibold text-[#617b9b] uppercase tracking-wider block">Admin Panel</span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[11px] font-bold text-[#8ba2bd] uppercase tracking-wider px-3 mb-2">
                        Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {adminItems.map((item) => {
                                const isActive = pathname === item.url || (item.url !== "/flutterflirt-admin-login/dashboard" && pathname?.startsWith(item.url));
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            render={<Link href={item.url} />}
                                            isActive={isActive}
                                            className={`rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                                                isActive
                                                    ? "bg-[#edf5ff] text-[#2563eb] font-bold"
                                                    : "text-[#4a6382] hover:bg-[#f8fbff] hover:text-[#142845]"
                                            }`}
                                        >
                                            <item.icon className={`h-4 w-4 ${isActive ? "text-[#2563eb]" : "text-[#8ba2bd]"}`} />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            className="rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-[#dc2626] hover:bg-[#fef2f2] hover:text-[#b91c1c] transition"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}