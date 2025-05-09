
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, ChartBar, Users, Settings } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider collapsedWidth={56}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r w-60" collapsible>
          <SidebarContent>
            <div className="px-3 py-4">
              <h2 className="text-lg font-bold">Análisis Bancario</h2>
            </div>
            <SidebarGroup defaultOpen>
              <SidebarGroupLabel>Navegación</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex items-center" asChild>
                      <a href="/" className="flex items-center bg-muted text-primary font-medium">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex items-center" asChild>
                      <a href="/analisis" className="flex items-center hover:bg-muted/50">
                        <ChartBar className="h-4 w-4 mr-2" />
                        <span>Análisis</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex items-center" asChild>
                      <a href="/clientes" className="flex items-center hover:bg-muted/50">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Clientes</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex items-center" asChild>
                      <a href="/ajustes" className="flex items-center hover:bg-muted/50">
                        <Settings className="h-4 w-4 mr-2" />
                        <span>Ajustes</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
