import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import ContactForm from './ContactForm';
import profileImage from '/Images/Photo.jpeg';
import dataAggImg from '/Images/dataagg.png';
import trafficForecastImg from '/Images/NYC traffic proj.png';
import quantumPortfolioImg from '/Images/qportfolio.png';
import capstoneImg from '/Images/compu.png';
import visaLogo from '/Images/VISAinc.png';
import sternlogo from '/Images/NYUstern.png';
import skyITlogo from '/Images/skyIT.jpeg';
import nsbeLogo from '/Images/NSBE.png';
import nychaqLogo from '/Images/nychaq.png';
import IBMCALLlogo from '/Images/IBMcall.png';
import stlogo from '/Images/stuleader.png';

const sectionOrder = [
  { id: 'who', label: 'Who I Am' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'writing', label: 'Writing' },
  { id: 'domains', label: 'What I Work On' },
  { id: 'contact', label: 'Contact' }
];


const staticHeadline = 'Hi I am Teo!';
const dynamicPhrases = ["I'm a Developer.", "I'm a Problem Solver.", "I'm a lifelong learner."];

const Portfolio = () => {
  const [motionSuppressed, setMotionSuppressed] = useState(false);
  const [cameraDepth, setCameraDepth] = useState(0);
  const [activeSection, setActiveSection] = useState('who');
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [staticDisplay, setStaticDisplay] = useState('');
  const [phase, setPhase] = useState('static');
  const [dynamicDisplay, setDynamicDisplay] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMotionSuppressed(mq.matches);
    const handler = (event) => setMotionSuppressed(event.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (motionSuppressed || typeof window === 'undefined') {
      setCameraDepth(0);
      return;
    }
    const updateDepth = () => setCameraDepth(Math.min(1, window.scrollY / 2000));
    updateDepth();
    window.addEventListener('scroll', updateDepth);
    return () => window.removeEventListener('scroll', updateDepth);
  }, [motionSuppressed]);

  useEffect(() => {
    const cycle = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % mapNodes.length);
    }, 2600);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    if (phase !== 'static') return;
    if (staticDisplay.length === staticHeadline.length) {
      const hold = setTimeout(() => setPhase('dynamic'), 500);
      return () => clearTimeout(hold);
    }
    const timeout = setTimeout(() => {
      setStaticDisplay(staticHeadline.slice(0, staticDisplay.length + 1));
    }, 90);
    return () => clearTimeout(timeout);
  }, [staticDisplay, phase]);

  useEffect(() => {
    if (phase !== 'dynamic') return;
    const currentPhrase = dynamicPhrases[phraseIndex];
    let timeout;

    if (!isDeleting && dynamicDisplay.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDynamicDisplay(currentPhrase.slice(0, dynamicDisplay.length + 1));
      }, 100);
    } else if (!isDeleting && dynamicDisplay.length === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && dynamicDisplay.length > 0) {
      timeout = setTimeout(() => {
        setDynamicDisplay(currentPhrase.slice(0, dynamicDisplay.length - 1));
      }, 60);
    } else if (isDeleting && dynamicDisplay.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length);
    }

    return () => clearTimeout(timeout);
  }, [dynamicDisplay, isDeleting, phraseIndex, phase]);

  useEffect(() => {
    if (activeSection !== 'projects') return undefined;
    const ticker = setInterval(() => {
      setActiveProject((prev) => {
        const currentIndex = projects.findIndex((proj) => proj.slug === prev.slug);
        const nextIndex = (currentIndex + 1) % projects.length;
        return projects[nextIndex];
      });
    }, 3200);
    return () => clearInterval(ticker);
  }, [activeSection]);

  const renderHeroPanel = () => {
    switch (activeSection) {
      case 'who':
        return <ProfileSpotlight />;
      case 'projects':
        return <ProjectSpotlight project={activeProject} projectsList={projects} />;
      case 'experience':
        return <ExperienceSpotlight experiences={experiences} />;
      case 'leadership':
        return <LeadershipSpotlight items={leadership} />;
      default:
        return <SystemsMapPanel activeNode={activeNode} motionSuppressed={motionSuppressed} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#f1f1f1]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs uppercase tracking-[0.35em] text-[#bbbbbb]">
          <span className="font-semibold text-white">Tewoflos Girmay</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/TheophilusG" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#bbbbbb] transition hover:text-white">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/tewoflos-girmay/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#bbbbbb] transition hover:text-white">
              <Linkedin size={18} />
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-14 lg:flex-row">
          <div className="lg:w-1/2">
            <p className="text-xs uppercase tracking-[0.4em] text-[#9a9a9a]">Software Engineer · Systems & Infrastructure</p>
            <h1 className="mt-6 text-4xl font-semibold text-white md:text-5xl">
              <span className="block">{staticDisplay}</span>
              <span className="mt-2 block min-h-[1.6em] text-[#d9d9d9]">
                {phase === 'dynamic' ? dynamicDisplay : ''}
                <span className="ml-1 inline-block h-6 w-[2px] translate-y-[4px] bg-white align-middle animate-pulse" aria-hidden="true" />
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[#cfcfcf]">
              Connecting with people is at the core of who I am, and I channel this philosophy into every aspect of my work. Programming has become my
              primary medium for driving meaningful impact, bridging science to solve complex problems. I am deeply
              motivated by building innovative, research-driven solutions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-semibold uppercase tracking-[0.3em]">
              <a
                href="https://drive.google.com/file/d/1TRaFdmDQwGpO9wzhXt1pkBXMkEPd1Fpn/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-white transition hover:border-white/70"
              >
                Resume <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="relative h-[380px] flex-1 overflow-hidden rounded-3xl border border-white/15 bg-[#050505] p-6" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_55%)]" />
            <div className="absolute inset-6 border border-white/10" />
            <div
              className="relative h-full w-full"
              style={{
                transform: motionSuppressed ? 'none' : `rotateX(${cameraDepth * 8}deg) translateY(${cameraDepth * -16}px)`
              }}
            >
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-4 opacity-40">
                {Array.from({ length: 16 }).map((_, idx) => (
                  <div key={idx} className="border border-white/10" />
                ))}
              </div>
              {renderHeroPanel()}
            </div>
          </div>
        </section>

        <section id="portfolio-tabs" className="border-t border-white/10 bg-black">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-6 py-8 text-xs uppercase tracking-[0.35em]">
            {sectionOrder.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`rounded-full border px-4 py-2 transition ${
                  activeSection === section.id ? 'border-white text-white' : 'border-white/20 text-[#bfbfbf] hover:border-white/60 hover:text-white'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
          <div className="border-t border-white/10">
            {renderSection(activeSection, activeProject, setActiveProject)}
          </div>
        </section>
      </main>
    </div>
  );
};

const renderSection = (section, activeProject, setActiveProject) => {
  switch (section) {
    case 'who':
      return (
        <SectionShell title="About">
          <p className="text-base leading-relaxed text-[#d0d0d0]">
            A passionate and skilled software engineer currently pursuing a BS in Computer Science with a concentration in Data Science & Machine Learning and minor in Economics at New York University Abu Dhabi. My technical expertise spans multiple languages and frameworks, including Python, TypeScript, React.js, and Node.js, backend infrastructure, ML tooling, and risk-aware quantitative systems.
          </p>
        </SectionShell>
      );
    case 'domains':
      return (
        <SectionShell title="What I work on">
          <div className="grid gap-6 md:grid-cols-3">
            {problemDomains.map((domain) => (
              <div key={domain.title} className="rounded-2xl border border-white/15 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-[#9c9c9c]">{domain.code}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{domain.title}</h3>
                <p className="mt-3 text-sm text-[#cfcfcf]">{domain.description}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      );
    case 'projects':
      return (
        <SectionShell title="Selected projects">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="grid gap-4">
              {projects.map((project) => (
                <button
                  key={project.slug}
                  onClick={() => setActiveProject(project)}
                  className={`w-full rounded-2xl border px-5 py-6 text-left transition ${
                    activeProject.slug === project.slug ? 'border-white text-white' : 'border-white/15 text-[#d8d8d8] hover:border-white/50 hover:text-white'
                  }`}
                >
                  <div className="text-xs uppercase tracking-[0.35em] text-[#9f9f9f]">{project.station}</div>
                  <h3 className="mt-3 text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-[#cfcfcf]">{project.summary}</p>
                  <div className="mt-3 text-xs uppercase tracking-[0.35em] text-[#9c9c9c]">{project.tech}</div>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white">
                    View case <ArrowRight size={14} />
                  </span>
                </button>
              ))}
            </div>
            <ProjectCaseStudy project={activeProject} />
          </div>
        </SectionShell>
      );
    case 'experience':
      return (
        <SectionShell title="Experience">
          <div className="space-y-8">
            {experiences.map((experience) => (
              <article key={experience.org} className="rounded-2xl border border-white/15 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.35em] text-[#9b9b9b]">
                  <span>{experience.period}</span>
                  <span>{experience.location}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-white">{experience.org}</h3>
                <p className="text-sm uppercase tracking-[0.35em] text-[#dfdfdf]">{experience.role}</p>
                <ul className="mt-4 space-y-2 text-sm text-[#cbcbcb]">
                  {experience.focus.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionShell>
      );
    case 'leadership':
      return (
        <SectionShell title="Leadership & achievements">
          <div className="space-y-6">
            {leadership.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.35em] text-[#9c9c9c]">
                  <span>{item.period}</span>
                  <span>{item.event}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-[#cbcbcb]">{item.description}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      );
    case 'writing':
      return (
        <SectionShell title="Writing & research">
          <div className="space-y-4">
            {writingEntries.map((entry) => (
              <a
                key={entry.title}
                href={entry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/15 px-5 py-4 text-left transition hover:border-white/50"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#9b9b9b]">{entry.type}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{entry.title}</h3>
                  <p className="mt-1 text-sm text-[#cecece]">{entry.description}</p>
                </div>
                <ExternalLink size={18} className="text-white" />
              </a>
            ))}
          </div>
        </SectionShell>
      );
    case 'contact':
      return (
        <SectionShell title="Contact">
          <div className="rounded-2xl border border-white/15 bg-[#050505] p-6 text-sm text-[#cfcfcf]">
            <p>Reach out for discussions, research collaborations, or engineering roles. Responses within 48 hours.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-white">
              <a href="https://github.com/TheophilusG" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <Github size={16} /> GitHub
              </a>
              <span>/</span>
              <a href="https://www.linkedin.com/in/tewoflos-girmay/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
          <ContactForm />
        </SectionShell>
      );
    default:
      return null;
  }
};

const SectionShell = ({ title, children }) => (
  <section className="px-6 py-16">
    <div className="mx-auto max-w-6xl space-y-8">
      <h2 className="text-xs uppercase tracking-[0.4em] text-[#9a9a9a]">{title}</h2>
      {children}
    </div>
    <div className="mx-auto mt-12 max-w-6xl border-t border-white/10" />
  </section>
);

const SystemsMapPanel = ({ activeNode, motionSuppressed }) => (
  <div className="relative z-10 flex h-full flex-col justify-between">
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#b5b5b5]">
      <div className="h-2 w-2 rounded-full bg-white" />
      Systems Map
    </div>
    <div className="space-y-4">
      {mapNodes.map((node, idx) => (
        <div
          key={node.id}
          className={`flex items-center justify-between gap-3 text-sm transition ${
            idx === activeNode ? 'text-white opacity-100' : 'text-white/40 opacity-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full border text-center text-xs leading-8 transition ${
                idx === activeNode ? 'border-white text-white' : 'border-white/20 text-[#c1c1c1]'
              }`}
            >
              {node.id}
            </div>
            <span className="font-semibold">{node.label}</span>
          </div>
          <span
            className={`text-[10px] uppercase tracking-[0.4em] transition ${
              idx === activeNode ? 'text-white' : 'text-[#8f8f8f]'
            }`}
          >
            {node.signal}
          </span>
        </div>
      ))}
    </div>
    <div className="text-[11px] uppercase tracking-[0.4em] text-[#8d8d8d]">
      {motionSuppressed ? 'Static diagram' : 'Camera drifts with scroll'}
    </div>
  </div>
);

const ProfileSpotlight = () => (
  <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-center text-white">
    <div className="relative h-36 w-36 overflow-hidden rounded-full border border-white/40 shadow-[0_10px_35px_rgba(0,0,0,0.45)]">
      <img src={profileImage} alt="Tewoflos Girmay portrait" className="h-full w-full object-cover" />
      <div className="absolute inset-0 rounded-full border border-white/30" />
    </div>
    <div className="space-y-1">
      <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">Who I Am</p>
      <p className="text-lg font-semibold">Tewoflos (Teo) Girmay</p>
      <p className="text-sm text-[#cecece]">Software engineer/Researcher</p>
    </div>
    <p className="max-w-xs text-xs text-[#d5d5d5]">
      I love building impactfull things.
    </p>
  </div>
);

const ProjectSpotlight = ({ project, projectsList }) => (
  <div className="relative z-10 flex h-full flex-col gap-4 text-white">
    <div className="text-[11px] uppercase tracking-[0.4em] text-[#b5b5b5]">Project Spotlight</div>
    <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/15 bg-white/5">
      {projectsList.map((proj) => (
        <div
          key={proj.slug}
          className={`absolute inset-0 transition-opacity duration-700 ${project?.slug === proj.slug ? 'opacity-100' : 'opacity-0'}`}
        >
          {proj.image ? (
            <img src={proj.image} alt={`${proj.title} preview`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.4em] text-white/60">Visual coming soon</div>
          )}
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 border border-white/10" />
    </div>
    <div className="space-y-1 text-center">
      <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">{project?.station}</p>
      <p className="text-lg font-semibold">{project?.title}</p>
      <p className="text-sm text-[#cecece]">{project?.summary}</p>
    </div>
  </div>
);

const ExperienceSpotlight = ({ experiences }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!experiences?.length) return undefined;
    const cycle = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % experiences.length);
    }, 2600);
    return () => clearInterval(cycle);
  }, [experiences]);

  return (
    <div className="relative z-10 flex h-full flex-col justify-center gap-6 text-white">
      <div className="relative flex flex-1 items-center justify-center">
        {experiences.map((experience, idx) => (
          <div
            key={experience.org}
            className={`absolute flex h-40 w-52 items-center justify-center rounded-3xl border border-white/15 bg-white/5 p-8 transition-opacity duration-700 ${
              idx === activeIdx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {experience.logo ? (
              <img src={experience.logo} alt={`${experience.org} logo`} className="max-h-full max-w-full object-contain" />
            ) : (
              <span className="text-center text-[11px] uppercase tracking-[0.3em] text-white/70">{experience.org}</span>
            )}
          </div>
        ))}
      </div>
      <div className="text-center text-xs uppercase tracking-[0.4em] text-white/60">
        {experiences[activeIdx]?.org} — {experiences[activeIdx]?.role}
      </div>
    </div>
  );
};

const LeadershipSpotlight = ({ items }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!items?.length) return undefined;
    const ticker = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % items.length);
    }, 2800);
    return () => clearInterval(ticker);
  }, [items]);

  const active = items[activeIdx];

  return (
    <div className="relative z-10 flex h-full flex-col justify-center gap-5 text-white">
      <div className="text-[11px] uppercase tracking-[0.4em] text-[#b5b5b5]">Leadership Highlights</div>
      <div className="relative flex flex-1 items-center justify-center">
        {items.map((entry, idx) => (
          <div
            key={entry.title}
            className={`absolute flex h-44 w-44 items-center justify-center rounded-full border border-white/20 bg-white/5 p-7 transition-opacity duration-700 ${
              idx === activeIdx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {entry.logo ? (
              <img src={entry.logo} alt={`${entry.title} mark`} className="max-h-full max-w-full object-contain" />
            ) : (
              <span className="text-center text-[10px] uppercase tracking-[0.35em] text-white/70">{entry.event}</span>
            )}
          </div>
        ))}
      </div>
      <div className="text-center space-y-1">
        <p className="text-lg font-semibold">{active?.title}</p>
        <p className="text-sm uppercase tracking-[0.35em] text-[#cecece]">{active?.event}</p>
      </div>
    </div>
  );
};

const ProjectCaseStudy = ({ project }) => (
  <article className="rounded-3xl border border-white/15 bg-[#050505] p-6">
    <p className="text-xs uppercase tracking-[0.35em] text-[#9c9c9c]">Case study — {project.year}</p>
    <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
    <div className="mt-4 space-y-4 text-sm text-[#cfcfcf]">
      <DetailBlock label="Problem" value={project.problem} />
      <DetailBlock label="Why it was hard" value={project.challenge} />
      <DetailBlock label="Approach" value={project.approach} />
      <DetailBlock label="Key tradeoffs" value={project.tradeoffs} />
      <DetailBlock label="Outcome" value={project.outcome} />
      <DetailBlock label="What I learned" value={project.learning} />
    </div>
    <div className="mt-4 space-y-2 text-[13px] text-[#cdcdcd]">
      {project.details.map((detail) => (
        <p key={detail}>• {detail}</p>
      ))}
    </div>
  </article>
);

const DetailBlock = ({ label, value }) => (
  <div>
    <p className="text-[11px] uppercase tracking-[0.4em] text-[#9a9a9a]">{label}</p>
    <p className="mt-1">{value}</p>
  </div>
);

const mapNodes = [
  { id: '01', label: 'Data Ingestion Rail', signal: 'ingest' },
  { id: '02', label: 'Model Safety Unit', signal: 'audit' },
  { id: '03', label: 'Decision Layer', signal: 'route' },
  { id: '04', label: 'Post-Trade Feedback', signal: 'iterate' }
];

const problemDomains = [
  {
    code: 'A01',
    title: 'Auditing opaque systems',
    description: 'Instrumentation, anomaly detection and telemetry for fraud platforms and ML stacks.'
  },
  {
    code: 'B02',
    title: 'Resilient data pathways',
    description: 'Multi-source ingestion rails, caching, and retrieval architecture tuned for low-latency answers.'
  },
  {
    code: 'C07',
    title: 'Experimental design under uncertainty',
    description: 'Shot-efficient quantum routines, forecasting pipelines, and backtesting harnesses.'
  }
];

const projects = [
  {
    slug: 'market-data-aggregator',
    station: 'NYU STERN PROPRIETARY SOFTWARE',
    title: 'Real-Time Market Data Aggregator',
    summary: 'Unified market feed ingesting 10K+ updates/sec via multithreaded sockets with Redis + Postgres persistence.',
    tech: 'Python · WebSockets · Redis · PostgreSQL',
    year: '2024',
    problem: 'Multiple exchanges exposed inconsistent feeds but traders needed a single, reliable stream.',
    challenge: 'APIs delivered noisy payloads, socket drops were common, and teams demanded sub-50ms responses.',
    approach: 'Built resilient ingestion workers, standardized schemas, attached Redis pub/sub and persisted to Postgres.',
    tradeoffs: 'Allowed higher memory usage to keep caches hot and avoid blocking writes during spikes.',
    outcome: '75% fewer DB queries and consistent sub-50ms API calls even at peak event loads.',
    learning: 'Latency targets are impossible without end-to-end visibility; every feed now exposes lag + quality metrics.',
    details: [
      'Multi-threaded ingestion handles 10K+ market updates/sec across vendor APIs.',
      'Redis caching layer removed redundant queries and kept downstream services warm.'
    ],
    image: dataAggImg
  },
  {
    slug: 'traffic-forecasting',
    station: 'Forecasting',
    title: 'Real-Time NYC Traffic Prediction System',
    summary: 'Temporal modeling stack combining deep learning with statistical baselines for city-scale forecasting.',
    tech: 'Python · TensorFlow · NumPy',
    year: '2024',
    problem: 'City teams needed dependable congestion forecasts to plan routing windows.',
    challenge: 'Sensors failed randomly and borough-level data quality varied, making naive ML brittle.',
    approach: 'Built preprocessing to repair feeds, trained recurrent models with spatial context, and compared with statistical methods.',
    tradeoffs: 'Balanced model complexity with inference costs to keep refresh windows under two minutes.',
    outcome: 'Captured peak windows within 6% error, stabilizing planning workflows.',
    learning: 'Graceful degradation mattered more than raw accuracy; fallback heuristics kept ops teams confident.',
    details: [
      'Analyzed temporal dependencies and spatial correlations across borough sensors.',
      'Delivered interpretable dashboards for planners with model confidence intervals.'
    ],
    image: trafficForecastImg
  },
  {
    slug: 'quantum-portfolio',
    station: 'Research Project',
    title: ' Hardware Specific Error-Correction and Noise Resistant Portfolio Optimization with Variational Quantum Eigensolver',
    summary: 'Applied VQE + SPSA to hardware-aware finance problems and benchmarked against classical algorithms.',
    tech: 'Python · Pennylane · Finance',
    year: '2024',
    problem: 'Model risk-aware asset allocation on noisy quantum hardware.',
    challenge: 'NISQ limits forced shallow circuits while still needing convergence.',
    approach: 'Formulated QUBO problems, tuned SPSA for shot efficiency, and documented error behavior.',
    tradeoffs: 'Reduced asset universe to keep circuit depth manageable.',
    outcome: 'Improved competition results and mapped scenarios where quantum provides lift.',
    learning: 'Each circuit run must justify cost—telemetry around error rates guided improvements.',
    details: [
      'Earned 2nd place at NYCHAQATHON with highest risk-adjusted return among 25 universities.'
    ],
    image: quantumPortfolioImg
  },
  {
    slug: 'capstone-thesis',
    station: 'Thesis Project',
    title: 'Computational Detection of Differential Content Visibility',
    summary: 'Capstone thesis blending quantitative instrumentation and qualitative review to surface shadow banning signals across platforms.',
    tech: 'Python · Statistical Modeling · Experiment Design',
    year: '2025',
    problem: 'Creators suspect algorithmic suppression but lack measurable evidence separating policy actions from organic engagement decay.',
    challenge: 'Data access is limited, sensitive topics trigger additional moderation, and engagement curves differ widely across networks.',
    approach:
      'Designed mixed-method experiments with matched control/treatment posts, collected real-time engagement, and analyzed decay using DiD and survival models.',
    tradeoffs: 'Balanced experiment speed with the need for representative cohorts, prioritizing explainability over model complexity.',
    outcome: 'Surfaced statistically significant discoverability gaps on select sensitive topics and produced an advisor-reviewed investigation framework.',
    learning: 'Transparent experimentation plus network-aware analytics provides stronger claims than anecdotal reports alone.',
    details: [
      'Tracked live engagement decay for political vs. neutral posts to compare algorithmic visibility shifts.',
      'Separated natural audience drop-off from algorithmic suppression via controlled cohorts.',
      'Applied difference-in-differences, survival modeling, and network topology metrics to quantify effects.',
      'Automated multi-platform data collection and discoverability checks across Instagram, X/Twitter, and TikTok.'
    ],
    image: capstoneImg
  }
];

const experiences = [
  {
    org: 'VISA Inc.',
    role: 'Systems Architecture Intern — Financial Technology',
    period: 'Jun 2025 – Aug 2025',
    location: 'Dubai, UAE',
    logo: visaLogo,
    focus: [
      'Optimized fraud detection and authorization systems using ML scoring models.',
      'Integrated anomaly detection into production authorization flows.',
      'Built automated SQL/Python reporting for distributed payment infrastructure.'
    ]
  },
  {
    org: 'NYU Stern School of Business',
    role: 'Quantitative Finance Researcher — ML & Quantum Computing',
    period: 'Sep 2024 – Nov 2024',
    location: 'New York, USA',
    logo: sternlogo,
    focus: [
      'Implemented quantum portfolio optimization via VQE and QUBO formulations.',
      'Developed shot-efficient SPSA routines for noisy devices.',
      'Compared classical vs quantum risk-return profiles for asset allocation.'
    ]
  },
  {
    org: 'SkyIT Services',
    role: 'Back-End Developer Intern — ML Infrastructure',
    period: 'Jun 2024 – Aug 2024',
    location: 'New York, USA',
    logo: skyITlogo,
    focus: [
      'Built vector DB infrastructure and semantic search supporting 100K+ users.',
      'Optimized caching/data structures to reduce page load times by 10x.',
      'Deployed NestJS services and NLP pipelines for automated grading.'
    ]
  }
];

const leadership = [
  {
    title: 'National Society of Black Engineers — President & Honeywell Scholar',
    description: 'Lead 50+ member organization, coordinating technical workshops and industry partnerships.',
    event: 'NSBE',
    period: 'Sep 2023 – Present',
    logo: nsbeLogo
  },
  {
    title: 'NYCHAQATHON - Quantum Portfolio Optimization — 2nd Place',
    description: 'Led a four-person team to the highest risk-adjusted return using factor models, Python, and SQL.',
    event: 'Competition',
    period: 'Oct 2024',
    logo: nychaqLogo
  },
  {
    title: 'IBM Call for Code Global Competition — Finalist',
    description: 'Recognized for applied engineering impact in a global sustainability challenge.',
    event: 'IBM Call for Code',
    period: 'Oct 2021',
    logo: IBMCALLlogo
  },
  {
    title: 'Resident Assistant — NYU Abu Dhabi',
    description: 'Student leader fostering community and supporting residential life for 40+ students.',
    event: 'NYU Residential Life',
    period: 'Aug 2023 - Present',
    logo: stlogo
  }
];

const writingEntries = [
  {
    title: 'Hardware-Specific Error Correction and Portfolio Design',
    description: 'Notes from experiments merging finance optimization with quantum error models.',
    type: 'Research Paper',
    link: 'https://drive.google.com/file/d/1T-CB49zhwnOWoFBUt7bokc1wJlkmfJyJ/view'
  }
];

export default Portfolio;
