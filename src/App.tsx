
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Publications from "./pages/Publications";
import Publication from "./pages/Publication";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Define sections that can be enabled/disabled
// These settings would ideally come from a settings context or API in a real app
export const sectionConfig = {
  projects: true,    // Set to false to disable Projects section
  publications: true, // Set to false to disable Publications section
  blog: true,        // Set to false to disable Blog section
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="devscribe-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Conditionally render routes based on section config */}
              {sectionConfig.projects && (
                <Route path="/projects" element={<Projects />} />
              )}
              
              {sectionConfig.blog && (
                <>
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                </>
              )}
              
              <Route path="/about" element={<About />} />
              
              {sectionConfig.publications && (
                <>
                  <Route path="/publications" element={<Publications />} />
                  <Route path="/publications/:id" element={<Publication />} />
                </>
              )}
              
              {/* Redirect disabled sections to home */}
              {!sectionConfig.projects && (
                <Route path="/projects" element={<Navigate to="/" replace />} />
              )}
              
              {!sectionConfig.blog && (
                <>
                  <Route path="/blog" element={<Navigate to="/" replace />} />
                  <Route path="/blog/:id" element={<Navigate to="/" replace />} />
                </>
              )}
              
              {!sectionConfig.publications && (
                <>
                  <Route path="/publications" element={<Navigate to="/" replace />} />
                  <Route path="/publications/:id" element={<Navigate to="/" replace />} />
                </>
              )}
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
