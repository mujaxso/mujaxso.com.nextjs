export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Software Engineer • AI/ML Engineer • Data Scientist • DevSecOps
          </p>
        </div>

        {/* Modern CV Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Contact */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-2xl p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center border-4 border-primary/20 overflow-hidden mb-4">
                  <img 
                    src="/img/profile.png" 
                    alt="Mujahid Siyam" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Mujahid Siyam</h2>
                <p className="text-foreground/60 mb-4">Full-Stack Developer & AI Engineer</p>
                
                {/* Contact Info */}
                <div className="space-y-3 w-full">
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <span>📍</span>
                    <span>Available Worldwide</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <span>📧</span>
                    <span>contact@mujaxso.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <span>🔗</span>
                    <span>mujaxso.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Core Competencies</h3>
              <div className="space-y-3">
                {[
                  "Full-Stack Development",
                  "Machine Learning & AI",
                  "Data Science & Analytics",
                  "Cloud Infrastructure (AWS)",
                  "DevSecOps & CI/CD",
                  "System Architecture",
                  "Mobile Development",
                  "Blockchain & Web3"
                ].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-foreground/80">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Languages</h3>
              <div className="space-y-3">
                {[
                  { language: "English", level: "Fluent" },
                  { language: "Arabic", level: "Native" },
                  { language: "Spanish", level: "Intermediate" }
                ].map((item) => (
                  <div key={item.language} className="flex justify-between items-center">
                    <span className="text-sm text-foreground/80">{item.language}</span>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-foreground mb-4">Professional Summary</h3>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  I'm a passionate Software Engineer, AI/ML Engineer, Data Scientist, and DevSecOps professional 
                  with a deep love for creating innovative solutions that bridge the gap between cutting-edge 
                  technology and real-world applications. My expertise spans across full-stack development, 
                  machine learning model deployment, data-driven insights, and secure software practices.
                </p>
                <p>
                  Beyond the world of code and algorithms, I'm also an avid musician, finding creative expression 
                  through music as a side hobby. This artistic pursuit complements my technical work, bringing 
                  balance and inspiration to my problem-solving approach.
                </p>
                <p>
                  I believe in building technology that not only solves complex challenges but also enhances 
                  human experiences and creates meaningful impact.
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">Experience</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Senior Full-Stack Engineer",
                    company: "Tech Innovators Inc.",
                    period: "2022 - Present",
                    description: "Led development of AI-powered SaaS platform serving 50K+ users. Implemented microservices architecture and CI/CD pipelines."
                  },
                  {
                    title: "AI/ML Engineer",
                    company: "Data Science Labs",
                    period: "2020 - 2022",
                    description: "Developed machine learning models for predictive analytics. Deployed scalable ML infrastructure on AWS."
                  },
                  {
                    title: "Software Developer",
                    company: "Startup Ventures",
                    period: "2018 - 2020",
                    description: "Built responsive web applications and mobile apps. Collaborated in agile development teams."
                  }
                ].map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-4 relative">
                    <div className="absolute -left-1.5 top-2 w-3 h-3 bg-primary rounded-full"></div>
                    <h4 className="text-lg font-bold text-foreground">{exp.title}</h4>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-foreground/70">{exp.company}</span>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-foreground/60 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">Education</h3>
              <div className="space-y-4">
                {[
                  {
                    degree: "MSc in Computer Science",
                    school: "University of Technology",
                    period: "2016 - 2018",
                    description: "Specialized in Artificial Intelligence and Machine Learning"
                  },
                  {
                    degree: "BSc in Software Engineering",
                    school: "Tech University",
                    period: "2012 - 2016",
                    description: "Graduated with Honors. Focus on Distributed Systems"
                  }
                ].map((edu, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-foreground">{edu.degree}</h4>
                      <p className="text-foreground/70">{edu.school}</p>
                      <p className="text-foreground/60 text-sm mt-1">{edu.description}</p>
                    </div>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">Technologies & Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "React/Next.js", "TypeScript", "Python", "TensorFlow", "PyTorch",
                  "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
                  "GraphQL", "Node.js", "FastAPI", "Redis", "Git",
                  "Jenkins", "Terraform", "React Native", "Solidity", "Web3.js"
                ].map((tech) => (
                  <div 
                    key={tech} 
                    className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-center text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
