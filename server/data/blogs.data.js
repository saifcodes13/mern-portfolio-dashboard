export const blogs = [
  {
    id: "cloudnest-architecture",
    slug: "how-i-built-cloudnest-self-hosted-platform",
    title: "How I Built CloudNest: A Self-Hosted Static Deployment Platform with Nginx & Cloudflare",
    category: "DevOps & Cloud",
    readTime: "6 min read",
    author: "Saif Tandel",
    date: "Sep 2026",
    featured: true,
    published: true,
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=600&fit=crop",
    excerpt:
      "A deep dive into how I built CloudNest — a self-hosted alternative to Netlify/Vercel with automated ZIP extraction, Nginx dynamic reverse proxying, and Cloudflare Tunnel security.",
    tags: ["DevOps", "Nginx", "Cloudflare", "GitHub Actions", "Ubuntu", "Node.js"],
    content: `### Why Build a Self-Hosted Deployment Platform?

Modern developers love platforms like Netlify and Vercel because they make hosting static websites effortless: upload files, click deploy, and receive a live URL. However, for internal enterprise architectures or cost-conscious private clouds, having a self-hosted deployment engine offers unmatched control, zero bandwidth limits, and complete data sovereignty.

In this article, I walk through the architecture behind **CloudNest**, my self-hosted deployment engine built with React.js, Node.js, Nginx, and Cloudflare Tunnel.

---

### The Core Architecture

CloudNest consists of four tightly integrated layers:
1. **Frontend Dashboard (React.js + Tailwind CSS)**: Users log in via JWT authentication, upload their site as a ZIP archive, and assign a custom subdomain.
2. **Backend Engine (Node.js & Express)**: Handles file uploads, validates archive integrity, and safely unpacks the files into an isolated directory on the Ubuntu host.
3. **Nginx Dynamic Reverse Proxy**: Directs incoming HTTP/HTTPS traffic to the corresponding static build folder based on the requested subdomain header.
4. **Cloudflare Tunnel & Ingress**: Provides public SSL termination and DDoS protection without opening inbound ports on the host machine.

---

### Automating the ZIP Extraction Workflow

When a user submits a ZIP build, the Express backend extracts it asynchronously to prevent blocking the event loop:

\`\`\`javascript
import unzipper from "unzipper";
import fs from "fs-extra";
import path from "path";

export const deployStaticSite = async (subdomain, zipFilePath) => {
  const targetDir = path.join("/var/www/cloudnest/sites", subdomain);
  await fs.ensureDir(targetDir);

  await fs.createReadStream(zipFilePath)
    .pipe(unzipper.Extract({ path: targetDir }))
    .promise();

  // Reload Nginx or update symlink
  await reloadNginxConfiguration();
};
\`\`\`

---

### Zero-Open-Port Security with Cloudflare Tunnel

Instead of configuring public DNS records with exposed ports 80/443, CloudNest runs \`cloudflared\`. The daemon maintains outbound connections to Cloudflare's edge network:

- **Wildcard Subdomain Ingress**: \`*.cloudnest.yourdomain.com\` routes through the tunnel directly to local Nginx on port 80.
- **SSL by Default**: Automatic SSL certificate issuance via Cloudflare with zero certificate maintenance on the server.

---

### Key Takeaways

1. **Automation Saves Hours**: Automating archive extraction and Nginx virtual hosts cut deployment times down to under 3 seconds.
2. **Security First**: Cloudflare Tunnels completely shield the host server from malicious port scanners.
3. **Reproducible Releases**: Integrating GitHub Actions self-hosted runners makes continuous integration straightforward for any team.
`,
  },
  {
    id: "scalable-crm-modules",
    slug: "architecting-scalable-crm-modules-react-nodejs",
    title: "Architecting Scalable CRM Modules in React & Node.js: Lessons from BookEventz",
    category: "Full-Stack Architecture",
    readTime: "5 min read",
    author: "Saif Tandel",
    date: "Aug 2026",
    featured: true,
    published: true,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop",
    excerpt:
      "Insights on building 5+ production CRM modules, reducing frontend boilerplate with reusable components, and architecting secure sales portal APIs with JWT.",
    tags: ["React.js", "Node.js", "CRM", "JWT", "MySQL", "AWS S3"],
    content: `### Enterprise CRM Challenges

When developing enterprise CRM systems at **BookEventz**, our team had to handle hundreds of concurrent daily bookings, complex multi-stage sales pipelines, and high volumes of customer media uploads. 

Without a clean architectural foundation, CRM frontends quickly become tangled with redundant state logic, slow data tables, and fragile permission checks.

Here are the key principles and patterns I applied to keep our 5+ CRM modules clean, performant, and reliable.

---

### 1. The Reusable Component Library Pattern

Instead of rebuilding tables, modal dialogs, and filter bars in each CRM module, I engineered over 20 reusable React components.

Key components included:
- **Virtualized Data Tables**: Capable of smoothly scrolling through thousands of lead records with column sorting and multi-field search.
- **Role-Gated Action Buttons**: Automatically show, hide, or disable action triggers (e.g. *Approve Discount*, *Delete Lead*) based on decoded JWT roles.
- **Media Upload Pipeline**: Direct-to-S3 pre-signed URL uploader that frees up the Node.js server from heavy file buffering.

---

### 2. Secure Sales Portal APIs with JWT

Sales teams require granular permissions. An account executive shouldn't see executive revenue rollups, and sales agents should only modify their assigned deals.

We structured our Express authorization middleware cleanly:

\`\`\`javascript
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: Insufficient permissions." });
    }
    next();
  };
};
\`\`\`

---

### 3. Offloading Media to AWS S3

Storing customer contracts, quotation PDFs, and venue photos directly on the application server degrades disk I/O and complicates container autoscaling. 

By integrating **AWS S3 pre-signed URLs**, the client uploads files directly to S3 with cryptographic verification. The Express API merely records the clean S3 URL in MySQL.

---

### Summary

Building modular CRM architectures requires treating internal tools with the same polish as customer-facing applications. Modular React components, role-gated APIs, and cloud asset storage are essential pillars for long-term scalability.
`,
  },
  {
    id: "database-performance-tuning",
    slug: "optimizing-mysql-mongodb-performance-mern",
    title: "Optimizing MySQL & MongoDB Performance in High-Traffic MERN Applications",
    category: "Database Engineering",
    readTime: "7 min read",
    author: "Saif Tandel",
    date: "Jul 2026",
    featured: false,
    published: true,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop",
    excerpt:
      "Practical strategies for diagnosing slow queries, compound indexing, MongoDB aggregation pipelines, and MySQL connection pooling in production.",
    tags: ["MongoDB", "MySQL", "Performance", "Node.js", "Backend"],
    content: `### Database Bottlenecks in Modern Web Apps

In full-stack development, 80% of application latency usually originates not from the React rendering thread or Node.js CPU cycles, but from unindexed, poorly structured database queries.

Whether using relational MySQL or document-based MongoDB, understanding execution plans is the fastest way to turn a sluggish web app into an instantaneous user experience.

---

### 1. The Power of Compound Indexes in MongoDB

When filtering items across multiple criteria (for instance in our **MedFinder** app: searching medicine name + pharmacy location + stock availability), single-field indexes are insufficient.

\`\`\`javascript
// Compound index ensures query touches minimal index keys
medicineSchema.index({ name: 1, location: "2dsphere", inStock: 1 });
\`\`\`

Always test queries using \`.explain("executionStats")\` to ensure the database engine is performing an **IXSCAN** (Index Scan) rather than a disastrous **COLLSCAN** (Collection Scan).

---

### 2. Eliminating N+1 Query Traps in MySQL

In CRM systems where a customer order lists 10 items, naive ORM logic often queries the order once and then executes 10 separate queries for each line item (the notorious N+1 problem).

**Solution**:
- Use proper relational SQL \`JOIN\` statements or \`IN (...)\` batched fetching.
- Leverage MySQL query caching and connection pooling via \`mysql2/promise\` with pool limits configured to match your server RAM.

---

### 3. Caching Read-Heavy Endpoints

Frequently accessed data like public project catalogs, store directories, or skill definitions shouldn't hit the disk on every page load:
- Implement in-memory caching (Redis or local memory cache) with short TTLs.
- Send appropriate HTTP cache headers (\`Cache-Control: public, max-age=3600\`) so browsers and CDNs can cache responses edge-side.

---

### Conclusion

Monitoring query execution times, adding compound indexes, and eliminating redundant roundtrips allowed our systems to handle 4x higher concurrency with sub-100ms response latencies.
`,
  },
];
