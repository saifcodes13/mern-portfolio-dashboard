import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./components/Layout.jsx";
import Loader from "./components/Loader.jsx";
import { PortfolioProvider } from "./context/PortfolioContext.jsx";
import Seo from "./components/ui/Seo.jsx";

// Public pages (Eagerly loaded for instant render)
import Home from "./components/Pages/Home.jsx";
import Services from "./components/Services.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Pages/Projects.jsx";
import Skills from "./components/Pages/Skills.jsx";
import Blogs from "./components/Pages/Blogs.jsx";
import BlogPost from "./components/Pages/BlogPost.jsx";
import Contact from "./components/Pages/Contact.jsx";
import ErrorScreen from "./components/Pages/Error.jsx";

// Admin pages (Code-Split / Lazy-loaded to keep public bundle light)
const AdminLogin = lazy(() => import("./components/Pages/AdminLogin.jsx"));
const AdminLayout = lazy(() => import("./components/Admin/AdminLayout.jsx"));
const AdminDashboard = lazy(() => import("./components/Admin/AdminDashboard.jsx"));
const AdminProjects = lazy(() => import("./components/Admin/AdminProjects.jsx"));
const AdminSkills = lazy(() => import("./components/Admin/AdminSkills.jsx"));
const AdminEditProject = lazy(() => import("./components/Admin/AdminEditProject.jsx"));
const AdminEditSkill = lazy(() => import("./components/Admin/AdminEditSkill.jsx"));
const AdminCreateProject = lazy(() => import("./components/Admin/AdminCreateProject.jsx"));
const AdminBlogs = lazy(() => import("./components/Admin/AdminBlogs.jsx"));
const AdminCreateBlog = lazy(() => import("./components/Admin/AdminCreateBlog.jsx"));
const AdminEditBlog = lazy(() => import("./components/Admin/AdminEditBlog.jsx"));
const ProtectedRoute = lazy(() => import("./components/Admin/ProtectedRoute.jsx"));

const AdminSuspense = ({ children }) => (
  <Suspense fallback={<Loader message="Loading Admin Panel..." minHeight="min-h-screen" />}>
    {children}
  </Suspense>
);

// Standalone public pages reuse the home-page sections, so their per-route
// <title>/description/canonical are attached here.
const withSeo = (page, seo) => (
  <>
    <Seo {...seo} />
    {page}
  </>
);

const router = createBrowserRouter([
  // PUBLIC SITE
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorScreen />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "services",
        element: withSeo(<Services />, {
          title: "Web Development Services in Dubai | Web Apps, CRMs & APIs – Saif Tandel",
          description: "Full-stack web development, custom CRMs and dashboards, API integrations, UI/UX and cloud DevOps for startups and businesses in Dubai, UAE and worldwide. Free consultation and fixed quotes.",
          path: "/services",
        }),
      },
      {
        path: "projects",
        element: withSeo(<Projects />, {
          title: "Projects & Case Studies | Web Apps, CRMs & Websites – Saif Tandel",
          description: "Booking platforms, enterprise CRMs, e-commerce stores and business websites built by Saif Tandel for real clients. Browse live projects and get a quote for something similar.",
          path: "/projects",
        }),
      },
      {
        path: "blogs",
        element: withSeo(<Blogs />, {
          title: "Engineering Blog | Web Development, CRM & DevOps Insights – Saif Tandel",
          description: "Practical articles on full-stack web engineering, cloud deployment, CRM development and database performance by freelance developer Saif Tandel.",
          path: "/blogs",
        }),
      },
      { path: "blogs/:id", element: <BlogPost /> },
      {
        path: "experience",
        element: withSeo(<Experience />, {
          title: "Experience | Full-Stack Developer Track Record – Saif Tandel",
          description: "Production experience building CRM modules, REST APIs and high-performance React interfaces for real businesses.",
          path: "/experience",
        }),
      },
      {
        path: "skills",
        element: withSeo(<Skills />, {
          title: "Skills & Tech Stack | React, Node.js, MongoDB, MySQL, AWS – Saif Tandel",
          description: "The production-proven stack behind every project: React.js, Node.js, Express, MongoDB, MySQL, AWS S3, Nginx, Cloudflare and GitHub Actions.",
          path: "/skills",
        }),
      },
      {
        path: "contact",
        element: withSeo(<Contact />, {
          title: "Get a Free Quote | Hire a Freelance Web Developer in Dubai – Saif Tandel",
          description: "Tell me about your web app, CRM, dashboard or website. Free 30-minute consultation, fixed quote and timeline, reply within 24 hours. Dubai, UAE and remote worldwide.",
          path: "/contact",
        }),
      },
    ],
  },

  // ADMIN LOGIN (NO LAYOUT)
  {
    path: "/admin/login",
    element: (
      <AdminSuspense>
        <AdminLogin />
      </AdminSuspense>
    ),
  },

  // ADMIN PANEL
  {
    path: "/admin",
    element: (
      <AdminSuspense>
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      </AdminSuspense>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "projects",
        element: <AdminProjects />,
      },
      {
        path: "skills",
        element: <AdminSkills />,
      },
      {
        path: "blogs",
        element: <AdminBlogs />,
      },
      {
        path: "blogs/create",
        element: <AdminCreateBlog />,
      },
      {
        path: "blogs/:id/edit",
        element: <AdminEditBlog />,
      },
      {
        path: "projects/:id/edit",
        element: <AdminEditProject />,
      },
      {
        path: "skills/edit",
        element: <AdminEditSkill />,
      },
      {
        path: "projects/create",
        element: <AdminCreateProject />,
      },
    ],
  },
]);

function App() {
  return (
    <PortfolioProvider>
      <RouterProvider router={router} />
    </PortfolioProvider>
  );
}

export default App;
