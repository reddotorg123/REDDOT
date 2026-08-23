import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MessageSquare } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy-load all pages and heavy components
const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Career = lazy(() => import("./pages/Career"));
const Internship = lazy(() => import("./pages/Internship"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Products = lazy(() => import("./pages/Products"));
const IndustriesPage = lazy(() => import("./pages/Industries"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AvatarWidget = lazy(
  () => import("./components/AvatarWidget/AvatarWidget")
);
const BookingModal = lazy(() => import("./components/BookingModal"));
const SearchModal = lazy(() => import("./components/SearchModal"));

// Minimal skeleton while routes load
const PageSkeleton = () => (
  <div className="min-h-screen bg-background animate-pulse" />
);

function DeferredAvatarWidget() {
  const [enabled, setEnabled] = useState(false);

  if (enabled) {
    return (
      <Suspense fallback={null}>
        <AvatarWidget startOpen />
      </Suspense>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEnabled(true)}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl transition-transform hover:scale-105"
      title="Open AI Support"
      aria-label="Open AI Support"
    >
      <MessageSquare size={28} />
      <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
    </button>
  );
}

function Router() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<PageSkeleton />}>
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/products"} component={Products} />
          <Route path={"/industries"} component={IndustriesPage} />
          <Route path={"/contact"} component={Contact} />
          <Route path={"/career"} component={Career} />
          <Route path={"/internship"} component={Internship} />
          <Route path={"/blog"} component={Blog} />
          <Route path={"/blog/:slug"} component={BlogPost} />
          <Route path={"/privacy"} component={Legal} />
          <Route path={"/terms"} component={Legal} />
          <Route path={"/cookies"} component={Legal} />
          <Route path={"/security"} component={Legal} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <Footer />
      <DeferredAvatarWidget />
      <Suspense fallback={null}>
        <BookingModal />
        <SearchModal />
      </Suspense>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
