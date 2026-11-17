import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "../ui/Seo.jsx";

const ErrorScreen = () => {
  return (
    <main className="relative isolate min-h-screen flex items-center justify-center px-6 py-24 text-center">
      <Seo
        title="Page Not Found | Saif Tandel"
        description="Sorry, the page you're looking for doesn't exist."
        path="/404"
        noindex
      />
      <div className="site-backdrop" aria-hidden="true" />
      <div className="hero-in max-w-xl">
        <p className="text-7xl sm:text-8xl font-bold tracking-tight text-gradient">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            Go back home
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link to="/projects" className="btn btn-ghost">
            See my work
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorScreen;
