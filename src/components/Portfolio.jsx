"use client";
import React from 'react';
import { useEffect } from 'react';

import { Github, Linkedin, Mail, ExternalLink, Book, FileText, Code, Heart, Terminal, Database, Cpu } from 'lucide-react';

import ContactForm from './ContactForm';


const Portfolio = () => {

  
  const profilePic = "/Images/Tewoflos.jpg"
  // Add floating animation keyframes at component level
  useEffect(() => {
    // Add this at the top of your Portfolio component
    console.log('Profile pic path:', profilePic);
    projects.forEach(project => {
      console.log(`Project ${project.title} image path:`, project.image);
    });
  }, []);

  const floatingIcons = {
    animation: 'float 3s ease-in-out infinite',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Tewoflos Girmay</h1>
          <div className="space-x-6">
            <a href="#research" className="hover:text-blue-600">Research</a>
            <a href="#projects" className="hover:text-blue-600">Projects</a>
            <a href="#writing" className="hover:text-blue-600">Writing</a>
            <a href="#interests" className="hover:text-blue-600">Interests</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Enhanced Intro Section with Profile Picture */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-left md:pr-8">
              <h3 className="text-xl font-bold mb-6">About</h3>
              <h2 className="text-5xl font-bold mb-6">Researcher & Developer</h2>
              <p className="text-xl text-gray-600 mb-8">
              Tewoflos Girmay is a Penultimate student at New York University interested in Data Science, Machine Learning, Quantum Computing,  Finance and Mathematics.
              He currently works in the New York University Abu Dhabi Center for Quantum and Toplogical Systems on Machine Learning Models security. In the mean time, Tewoflos loves reading philosphy books.  
              </p>
              <div className="flex space-x-4 mb-8">
                <a href="https://github.com/TheophilusG" target="_blank" rel="noopener noreferrer" 
                   className="p-2 hover:text-blue-600"><Github size={24} /></a>
                <a href="https://www.linkedin.com/in/tewoflos-girmay/" className="p-2 hover:text-blue-600"><Linkedin size={24} /></a>
                
              </div>
            </div>
            <div className="md:w-1/2 relative">
              {/* Profile Picture with decorative elements */}
              <div className="relative">
                <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                  <img 
                    src={profilePic}
                    alt="Tewoflos Girmay" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating decorative elements */}
                <Cpu className="absolute top-0 right-0 text-blue-500" style={floatingIcons} />
                <Terminal className="absolute bottom-0 left-0 text-green-500" style={floatingIcons} />
                <Database className="absolute top-1/2 right-0 text-purple-500" style={floatingIcons} />
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Research Section with Visual Elements */}
        <section id="research" className="mb-24">
          <div className="flex items-center mb-8">
            <Book className="mr-3 text-blue-600" />
            <h3 className="text-3xl font-bold">Research</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchPapers.map((paper, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                {/* Add decorative quantum circuit pattern */}
                <svg className="absolute top-0 right-0 w-24 h-24 text-blue-50" viewBox="0 0 100 100">
                  <path d="M10,50 h80 M50,10 v80 M30,30 h40 v40 h-40 z" stroke="currentColor" fill="none" />
                </svg>
                <h4 className="text-xl font-bold mb-2">{paper.title}</h4>
                <p className="text-gray-600 mb-4">{paper.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {paper.tags.map((tag, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={paper.link} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline flex items-center">
                  Read Paper <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Projects Section with Images */}
        <section id="projects" className="mb-24">
          <div className="flex items-center mb-8">
            <Code className="mr-3 text-green-600" />
            <h3 className="text-3xl font-bold">Projects</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {/* Project Preview Image */}
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/Images/time.jpg'; // Optional: Add a fallback image
                      console.log(`Failed to load image for ${project.title}`);
                    }}
                  />
                </div>
                <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline flex items-center">
                    View Project <ExternalLink size={16} className="ml-1" />
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" 
                     className="text-gray-600 hover:text-blue-600">
                    <Github size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        

        {/* Writing Section */}
        <section id="writing" className="mb-24">
          <div className="flex items-center mb-8">
            <FileText className="mr-3" />
            <h3 className="text-3xl font-bold">Writing</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold mb-2">{article.title}</h4>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <p className="text-sm text-gray-500 mb-4">{article.date}</p>
                <a href={article.link} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline flex items-center">
                  Read More <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </section>

                
        <section id="interests" className="mb-24">
          <div className="flex items-center mb-8">
            <Heart className="mr-3 text-red-600" />
            <h3 className="text-3xl font-bold">Interests</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {interests.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-bold mb-4">{category.category}</h4>
                <div className="space-y-3">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      {typeof item === 'string' ? (
                        <span>{item}</span>
                      ) : (
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600">by {item.author}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="campus" className="mb-24">
          <div className="flex items-center mb-8">
            <Terminal className="mr-3 text-green-600" />
            <h3 className="text-3xl font-bold">Campus Involvement</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campusInvolvement.map((activity, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold mb-2">{activity.title}</h4>
                <p className="text-blue-600 mb-2">{activity.role}</p>
                <p className="text-sm text-gray-500 mb-3">{activity.period}</p>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Add CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>


    <ContactForm />
    
    </div>
  );
};

const researchPapers = [
  {
    title: "Hardware Specific Error Correction and Noise Resistant Portfolio Optimization with VQE",
    description: "Novel approach to quantum portfolio optimization incorporating hardware-specific noise considerations.",
    link: "https://drive.google.com/file/d/1T-CB49zhwnOWoFBUt7bokc1wJlkmfJyJ/view",
    tags: ["Quantum Computing", "Finance", "VQE", "Quantum Machine Learning for Financial Markets"]
  }
];

const projects = [
  {
    title: "Robot Path Planning using A* search",
    description: "Implemented A* algorithm for optimal robot navigation in dynamic environments.",
    link: "https://github.com/TheophilusG/Robot-Path-Planning-Project-",
    github: "https://github.com/TheophilusG/Robot-Path-Planning-Project-",
    tags: ["Python", "A*", "Robotics", "AI Algorithms"],
    image: "/Images/Figure_1.png" // Add your image path here
  },
  {
    title: "NYC Traffic Report Analysis",
    description: "A focus on temporal patterns, geographical hotspots, contributing factors, and the relationship between accident severity and various conditions",
    link: "https://github.com/TheophilusG/DataBootcamp/blob/05fbeb5cbe685996d9b46acdc68bf6ed03195185/Midterm_Project_NYC_Traffic_Accidents_Analysis.ipynb",
    github: "#",
    tags: ["Data Visualization", "Python", "Data Analysis", "Data Science", "Real World Data"],
    image: "/Images/NYC traffic proj.png" // Add your image path here
  },
  {
    title: "Grocery Price Prediction in New York City: A Machine Learning Approach",
    description: "Analyzed price variations across different NYC neighborhoods and stores by developing predictive models to estimate grocery item prices",
    link: "https://github.com/TheophilusG/DB-Finalproject/blob/a5e0d464e25aa6f8ef77c8d616e49ccd0b238e0a/Final_Project.ipynb",
    github: "#",
    tags: ["Data Visualizations", "Machine Learning", "Data Science"],
    image: "/Images/groceries.png" // Add your image path here
  },
  {
    title: "Kropki Sudoku Solver",
    description: "The Kropki Sudoku is a variant of the traditional Sudoku puzzle with additional constraints introduced by black and white dots between cells. White Dot: Indicates that the two connected numbers differ by. Black Dot: Indicates that one number is exactly double the other. The solver employs a backtracking algorithm with several advanced techniques. ",
    link: "https://github.com/TheophilusG/Kropiki-Sudoku-",
    github: "https://github.com/TheophilusG/Kropiki-Sudoku-/blob/main/AI_Project_2_Documentation.pdf",
    tags: ["AI", "Sudoku", "Backtracking", "Python"],
    image: "/Images/kropki.png" // Add your image path here
  },
  {
    title: "Flicker--Photo-Sharing-Web-Application",
    description: "Cloned version of flicker photo sharing web application using using Flask, Python, PostgreSql, HTML, and CSS",
    link: "https://github.com/TheophilusG/Flicker--Photo-Sharing-Web-Application",
    github: "https://github.com/TheophilusG/Flicker--Photo-Sharing-Web-Application",
    tags: ["Flask", "Postgress", "Python", "HTML", "CSS"],
    image: "/Images/flicker.png" // Add your image path here
  }
];

const articles = [
  {
    title: "Quantum Neural Networks with Pennylane",
    description: "Deep dive into implementing neural networks using quantum circuits with Pennylane framework.",
    link: "https://medium.com/@tfg7297/quantum-neural-networks-with-pennylane-and-photonic-quantum-networks-cf020ab48024",
    date: "2023-12-01"
  },
  {
    title: "Understanding Quantum Error Correction",
    description: "Guide to quantum error correction techniques.",
    link: "#",
    date: "2023-11-15"
  }
];

const interests = [
  {
    category: "Books",
    items: [
      { title: "A Brief History of Time", author: "Stephen Hawking"},
      { title: "Quantum Computing Since Democritus", author: "Scott Aaronson" },
      { title: "The Art of Computer Programming", author: "Donald Knuth" }
    ]
  },
  {
    category: "Research Areas",
    items: [
      "Quantum Computing",
      "Machine Learning Security",
      "Financial Mathematics",
      "Data Science"
    ]
  }
];

const campusInvolvement = [
  {
    title: "NYU Health Center Office",
    role: "Newsletter Author and student assistant",
    period: "2022 - Present",
    description: "As a Newsletter Author and Student Assistant at the NYU Health Center, I create engaging and informative content to promote health and wellness among the university community. I assist with outreach initiatives, support administrative tasks, and ensure students stay informed about resources and events that enhance their well-being."
  },
  {
    title: "Algorithmic Problem Solving Club",
    role: "Active Member",
    period: "2022 - Present",
    description: "Participating in leetcode solving and mathematical modeling competitions and workshops.",
  },
  {
    title: "NYU Abu Dhabi Center for Quantum and Toplogical Systems",
    role: "Research Assistant",
    period: "2023 - Present",
    description: "Conducting research on quantum machine learning models security and quantum error correction.",
  },
  {
    title: "NYU Student Life Office",
    role: "Resident Assistant",
    period: "2023 - 2024",
    description: "As a resident assistant, I create a safe, inclusive community by being approachable, supportive, and organized. I listen to concerns, foster connections, and lead with empathy and professionalism, ensuring residents feel valued and supported"
  }
];


export default Portfolio;
