import axios from "axios";

/*
  ONE axios instance
  uses env for both local + production
*/

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


//  PROJECTS 

export const fetchProjects = async () => {
  const res = await API.get("/api/projects");
  return res.data;
};

export const fetchProjectById = async (id) => {
  const res = await API.get(`/api/projects/${id}`);
  return res.data;
};

export const createProject = async (data) => {
  const res = await API.post("/api/projects/create", data);
  return res.data;
};

export const updateProject = async (id, updatedData) => {
  const res = await API.put(`/api/projects/${id}`, updatedData);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await API.delete(`/api/projects/${id}`);
  return res.data;
};


//  SKILLS 

export const fetchSkills = async () => {
  const res = await API.get("/api/skills");
  return res.data;
};

export const updateSkill = async (updatedData) => {
  const res = await API.put("/api/skills/edit", updatedData);
  return res.data;
};


//  PERSONAL INFO 

export const fetchPersonalInfo = async () => {
  const res = await API.get("/api/personalInfo");
  return res.data;
};


//  CONTACT 

export const createContact = async (data) => {
  const res = await API.post("/api/contact", data);
  return res.data;
};
