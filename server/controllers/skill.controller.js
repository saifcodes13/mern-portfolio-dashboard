import SkillModel from "../models/skill.model.js";

const getSkills = async (req, res) => {
  try {
    const skills = await SkillModel.findOne();

    if (!skills) {
      return res.status(404).json({ message: "Skills not found" });
    }
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skills = await SkillModel.findOne();

    if (!skills) {
      return res.status(404).json({ message: "Skills not found " });
    }
    skills.frontend = req.body.frontend || skills.frontend;
    skills.backend = req.body.backend || skills.backend;
    skills.tools = req.body.tools || skills.tools;

    const updatedSkills = await skills.save();
    res.json(updatedSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { getSkills, updateSkill };
