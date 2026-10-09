export type ProjectSection = {
  heading: string;
  body: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  repo: string;
  live: string | null;
  image?: string;
  imageFit?: "cover" | "contain"; // contain for phone screenshots
  hideCommits?: boolean; // hide the commit count
  detail?: {
    sections: ProjectSection[];
    gallery?: { src: string; caption: string; portrait?: boolean }[];
  };
};

export const projects: Project[] = [
  {
    slug: "hasitha-dev",
    title: "hasitha.dev",
    summary:
      "My personal website and portfolio, built to document my projects, learning, and technical interests. Also serves as a sandbox for trying out new ideas in Next.js and design.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    repo: "https://github.com/hasithaea/hasitha-dev",
    live: "https://hasitha.dev",
    image: "/projects/hasitha-dev-cover.png",
    detail: {
      sections: [
        {
          heading: "Overview",
          body: [
            "This is my personal site. Part portfolio, part scratchpad. I use it to document what I'm building, write about things I'm learning, and experiment with ideas that don't fit anywhere else.",
            "The first version was a generic template with placeholder copy. I rebuilt it from scratch because I wanted something that actually reflected how I think about infrastructure and design, not just something that looked like every other developer portfolio.",
          ],
        },
        {
          heading: "Design",
          body: [
            "The visual system follows one rule, orange is only for interaction. Buttons, links, and hover states use it. Everything else stays neutral. Text, borders, backgrounds. This keeps the accent meaningful instead of decorative.",
            "Status uses a separate green, and only for actual health signals. Build passing, site up. If something is amber, you know it's a warning. If it's grey, it's inactive. The colors mean specific things.",
            "Earlier versions had a grid background and floating orbs behind the content. I removed both. The current version is flatter and more honest about what it's doing.",
          ],
        },
        {
          heading: "Architecture",
          body: [
            "Built on Next.js App Router with TypeScript and Tailwind CSS v4. Design tokens live in a single globals.css file and are exposed to Tailwind via the @theme directive, so colors and spacing have one source of truth.",
            "The projects section pulls live data from the GitHub API. Last push, language, CI status, and commit count, and it pings deployed sites to check whether they're up. Results are cached with ISR, GitHub data refreshes hourly, site status every 10 minutes.",
            "The contact form uses a honeypot field instead of a CAPTCHA and sends a confirmation email back to the sender. It's a small thing, but it makes the interaction feel less like shouting into a void.",
          ],
        },
        {
          heading: "Reflection",
          body: [
            "Currently working on: a proper status page that aggregates uptime across all deployed projects, and an /about page with more detail than the homepage gives.",
            "Longer term: a writing section for notes on things I'm learning, and a case study format for projects that deserve more than a card.",
          ],
        },
      ],
    },
  },
  {
    slug: "docker-ci-cd-pipeline",
    title: "Docker CI/CD Pipeline",
    summary:
      "A push to deploy pipeline for a containerized Node.js app. Every commit to main builds the image, pushes it to Docker Hub, and triggers a redeploy on Render, live in under two minutes.",
    stack: ["GitHub Actions", "Docker", "Docker Hub", "Render", "Node.js"],
    repo: "https://github.com/hasithaea/DevOps-with-Docker/tree/main/express-ci-cd-demo",
    live: "https://ci-cd-demo-of6g.onrender.com",
    image: "/projects/docker-ci-cd-pipeline-cover.png",
    detail: {
      sections: [
        {
          heading: "Overview",
          body: [
            "The goal of this project was to understand what actually happens between git push and a running service. The app itself is a minimal Express server. One endpoint, one page. The point isn't the application. It's the automation around it.",
            "Every push to main results in a new Docker image, a new tag on Docker Hub, and a fresh deploy on Render. No manual steps. If the pipeline is green, the change is live.",
          ],
        },
        {
          heading: "How it works",
          body: [
            "GitHub Actions runs on every push to main. The workflow checks out the code, sets up Node, builds the Docker image, and tags it as hasithaea/express-ci-cd-demo:latest. It authenticates with Docker Hub using a repository secret, pushes the image, then hits a Render deploy webhook to trigger a redeploy.",
            "Render pulls the new image and restarts the service. End-to-end, the whole thing runs in under two minutes.",
            "Locally, docker-compose.yml runs the same image against the same port. The dev environment and the production environment stay close enough that bugs don't hide between them.",
            "The Dockerfile uses a multi stage build to keep the final layer small. Dependencies get installed in one stage, the production image copies only what it needs.",
          ],
        },
        {
          heading: "What broke",
          body: [
            "The first version failed constantly. Wrong secrets, mismatched image tags, a deploy webhook that fired before the Docker push had finished propagating.",
            "Every failure taught something about ordering and idempotency. The webhook issue was the interesting one, GitHub Actions reported the push as complete before Docker Hub had fully registered the new tag. The fix was a small delay, but the lesson was bigger: any system with multiple moving parts needs to be designed around the assumption that events are eventually consistent, not instant.",
            "The pipeline that works today is boring: four steps, in order, that fail loudly when something's wrong. That's what a production pipeline is supposed to look like. The interesting part is getting there.",
          ],
        },
        {
          heading: "Reflection",
          body: [
            "This is the project that made CI/CD click. Reading about pipelines is abstract; watching one fail in the middle of a build, at 11pm, because a secret name was wrong, that's concrete.",
          ],
        },
      ],
      gallery: [
        { src: "/projects/docker-ci-cd-pipeline-01.png", caption: "Docker Hub repository" },
        { src: "/projects/docker-ci-cd-pipeline-02.png", caption: "The deployed app. Minimal by design, with a live timestamp." },
      ],
    },
  },
  {
    slug: "majesty",
    title: "Majesty",
    summary:
      "An e-commerce clothing website built as a team project for the Internet Services and Web Development course at the University of Ruhuna.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "Docker", "MySQL"],
    repo: "https://github.com/gaganajanith/Majesty_project",
    live: null,
    image: "/projects/majesty-cover.png",
    hideCommits: true, // team repo
    detail: {
      sections: [
        {
          heading: "Overview",
          body: [
            "An e-commerce clothing site built for CSC113α (Internet Services and Web Development) in the first semester of my BCS degree at the University of Ruhuna. Four person team project.",
            "The site supports browsing products, adding to cart, and a dummy checkout flow. Users can register or log in with a seeded test account.",
          ],
        },
        {
          heading: "Role",
          body: [
            "I designed and built the backend, the PHP application layer that handles product listings, cart state, and user sessions.",
            "I also containerized the whole stack with Docker Compose, so the app runs identically whether you're on XAMPP or Docker. That part wasn't assigned; I added it because getting the project running across four different machines was painful.",
            "Contributed to the database schema and the dummy seed data used for testing.",
          ],
        },
        {
          heading: "Architecture",
          body: [
            "PHP application backed by MySQL. The frontend is plain HTML, CSS, and JavaScript, no framework.",
            "Docker Compose runs three services: the PHP app, MySQL, and phpMyAdmin. The database is seeded from a SQL dump on first boot, so anyone cloning the repo gets a working demo without manual setup.",
          ],
        },
        {
          heading: "Deployment",
          body: [
            "Not publicly deployed yet. The plan is to host it on an Oracle Cloud VPS using Docker Compose behind a reverse proxy, on its own subdomain, with a fixed demo account and seeded data.",
            "The original submission ran on XAMPP for grading, but the Docker version is what lives in the repo and what will be deployed.",
          ],
        },
      ],
      gallery: [
        { src: "/projects/majesty-01.png", caption: "Homepage of Majesty" },
        { src: "/projects/majesty-02.png", caption: "Login and Registration" },
        { src: "/projects/majesty-03.png", caption: "Men's & Women's clothing section with products listed." },
        { src: "/projects/majesty-04.png", caption: "Dummy checkout" },
        { src: "/projects/majesty-05.png", caption: "Web site running via Docker Compose and local XAMPP" },
      ],
    },
  },
  {
    slug: "attendance-tracker",
    title: "80% Attendance Tracker",
    summary:
      "A mobile app UI design that helps students track attendance and predict how many classes they can miss while staying above 80%. Built in under 2 hours for a UI/UX poster challenge.",
    stack: ["Figma", "Canva"],
    repo: "https://github.com/hasithaea/80-attendance-tracker-ui",
    live: null,
    image: "/projects/attendance-tracker-cover.png",
    detail: {
      sections: [
        {
          heading: "Overview",
          body: [
            "A mobile app UI concept for tracking university attendance. Designed for the UI/UX Poster Challenge hosted by Legion Society (University of Kelaniya) during their UX/UI Workshop series, a three day event in July 2026.",
            "The challenge was a single page poster submission, completed in under two hours.",
          ],
        },
        {
          heading: "Design",
          body: [
            "The premise is simple: students often lose track of attendance and don't know how many classes they can still miss. Falling below 80% has real consequences, exam eligibility, repeat courses.",
            "The app tracks attendance in real time and predicts how many classes the user can still skip. Smart alerts warn when the margin gets thin. Analytics show trends per subject.",
            "Four screens: Dashboard (overall percentage and remaining skips), Subject List (per subject breakdown), Analytics (weekly trends), and Profile.",
          ],
        },
        {
          heading: "Reflection",
          body: [
            "Designed under a strict two hour limit, which forced fast decisions. The result prioritizes clarity over decoration. The whole point is helping students stay on track, not looking flashy.",
            "Some mockup components (device frame, icons) came from Figma community resources. Full credit to their original creators in the repo README.",
            "If rebuilt: home screen widget for at a glance tracking, and calendar integration to sync with timetables.",
          ],
        },
      ],
      gallery: [
        { src: "/projects/attendance-tracker-01.png", caption: "Dashboard", portrait: true },
        { src: "/projects/attendance-tracker-02.png", caption: "Subject list", portrait: true },
        { src: "/projects/attendance-tracker-03.png", caption: "Analytics", portrait: true },
        { src: "/projects/attendance-tracker-04.png", caption: "Profile", portrait: true },
        { src: "/projects/attendance-tracker-05.png", caption: "Poster designed for the challenge", portrait: true },
      ],
    },
  },
];