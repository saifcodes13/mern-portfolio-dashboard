import axios from "axios";
import { Axis3D } from "lucide-react";

export const fetchProjects = async () => {
  const res = await axios.get("/api/projects");
  return res.data;
};

export const fetchPersonalInfo = async () => {
  const res = await axios.get("/api/personalInfo");
  return res.data;
};

export const fetchSkills = async () => {
  const res = await axios.get("/api/skills");
  return res.data;
};

export const fetchGetSkills = async () => {
  const res = await axios.get("/api/skills");
  return res.data;
};

export const fetchProjectById = async (id) => {
  const res = await axios.get(`/api/projects/${id}`);
  return res.data;
};

export const updateProject = async (id, updatedData) => {
  //update THIS project (id) using THIS new data (updatedData)”

  const res = await axios.put(`/api/projects/${id}`, updatedData);
  return res.data;
};

export const createProject = async (updateProject) => {
  const res = await axios.post("/api/projects/create", updateProject);
  return res.data;
};

export const updateSkill = async (updatedData) => {
  const res = await axios.put("/api/skills/edit", updatedData, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await axios.delete(`/api/projects/${id}`);
  return res.data;
};
