import ProjectModel from "../models/project.model.js";

const getProjects = async (req, res) => {
  const projects = await ProjectModel.find({});
  res.json(projects);
};

const getProjectById = async (req, res) => {
  const project = await ProjectModel.findById(req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
    if (!project) {
     return res.status(404).json({ message: "Project not found" });
    }

    project.title = req.body.title || project.title;
    project.featured =
      req.body.featured !== undefined ? req.body.featured : project.featured;

    project.description = req.body.description || project.description;
    project.liveLink = req.body.liveLink || project.liveLink;
    project.githubLink = req.body.githubLink || project.githubLink;
    project.techStack = req.body.techStack || project.techStack;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack,
      image,
      liveLink,
      githubLink,
      featured,
    } = req.body;
    const project = new ProjectModel({
      title,
      description,
      techStack,
      image,
      liveLink,
      githubLink,
      featured,
    });

    const createdProject = await project.save();

    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  const project = await ProjectModel.findById(req.params.id);
  if (project) {
    await ProjectModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Project deleted" });
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
};
export {
  getProjects,
  getProjectById,
  updateProject,
  createProject,
  deleteProject,
};
