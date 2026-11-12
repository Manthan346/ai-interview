"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, PanelLeft, Settings } from "lucide-react"
import { getUserEmail, signOutUser } from "@/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AnimatedSidebar,
  AnimatedSidebarContent,
  AnimatedSidebarFooter,
  AnimatedSidebarGroup,
  AnimatedSidebarGroupContent,
  AnimatedSidebarHeader,
  AnimatedSidebarMenu,
  AnimatedSidebarMenuButton,
  AnimatedSidebarMenuItem,
  AnimatedSidebarTrigger,
} from "@/components/ui/animated-sidebar"
import menu_item from "@/app/utils/dashboardData"

function UserAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2)
  return (
    <Avatar className="size-8 shrink-0 rounded-lg">
      <AvatarImage src="/avatars/default.jpg" alt={name} />
      <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
    </Avatar>
  )
}

export function AppSidebar() {
  const [userEmail, setUserEmail] = React.useState("")
  const [logoutError, setLogoutError] = React.useState("")
  const [isSigningOut, setIsSigningOut] = React.useState(false)
  const username = userEmail.split("@", 1)[0].replace(/[^a-z]/gi, "") || "User"
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    let active = true

    getUserEmail()
      .then((response) => {
        if (active) {
          setUserEmail(response.data.data.email)
        }
      })
      .catch((error: unknown) => {
        console.error("Failed to load user email:", error)
      })

    return () => {
      active = false
    }
  }, [])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    setLogoutError("")

    try {
      await signOutUser()
      router.replace("/signups")
    } catch (error) {
      console.error("Failed to sign out:", error)
      setLogoutError("Could not sign out. Please try again.")
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <AnimatedSidebar collapsible="icon" ariaLabel="App navigation">
      <AnimatedSidebarHeader className="border-b">
        <div className="flex min-h-10 items-center justify-between gap-2 group-data-[state=collapsed]/sidebar:justify-center">
          <Link
            href="/"
            aria-label="Auxiliam AI home"
            className="flex min-w-0 items-center gap-2 group-data-[state=collapsed]/sidebar:hidden"
          >
            <img
              src="/logo/AuxiliamAI.svg"
              alt=""
              width={48}
              height={48}
              className="size-12 shrink-0 rounded-lg object-contain"
            />
            <span className="truncate text-base font-bold">Auxiliam AI</span>
          </Link>
          <Link
            href="/"
            className="hidden group-data-[state=collapsed]/sidebar:block"
            aria-label="Auxiliam AI home"
          >
            <img
              src="/logo/AuxiliamAI.svg"
              alt=""
              width={48}
              height={48}
              className="size-12 shrink-0 rounded-lg object-contain"
            />
          </Link>
          <AnimatedSidebarTrigger className="text-muted-foreground hover:bg-muted hover:text-foreground">
            <PanelLeft className="size-5" />
          </AnimatedSidebarTrigger>
        </div>
      </AnimatedSidebarHeader>

      <AnimatedSidebarContent>
        <AnimatedSidebarGroup>
          <AnimatedSidebarGroupContent>
            <AnimatedSidebarMenu>
              {menu_item.map((item) => (
                <AnimatedSidebarMenuItem key={item.title}>
                  <AnimatedSidebarMenuButton
                    href={item.href}
                    icon={<item.icon className="size-5" />}
                    isActive={isActive(item.href)}
                  >
                    {item.title}
                  </AnimatedSidebarMenuButton>
                </AnimatedSidebarMenuItem>
              ))}
            </AnimatedSidebarMenu>
          </AnimatedSidebarGroupContent>
        </AnimatedSidebarGroup>
      </AnimatedSidebarContent>

      <AnimatedSidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex w-full min-w-0 items-center gap-2 overflow-hidden rounded-xl p-1.5 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-muted group-data-[state=collapsed]/sidebar:justify-center"
            >
              <UserAvatar name={username} />
              <div className="grid min-w-0 flex-1 text-sm leading-tight group-data-[state=collapsed]/sidebar:hidden">
                <span className="truncate font-medium">{username}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {userEmail}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-sm">
                <UserAvatar name={username} />
                <div className="grid min-w-0 flex-1 leading-tight">
                  <span className="truncate font-medium">{username}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {userEmail}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              disabled={isSigningOut}
              onSelect={(event) => {
                event.preventDefault()
                void handleSignOut()
              }}
            >
              <LogOut className="size-4" />
              <span>{isSigningOut ? "Logging out..." : "Log out"}</span>
            </DropdownMenuItem>
            {logoutError && (
              <p role="alert" className="px-2 py-1 text-xs text-destructive">
                {logoutError}
              </p>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </AnimatedSidebarFooter>
    </AnimatedSidebar>
  )
}