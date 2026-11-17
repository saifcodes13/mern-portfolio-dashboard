// Helpers that normalise project records. Static fallback data has
// category/tagline/highlights; API records only have the core fields
// (title, description, techStack, image, liveLink, githubLink, featured, active),
// so everything optional is derived or guarded here.

export const CATEGORY_META = {
  fullstack: { label: "Web Apps & Platforms", service: "Full-Stack Web App" },
  frontend: { label: "Websites & Landing Pages", service: "Landing Page & UI/UX" },
  devops: { label: "Cloud & DevOps", service: "Cloud & DevOps" },
};

export const CATEGORY_ORDER = ["fullstack", "frontend", "devops"];

export const getProjectKey = (project, fallback) =>
  project.id || project._id || fallback;

export const getCategory = (project) => {
  if (project.category && CATEGORY_META[project.category]) return project.category;
  const tech = (project.techStack || []).join(" ").toLowerCase();
  if (/nginx|docker|kubernetes|pm2/.test(tech)) return "devops";
  if (/node|express|mongo|mysql|postgres|laravel|django/.test(tech)) return "fullstack";
  return "frontend";
};

// Which contact-form service option a "want something like this?" click preselects
export const getInquiryService = (project) => {
  const category = getCategory(project);
  const text = `${project.title || ""} ${project.tagline || ""}`;
  if (category === "fullstack" && /\bcrm\b|dashboard|sales portal/i.test(text)) {
    return "CRM & Dashboard";
  }
  return CATEGORY_META[category].service;
};

// "BookEventz - Event & Venue Booking Platform" -> { name, subtitle }
export const splitTitle = (title = "") => {
  const match = title.match(/^(.+?)\s+[-–—]\s+(.+)$/);
  return match ? { name: match[1], subtitle: match[2] } : { name: title, subtitle: "" };
};

// One-line outcome: the tagline when present, else the first sentence of the description
export const getOutcome = (project) => {
  if (project.tagline) return project.tagline;
  const description = project.description || "";
  const first = description.split(/(?<=[.!?])\s/)[0] || "";
  return first.length > 140 ? `${first.slice(0, 137).trimEnd()}…` : first;
};

const isUrl = (value) => typeof value === "string" && /^https?:\/\//.test(value);
const isGithub = (url) => /^https?:\/\/(www\.)?github\.com/i.test(url);
// a github.com URL that points at a repository, not just a profile
const isRepoUrl = (url) =>
  isGithub(url) && url.replace(/^https?:\/\/(www\.)?github\.com\/?/i, "").split("/").filter(Boolean).length >= 2;

// Live link = a real deployed site (never a github.com URL)
export const getLinks = (project) => {
  const live = isUrl(project.liveLink) && !isGithub(project.liveLink) ? project.liveLink : null;
  const candidates = [project.githubLink, project.liveLink].filter(isUrl);
  // Prefer a real repository; a bare profile link is only shown when there is
  // no live site to visit (so client projects don't get a generic "Code" link).
  let code = candidates.find(isRepoUrl) || null;
  if (!code && !live) code = candidates.find(isGithub) || null;
  return { live, code };
};

export const getHost = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};
