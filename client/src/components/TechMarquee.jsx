import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiAmazons3,
  SiCloudflare,
  SiGithubactions,
  SiNginx,
  SiJavascript,
  SiFigma,
} from "react-icons/si";
import { useInView } from "../hooks/useInView";

const techStack = [
  { name: "React.js", Icon: SiReact },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express.js", Icon: SiExpress },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "MySQL", Icon: SiMysql },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "AWS S3", Icon: SiAmazons3 },
  { name: "Cloudflare", Icon: SiCloudflare },
  { name: "GitHub Actions", Icon: SiGithubactions },
  { name: "Nginx", Icon: SiNginx },
  { name: "Figma", Icon: SiFigma },
];

const TechList = ({ hidden = false }) => (
  <ul className="flex shrink-0 items-center" aria-hidden={hidden ? "true" : undefined}>
    {techStack.map((tech) => {
      const Icon = tech.Icon;
      const name = tech.name;
      return (
      <li
        key={name}
        className="flex items-center gap-2.5 px-6 sm:px-8 text-gray-400 hover:text-white transition-colors duration-300"
      >
        <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="text-sm font-medium whitespace-nowrap">{name}</span>
      </li>
      );
    })}
  </ul>
);

/** Infinite tech-logo marquee. Pauses on hover and while off-screen. */
const TechMarquee = () => {
  const [ref, inView] = useInView({ once: false, rootMargin: "0px" });

  return (
    <div ref={ref} className="marquee" data-paused={!inView}>
      <div className="marquee__track">
        <TechList />
        <TechList hidden />
      </div>
    </div>
  );
};

export default TechMarquee;
