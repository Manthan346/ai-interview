import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { SearchSlash, User2 } from "lucide-react"
import menu_item from "@/app/utils/dashboardData"





export default function AppSideBar() {

  
  
  return (
 
      <div className="flex">
        
        <Sidebar>
       
          
                 <SidebarHeader className="bo text-3xl cursor-pointer">
        <div className="flex items-center gap-3 px-2">
            <User2 className="" />
        
           <span className="font-semibold">AI Interview</span>
        </div>
      </SidebarHeader>
        
            
            
         

          <SidebarContent>
            <SidebarGroup className="">
              <SidebarGroupLabel>hello</SidebarGroupLabel>

              <SidebarGroupContent className="">
                <SidebarMenu className="">
                 {
                    menu_item.map((item) => (
                        <SidebarMenuItem key={item.title} >
                           
                            <SidebarMenuButton>
                               
                             <item.icon />   <a href={item.href}>{item.title}</a>
                            </SidebarMenuButton>
                     
                        </SidebarMenuItem>
                    ))
                 }
                </SidebarMenu>
              </SidebarGroupContent>

            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuButton>
                    <SidebarMenuItem>username</SidebarMenuItem>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarGroupContent>
          </SidebarFooter>
        </Sidebar>

          
        
          <SidebarTrigger />

      </div>
    
  )
}