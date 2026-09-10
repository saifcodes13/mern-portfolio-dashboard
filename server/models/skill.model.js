import mongoose from "mongoose";

/**
 * Sub-schema for frontend & backend skills
 */
const skillItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

/**
 * Main Skills Schema
 * Only ONE document is needed for entire portfolio
 */
const skillsSchema = new mongoose.Schema(
  {
    frontend: {
      type: [skillItemSchema],
      default: [],
    },
    backend: {
      type: [skillItemSchema],
      default: [],
    },
    tools: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const SkillModel = mongoose.model("Skill", skillsSchema);

export default SkillModel;
