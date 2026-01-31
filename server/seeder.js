import dotenv from "dotenv";
import colors from "colors";

import connectDB from "./config/db.config.js";
import { projects } from "./data/projects.data.js";
import { skills } from "./data/skills.data.js";
import userData from  "./data/user.data.js"
import contactData from "./data/contact.data.js";
import ProjectModel from "./models/project.model.js";
import SkillModel from "./models/skill.model.js";
import ContactModel from "./models/contact.model.js";
import UserModel from "./models/user.model.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    //Clear old data
    await ProjectModel.deleteMany();
    await SkillModel.deleteMany();
    await ContactModel.deleteMany();
    await UserModel.deleteMany()
    
    await UserModel.insertMany(userData)
    //Insert Projects
    await ProjectModel.insertMany(projects);
    await ContactModel.insertMany(contactData);


    //Insert skills
    //You want to insert ONE document(object) use .create() insertmany() expects array
    await SkillModel.create(skills); // we have used create() bcoz it has only one object

    console.log("Data Imported".green.bold);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.underline);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await ProjectModel.deleteMany();
    await SkillModel.deleteMany();
    console.log("Data destroyed".red.bold);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.underline);
    process.exit(1);
  }
};
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
