import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Project from "./pages/project/Project";
import Blog from "./pages/blog/Blog";
import BlogPost from "./pages/blogpost/BlogPost";
import About from "./pages/about/About";
import Publications from "./pages/publications/Publications";
import Publication from "./pages/publication/Publication";
import NotFound from "./pages/notfound/NotFound";
import { sectionConfig } from "./config/sectionConfig";
import AuthCallback from "./pages/authcallback/AuthCallback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="devscribe-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/portfolio">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Conditionally render routes based on section config */}
              {sectionConfig.projects && (
                <>
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<Project />} />
                </>
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
                <>
                  <Route path="/projects" element={<Navigate to="/" replace />} />
                  <Route path="/projects/:id" element={<Navigate to="/" replace />} />
                </>
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
              
              <Route path="/auth/callback" element={<AuthCallback />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
