import { motion, useMotionValue, useSpring } from "framer-motion";
import { Github, Linkedin, Twitter, BookOpen, ArrowUpRight, Sparkles, FileText } from "lucide-react";
import { useRef, useState } from "react";
import profileImg from "@/assets/profile.jpg";

const resumeMailto = `mailto:ozechisamuel@gmail.com?subject=${encodeURIComponent("Request for Resume")}&body=${encodeURIComponent("Hi Samuel,\n\nI would like to request a copy of your resume.\n\nName: [Your Name]\nCompany: [Your Company]\nReason: [Purpose for requesting the resume]\n\nThank you!")}`;

const linkedinMailto = `mailto:ozechisamuel@gmail.com?subject=${encodeURIComponent("Request for LinkedIn Profile")}&body=${encodeURIComponent("Hi Samuel,\n\nI would like to request your LinkedIn profile link.\n\nName: [Your Name]\nCompany: [Your Company]\nPurpose: [Reason for connecting]\n\nThank you!")}`;

const socials = [
  { icon: Github, href: "https://github.com/Chiebukar", label: "GitHub" },
  { icon: Linkedin, href: linkedinMailto, label: "LinkedIn", external: false },
  { icon: Twitter, href: "https://x.com/0zexhi", label: "Twitter" },
  { icon: BookOpen, href: "https://samuel-ozechi.medium.com/", label: "Medium" },
];

const skills = ["Python", "TensorFlow", "PyTorch", "LangChain", "RAG", "Scikit-Learn", "FastAPI", "SQL", "GCP", "Azure", "AWS", "Docker"];

const technicalSkills = ["Hypothesis Testing (A/B)", "Data Processing", "Exploratory Data Analysis", "Statistical Analysis", "Feature Engineering", "Model Selection", "Hyperparameter Tuning", "Machine Learning", "Deep Learning", "Version Control", "Model Deployment"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * 8);
    rotateY.set(px * 8);
    x.set(px * 10);
    y.set(py * 10);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
const SkillsTabs = () => {
  const [activeTab, setActiveTab] = useState<"stack" | "skills">("stack");
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setActiveTab("stack")}
          className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md transition-colors ${
            activeTab === "stack"
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Core Stack
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md transition-colors ${
            activeTab === "skills"
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Technical Skills
        </button>
      </div>
      <div className="flex flex-wrap gap-2 min-h-[80px]">
        {(activeTab === "stack" ? skills : technicalSkills).map((skill) => (
          <motion.span
            key={`${activeTab}-${skill}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.02, type: "spring" as const, stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground border border-border cursor-default transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

const HeroBento = () => {
  return (
    <section id="home" className="relative flex items-center justify-center px-4 pt-24 pb-8 md:pt-32 md:pb-12">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-4 gap-3 auto-rows-auto"
      >
        {/* Main hero cell - 3 cols */}
        <motion.div variants={item} className="md:col-span-2">
          <TiltCard className="bento-cell glow-border relative overflow-hidden p-8">
            <div className="relative z-10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-5 overflow-hidden"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary font-medium text-xs tracking-widest uppercase whitespace-nowrap">AI/ML Engineer</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gradient leading-[1.1] mb-4 tracking-tight">
                Samuel<br />Ozechi
              </h1>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                AI/ML Engineer and Applied ML Researcher with 6+ years of industry experience spanning data analytics, data science, and AI systems development. Adept at building data ingestion pipelines, conducting exploratory and statistical analysis, and applying advanced ML/AI techniques, including model fine-tuning, hyperparameter optimization and integrating AI/ML systems into business applications. Domain experience includes fintech, energy, and digital commerce, with a strong emphasis on experimentation, reproducibility, and scalable deployment.
              </p>
              <div className="flex items-center gap-3">
                <motion.a
                  href="mailto:ozechisamuel@gmail.com"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                >
                  Get in Touch <ArrowUpRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={resumeMailto}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground font-medium text-sm hover:border-primary/50 transition-colors"
                >
                  <FileText className="w-4 h-4" /> Request Resume
                </motion.a>
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground font-medium text-sm hover:border-primary/50 transition-colors"
                >
                  View Projects
                </motion.a>
              </div>
            </div>
            <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
          </TiltCard>
        </motion.div>

        {/* Profile image cell */}
        <motion.div variants={item} className="md:col-span-2">
          <TiltCard className="bento-cell glow-border-hover p-0 overflow-hidden h-full">
            <img
              src={profileImg}
              alt="Samuel Ozechi"
              className="w-full h-full object-cover object-top min-h-[280px] md:min-h-0"
            />
          </TiltCard>
        </motion.div>

        {/* Skills cell - 2 cols */}
        <motion.div variants={item} className="md:col-span-2">
          <TiltCard className="bento-cell glow-border-hover p-5">
            <SkillsTabs />
          </TiltCard>
        </motion.div>

        {/* Social links cell */}
        <motion.div variants={item} className="md:col-span-1">
          <TiltCard className="bento-cell glow-border-hover p-5 h-full">
            <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wider">Connect</p>
            <div className="flex flex-col gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                  <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </TiltCard>
        </motion.div>

        {/* Stats cell */}
        <motion.div variants={item} className="md:col-span-1">
          <TiltCard className="bento-cell glow-border-hover p-5 h-full">
            <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wider">Experience</p>
            <div className="flex md:flex-col gap-6 md:gap-4">
              <div>
                <motion.p
                  className="text-4xl font-extrabold text-gradient"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" as const, stiffness: 200 }}
                >
                  6+
                </motion.p>
                <p className="text-xs text-muted-foreground mt-1">Years in Industry</p>
              </div>
              <div>
                <motion.p
                  className="text-3xl font-extrabold text-gradient"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" as const, stiffness: 200 }}
                >
                  2× MSc
                </motion.p>
                <p className="text-xs text-muted-foreground mt-1">Computer Science</p>
                <p className="text-xs text-muted-foreground mt-0.5">Financial Engineering</p>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBento;
