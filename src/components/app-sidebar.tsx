import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarProvider,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings, User2, ChevronUp } from "lucide-react"

const menuItems = [
    { title: "Home", icon: Home, href: "#" },
    { title: "Inbox", icon: Inbox, href: "#" },
    { title: "Calendar", icon: Calendar, href: "#" },
    { title: "Search", icon: Search, href: "#" },
    { title: "Settings", icon: Settings, href: "#" },
]

export function AppSidebar() {
    return (
        <SidebarProvider>
            <Sidebar className="p-0 w-52 border-gray-800 border-r-4">
                {/* Main Menu */}
                <SidebarContent style={{background: 'linear-gradient(180deg, #3C2773 100%, #844DD4 100%)',}}>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.href} className="p-0 text-white flex items-center gap-2">
                                        <item.icon className="w-4 h-4" />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>

                {/* Footer Dropdown */}
                <SidebarFooter className="p-0">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="w-full flex items-center gap-2">
                                        <User2 className="w-4 h-4" />
                                        <span>shadcn</span>
                                        <ChevronUp className="ml-auto w-4 h-4 opacity-50" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    align="end"
                                    className="w-[--radix-popper-anchor-width] animate-in fade-in slide-in-from-bottom-1 rounded-md border bg-popover shadow-md"
                                >
                                    <DropdownMenuItem>
                                        <span>Account</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Billing</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    )
}
