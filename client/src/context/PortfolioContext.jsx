import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  fetchProjects,
  fetchSkills,
  fetchPersonalInfo,
  fetchBlogs,
} from "../api/portfolioApi";
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  skillsData as defaultSkills,
  blogsData as defaultBlogs,
} from "../data/portfolioData";

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  // Helper to initialize state from localStorage if available, or fall back to defaults
  const [projects, setProjects] = useState(() => {
    try {
      const cached = localStorage.getItem("projects");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return defaultProjects;
  });

  const [skills, setSkills] = useState(() => {
    try {
      const cached = localStorage.getItem("skills");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && (parsed.frontend || parsed.backend)) return parsed;
      }
    } catch {}
    return defaultSkills;
  });

  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);

  const [blogs, setBlogs] = useState(() => {
    try {
      const cached = localStorage.getItem("blogs_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return defaultBlogs;
  });

  const [loading, setLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Individual refetch functions
  const loadProjects = useCallback(async () => {
    try {
      const data = await fetchProjects();
      if (data && Array.isArray(data) && data.length > 0) {
        setProjects(data);
        localStorage.setItem("projects", JSON.stringify(data));
      }
    } catch (err) {
      console.warn("PortfolioContext: Failed to fetch projects", err);
    }
  }, []);

  const loadSkills = useCallback(async () => {
    try {
      const data = await fetchSkills();
      if (data && (data.frontend || data.backend)) {
        setSkills(data);
      }
    } catch (err) {
      console.warn("PortfolioContext: Failed to fetch skills", err);
    }
  }, []);

  const loadPersonalInfo = useCallback(async () => {
    try {
      const data = await fetchPersonalInfo();
      if (data && data.name) {
        setPersonalInfo(data);
      }
    } catch (err) {
      console.warn("PortfolioContext: Failed to fetch personalInfo", err);
    }
  }, []);

  const loadBlogs = useCallback(async () => {
    try {
      const data = await fetchBlogs();
      if (data && Array.isArray(data) && data.length > 0) {
        setBlogs(data);
      }
    } catch (err) {
      console.warn("PortfolioContext: Failed to fetch blogs", err);
    }
  }, []);

  const loadAllData = useCallback(async () => {
    await Promise.allSettled([
      loadProjects(),
      loadSkills(),
      loadPersonalInfo(),
      loadBlogs(),
    ]);
    setLoading(false);
    setHasLoadedOnce(true);
  }, [loadProjects, loadSkills, loadPersonalInfo, loadBlogs]);

  // Fetch data ONCE when app mounts
  useEffect(() => {
    if (!hasLoadedOnce) {
      loadAllData();
    }
  }, [hasLoadedOnce, loadAllData]);

  const value = {
    projects,
    setProjects,
    skills,
    setSkills,
    personalInfo,
    setPersonalInfo,
    blogs,
    setBlogs,
    loading,
    refetchProjects: loadProjects,
    refetchSkills: loadSkills,
    refetchPersonalInfo: loadPersonalInfo,
    refetchBlogs: loadBlogs,
    refetchAll: loadAllData,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
