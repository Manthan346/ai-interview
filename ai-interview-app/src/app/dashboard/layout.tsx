import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSideBar from "@/components/sidebar/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main className="relative flex-1 w-full h-screen overflow-y-auto bg-background">
        <div className="absolute top-4 left-4 z-50">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
