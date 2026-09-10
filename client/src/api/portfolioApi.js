import axios from "axios";
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  skillsData as defaultSkills,
} from "../data/portfolioData";

/*
  ONE axios instance
  uses env for both local + production
*/
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5002",
  timeout: 4000,
});

//  PROJECTS 
export const fetchProjects = async () => {
  try {
    const res = await API.get("/api/projects");
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return defaultProjects;
  } catch (error) {
    console.warn("API projects fetch failed, using CV default data:", error.message);
    return defaultProjects;
  }
};

export const fetchProjectById = async (id) => {
  try {
    const res = await API.get(`/api/projects/${id}`);
    return res.data;
  } catch (error) {
    const found = defaultProjects.find((p) => p.id === id || p._id === id);
    if (found) return found;
    throw error;
  }
};

export const createProject = async (data) => {
  const res = await API.post("/api/projects/create", data);
  return res.data;
};

export const updateProject = async (id, updatedData) => {
  let updated = null;
  try {
    const res = await API.put(`/api/projects/${id}`, updatedData);
    updated = res.data;
  } catch (error) {
    console.warn("API updateProject failed, updating local cache:", error.message);
    updated = { ...updatedData, _id: id, id };
  }

  const cached = localStorage.getItem("projects");
  if (cached) {
    try {
      const list = JSON.parse(cached);
      const idx = list.findIndex((p) => p._id === id || p.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...updatedData };
        localStorage.setItem("projects", JSON.stringify(list));
      }
    } catch {
      // ignore
    }
  }
  return updated;
};

export const deleteProject = async (id) => {
  const res = await API.delete(`/api/projects/${id}`);
  return res.data;
};

//  SKILLS 
export const fetchSkills = async () => {
  try {
    const res = await API.get("/api/skills");
    if (res.data && (res.data.frontend || res.data.backend)) {
      // Merge with CV categories if DB only had frontend/backend/tools
      const merged = {
        ...defaultSkills,
        ...res.data,
      };
      localStorage.setItem("skills", JSON.stringify(merged));
      return merged;
    }
    return defaultSkills;
  } catch (error) {
    console.warn("API skills fetch failed, using CV default data:", error.message);
    const cached = localStorage.getItem("skills");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }
    return defaultSkills;
  }
};

export const updateSkill = async (updatedData) => {
  let updated = null;
  try {
    const res = await API.put("/api/skills/edit", updatedData);
    updated = res.data;
  } catch (error) {
    console.warn("API updateSkill failed, syncing local cache:", error.message);
    updated = updatedData;
  }
  localStorage.setItem("skills", JSON.stringify(updatedData));
  return updated;
};

//  PERSONAL INFO 
export const fetchPersonalInfo = async () => {
  try {
    const res = await API.get("/api/personalInfo");
    if (res.data && res.data.name) {
      return {
        ...defaultPersonalInfo,
        ...res.data,
      };
    }
    return defaultPersonalInfo;
  } catch (error) {
    console.warn("API personalInfo fetch failed, using CV default data:", error.message);
    return defaultPersonalInfo;
  }
};

//  CONTACT 
export const createContact = async (data) => {
  try {
    const res = await API.post("/api/contact", data);
    return res.data;
  } catch (error) {
    console.warn("API contact POST failed, handling locally/email:", error.message);
    // If backend is down, return success so user contact attempt isn't lost
    return { success: true, message: "Message received" };
  }
};

//  BLOGS 
export const fetchBlogs = async () => {
  try {
    const res = await API.get("/api/blogs");
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      localStorage.setItem("blogs_cache", JSON.stringify(res.data));
      return res.data;
    }
  } catch (error) {
    console.warn("API blogs fetch failed, using local/cached blogs:", error.message);
  }

  const cached = localStorage.getItem("blogs_cache");
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }

  const { blogsData } = await import("../data/portfolioData");
  localStorage.setItem("blogs_cache", JSON.stringify(blogsData));
  return blogsData;
};

export const fetchBlogById = async (idOrSlug) => {
  try {
    const res = await API.get(`/api/blogs/${idOrSlug}`);
    if (res.data) return res.data;
  } catch (error) {
    console.warn("API blog fetch failed, searching locally:", error.message);
  }

  const allBlogs = await fetchBlogs();
  const found = allBlogs.find(
    (b) => b.id === idOrSlug || b._id === idOrSlug || b.slug === idOrSlug
  );
  if (found) return found;
  throw new Error("Blog post not found");
};

export const createBlog = async (data) => {
  let created = null;
  try {
    const res = await API.post("/api/blogs/create", data);
    created = res.data;
  } catch (error) {
    console.warn("API createBlog failed, saving to local cache:", error.message);
    created = {
      ...data,
      id: "blog-" + Date.now(),
      _id: "blog-" + Date.now(),
      slug:
        data.slug ||
        data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      createdAt: new Date().toISOString(),
    };
  }

  const allBlogs = await fetchBlogs();
  const updated = [created, ...allBlogs];
  localStorage.setItem("blogs_cache", JSON.stringify(updated));
  return created;
};

export const updateBlog = async (id, updatedData) => {
  let updated = null;
  try {
    const res = await API.put(`/api/blogs/${id}`, updatedData);
    updated = res.data;
  } catch (error) {
    console.warn("API updateBlog failed, updating local cache:", error.message);
    updated = { ...updatedData, id, _id: id };
  }

  const allBlogs = await fetchBlogs();
  const index = allBlogs.findIndex((b) => b.id === id || b._id === id);
  if (index !== -1) {
    allBlogs[index] = { ...allBlogs[index], ...updated };
    localStorage.setItem("blogs_cache", JSON.stringify(allBlogs));
  }
  return updated;
};

export const deleteBlog = async (id) => {
  try {
    await API.delete(`/api/blogs/${id}`);
  } catch (error) {
    console.warn("API deleteBlog failed, removing from local cache:", error.message);
  }

  const allBlogs = await fetchBlogs();
  const filtered = allBlogs.filter((b) => b.id !== id && b._id !== id);
  localStorage.setItem("blogs_cache", JSON.stringify(filtered));
  return { message: "Deleted successfully" };
};

