import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { User2, ChevronUp } from "lucide-react"

export function UserDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted">
                    <User2 className="h-4 w-4" />
                    shadcn
                    <ChevronUp className="ml-auto h-4 w-4 opacity-50" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="top"
                align="end"
                className="w-[--radix-popper-anchor-width] rounded-md border bg-popover p-1 shadow-md"
            >
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
