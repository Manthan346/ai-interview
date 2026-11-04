// app/(dashboard)/layout.tsx
import { Menu } from "lucide-react"
import {
  AnimatedSidebarProvider,
  AnimatedSidebarInset,
  AnimatedSidebarTrigger,
} from "@/components/ui/animated-sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import DashboardBreadcrumb from "@/components/breadcrumbs/dashboard-breadcrumb"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AnimatedSidebarProvider>
      <AppSidebar />
    <AnimatedSidebarInset>
  <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background px-4 md:hidden">
    <AnimatedSidebarTrigger className="hover:bg-muted">
      <Menu className="size-5" />
    </AnimatedSidebarTrigger>
  </header>
  <div className="min-w-0 flex-1">
    <div className="sticky top-0 z-30 hidden border-b bg-background px-6 py-3 md:block lg:px-8">
      <DashboardBreadcrumb />
    </div>
    {children}
  </div>
</AnimatedSidebarInset>
    </AnimatedSidebarProvider>
  )
}