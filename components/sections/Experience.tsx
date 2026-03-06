"use client";

import { motion } from "framer-motion";


export function Experience() {
  const experiences = [
    {
      company: "Tuna Software Solutions Limited",
      role: "Full Stack Developer",
      date: "05/2024 – Present",
      location: "Remote",
      points: [
        "Developing and maintaining scalable web applications using Next.js, AWS, and Sanity CMS, implementing best practices for performance and user experience.",
        "Leveraging AWS services for cloud infrastructure management and deployment, ensuring high availability and optimal performance.",
        "Implementing content management solutions using Sanity CMS, enabling efficient content creation and management workflows.",
        "Collaborating with cross-functional teams to deliver high-quality solutions while maintaining code quality and documentation standards."
      ]
    },
    {
      company: "Lotus Interworks",
      role: "Web Developer",
      date: "08/2023 – 04/2024",
      location: "Remote",
      points: [
        "Streamlined deployment process by developing a pipeline using Eleventy, MySQL, Node.js, and Express.js, reducing deployment time by 30%.",
        "Ensured consistent website alignment within GreenZone standards by designing and implementing innovative templates with dynamic canonical URL integration.",
        "Collaborated with the design team to create a captivating ticker animation based on the new Simplia design, resulting in a 40% increase in user engagement.",
        "Developed an internal SMS campaign app using React Native, integrating features for sending SMS campaigns and a calling feature."
      ]
    },
    {
      company: "ONIRIC",
      role: "Front End Developer",
      date: "12/2022 – 08/2023",
      location: "Remote",
      points: [
        "Reduced development time for subsequent projects by 20% by creating and maintaining a modular React component library.",
        "Improved page load times by 25% through the implementation of a Tailwind CSS utility-first approach, resulting in a 15% decrease in stylesheet size.",
        "Collaborated with the backend team to optimize API requests, resulting in a 40% decrease in load times and improved application performance.",
        "Enhanced codebase maintainability by 30% by refactoring legacy class-based components using React hooks.",
        "Conducted user testing sessions to gather feedback on new features, leading to a 25% increase in overall user satisfaction."
      ]
    }, {
      company: "Indian Institute of Technology",
      role: "Research Intern",
      date: "05/2023 – 07/2023",
      location: "Onsite",
      points: [
        "Trained the algorithm to select the Region of Interest (ROI) using 1000+ images.",
        "Verified the presence of both test and control lines on pregnancy kits with 100% accuracy.",
        "Created a calibration curve and utilized it to quantify intensity for unknown concentrations."
      ]
    },
  ];

  return (
    <section id="experience" className="py-24 relative">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Journey</h2>
          <p className="text-muted-foreground text-lg">My professional trajectory and experiences.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-8 md:pl-0 mb-12 last:mb-0 group"
            >
              <div className="md:flex gap-8 items-start relative">

                {/* Timeline Line & Node */}
                <div className="hidden md:flex flex-col items-center absolute left-[50%] ml-[-12px] top-0 bottom-0 z-10 w-6">
                  <div className="w-6 h-6 rounded-full bg-background border-4 border-primary group-hover:shadow-neon transition-shadow z-20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                  </div>
                  {index !== experiences.length - 1 && (
                    <div className="w-px h-full bg-border mt-2 group-hover:bg-primary/50 transition-colors" />
                  )}
                </div>

                {/* Content Side */}
                <div className={`md:w-1/2 relative ${index % 2 === 0 ? "md:text-right md:pr-16" : "md:ml-auto md:pl-16"}`}>
                  <div className="glass p-6 rounded-2xl group-hover:border-primary/50 transition-colors">
                    <span className="text-sm font-semibold text-primary mb-2 block">{exp.date}</span>
                    <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                    <h4 className="text-lg text-muted-foreground mb-4">{exp.company} • {exp.location}</h4>

                    <ul className="space-y-2 text-muted-foreground/90 text-sm text-left list-none">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-primary mt-1">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
