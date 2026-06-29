import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardBreadcrumb from "@/components/breadcrumbs/dashboard-breadcrumb"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      

      <main className="relative flex-1 w-full h-screen overflow-y-auto">
        <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
          <SidebarTrigger />
          <DashboardBreadcrumb />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
