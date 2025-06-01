
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { ContactModal } from "./contact-modal";
import { sectionConfig } from "@/config/sectionConfig";

// Base navigation items
const baseNavItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects", configKey: "projects" },
  { name: "Publications", href: "/publications", configKey: "publications" },
  { name: "Blog", href: "/blog", configKey: "blog" },
  { name: "About", href: "/about" },
];

// Filter nav items based on section config
const navItems = baseNavItems.filter(item => 
  !item.configKey || sectionConfig[item.configKey as keyof typeof sectionConfig]
);

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const location = useLocation();
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  // Check if we're on the Home or About page to hide the contact button
  const hideContactButton = location.pathname === "/" || location.pathname === "/about";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight">Ayush Kumar</span>
            </Link>
            <nav className="hidden md:flex md:gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "animated-underline text-sm font-medium transition-colors hover:text-foreground/80",
                    isActiveRoute(item.href)
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            {!hideContactButton && (
              <div className="hidden md:block">
                <Button onClick={() => setContactModalOpen(true)}>
                  Contact
                </Button>
              </div>
            )}
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-xs">
                <div className="flex flex-col gap-6 pt-6">
                  <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                      <span className="text-xl font-bold">Ayush Kumar</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <div className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "text-foreground/60 hover:text-foreground text-sm font-medium transition-colors",
                          isActiveRoute(item.href) && "text-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {!hideContactButton && (
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => {
                          setContactModalOpen(true);
                          setMobileMenuOpen(false);
                        }}
                      >
                        Contact
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </>
  );
}
