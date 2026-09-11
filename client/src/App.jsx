import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./components/Layout.jsx";
import Loader from "./components/Loader.jsx";

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

const router = createBrowserRouter([
  // PUBLIC SITE
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorScreen />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "projects", element: <Projects /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:id", element: <BlogPost /> },
      { path: "experience", element: <Experience /> },
      { path: "skills", element: <Skills /> },
      { path: "contact", element: <Contact /> },
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
  return <RouterProvider router={router} />;
}

export default App;
