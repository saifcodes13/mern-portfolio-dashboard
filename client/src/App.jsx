import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./components/Layout.jsx";

// Public pages
import Home from "./components/Pages/Home.jsx";
import Projects from "./components/Pages/Projects.jsx";
import Skills from "./components/Pages/Skills.jsx";
import Contact from "./components/Pages/Contact.jsx";
import ErrorScreen from "./components/Pages/Error.jsx";

// Admin
import AdminLogin from "./components/Pages/AdminLogin.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import AdminProjects from "./components/Admin/AdminProjects.jsx";
import AdminSkills from "./components/Admin/AdminSkills.jsx";
import AdminEditProject from "./components/Admin/AdminEditProject.jsx";
import AdminEditSkill from "./components/Admin/AdminEditSkill.jsx";
import AdminCreateProject from "./components/Admin/AdminCreateProject.jsx";

const router = createBrowserRouter([
  // PUBLIC SITE
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorScreen />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "skills", element: <Skills /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  //  ADMIN LOGIN (NO LAYOUT)
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  // ADMIN PANEL
  {
    path: "/admin",
    element: <AdminLayout />,
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
        path: "projects/:id/edit",
        element: <AdminEditProject />,
      },
      {
        path:"skills/edit",
        element: <AdminEditSkill/>
        
      },
      {
        path:"projects/create",
        element:<AdminCreateProject/>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
