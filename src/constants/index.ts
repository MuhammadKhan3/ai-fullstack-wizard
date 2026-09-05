import { Github, Linkedin } from "lucide-react";

export const projects = [
  {
    id: 1,
    category: "pos",
    title: "Square / Toast POS Integration & Analytics Dashboard",
    url: "https://pos.letsgetoffline.com/connections",
    shortDescription: "Lightweight tool for restaurants to authenticate POS systems, export transaction data, and manage millions of records with advanced dashboards.",
    fullDescription: `**Introduction**  
This project focuses on building a lightweight yet powerful tool that allows restaurants to authenticate their **Square** or **Toast** point-of-sale (POS) systems and retrieve transaction data either via the **Square API** or directly through **terminal-based Toast integrations**.  

The tool enables restaurants to select custom date ranges, export transaction data as CSV files, and easily integrate with other analytics tools. Designed for speed and simplicity, it supports agile development and lays the groundwork for seamless future integrations with additional POS systems.  

Beyond basic data extraction, the system is capable of handling **millions of records** efficiently. It features **Supabase-powered dashboards** that allow clients to:  
- Track **offline discounts usage per customer**  
- Share insights via a **global dashboard** across multiple locations  
- Build real-time analytics without sacrificing performance  

**Skills:** Next.js, Supabase, Database Functions, Large-scale Data Processing, Dashboard Development`,
    features: [
      "POS Authentication using Square OAuth and Toast terminal integration",
      "Date-range filtering with secure, on-demand transaction retrieval",
      "CSV export for quick integration with BI or analysis tools",
      "Supabase dashboards to analyze offline discount usage",
      "Global dashboard to track performance across multiple locations",
      "Efficient handling of millions of transaction records"
    ],
    techStack: ["Next.js", "Supabase", "Database Functions", "Square API", "Toast Integration", "CSV Export"],
    image: "/projects/square-pos/one.png",
    images: [
      "/projects/square-pos/one.png",
      "/projects/square-pos/two.png",
      "/projects/square-pos/three.png",
      "/projects/square-pos/four.png"
    ],
    results: [
      "Enabled restaurants to securely authenticate POS systems without backend complexity",
      "Automated data retrieval reduced manual processing time significantly",
      "Dashboards delivered actionable insights on discount usage and customer behavior",
      "Designed for scalability to handle millions of records across locations"
    ]
  },

  {
    id: 2,
    category: "web",
    title: "Lumaya Business Register",
    shortDescription: "Secure and scalable platform for entrepreneurs to connect, verify, and complete business transactions.",
    fullDescription: `**Project Overview:**  
Lumaya Business Register is a secure, scalable, and feature-rich platform built to transform how people buy and sell businesses. The goal was to create a seamless environment where entrepreneurs, investors, and business owners can connect, verify, and complete transactions with confidence.  

I designed and developed the backend using **FastAPI** for exceptional performance, scalability, and clean architecture. The frontend was built with **React.js** and **Tailwind CSS**, ensuring a modern, responsive interface that works flawlessly across devices.  

**Key Features and Highlights:**  
- 🔒 **Advanced Security**  
  - AWS WAF to block malicious attacks and unauthorized access  
  - Google OAuth for secure, one-click authentication  
  - Veriff integration for identity verification  
  - Skribble for legally binding and secure document verification  

- 💬 **Customer Support Integration**  
  - Embedded Zendesk live chat for instant user assistance  

- 📧 **Communication Made Easy**  
  - Automated notifications and updates using SendGrid  

- 🌐 **Global Accessibility**  
  - Multilingual support to enhance user trust and reach  

- ☁️ **AWS-Powered Infrastructure**  
  - S3 Buckets for secure static asset and document storage  
  - Hosting and deployment on AWS EC2 with optimized configurations  

**Outcome:**  
The final product is a production-ready, high-performance business registry platform supporting verified listings, secure document handling, and end-to-end transactions. Designed for scalability, it can handle increasing traffic and data loads while maintaining top-tier security, reliability, and user experience.  

**Skills:** FastAPI, React.js, Tailwind CSS, SQLAlchemy, Python`,
    url: "https://lumaya.ch/",
    features: [
      "FastAPI backend with clean architecture and scalability",
      "React.js frontend with Tailwind CSS for modern UI",
      "AWS WAF for application security",
      "Google OAuth and Veriff for authentication and identity verification",
      "Skribble for document signing and verification",
      "Zendesk live chat integration",
      "SendGrid for reliable email delivery",
      "Multilingual support and AWS infrastructure (S3, EC2)"
    ],
    techStack: ["FastAPI", "React.js", "Tailwind CSS", "SQLAlchemy", "Python", "AWS (WAF, S3, EC2)", "Veriff", "Skribble", "Google OAuth", "Zendesk", "SendGrid"],
    image: "/projects/lumaya/three.png",
    images: [
      "/projects/lumaya/three.png",
      "/projects/lumaya/one.png",
      "/projects/lumaya/two.png"
    ],
    results: [
      "Secure, production-grade business registry platform",
      "End-to-end verified business transactions",
      "Responsive UI delivering seamless experience across devices",
      "Scalable system ready for high traffic and data growth"
    ]
  },
  {
    id: 3,
    category: "web",
    title: "Hashbot AI Platform & SDK",
    shortDescription: "AI-driven chatbot platform using vector embeddings for context-aware responses with real-time communication and easy integration.",
    fullDescription: `**Introduction**  
Hashbot is an AI-powered platform that integrates intelligent chatbots capable of delivering **contextually relevant responses** based on a curated library of articles.  

The platform uses **vector embeddings** generated directly from article content, enabling the chatbot to understand context and answer user queries accurately. Real-time communication is handled via **WebSockets**, and an **SDK** makes integration into websites fast and seamless.  

The backend was built with **FastAPI** for high-performance API delivery, while **Next.js** powers the frontend dashboard. Data is stored securely in **PostgreSQL**, ensuring scalable and reliable information retrieval. The build pipeline is optimized using **webpack**, providing fast and modular deployments.  

**Skills:** Python, FastAPI, Next.js, PostgreSQL, Webpack`,
    url: "https://hashbot.hashlogics.com/",
    features: [
      "Context-aware chatbot responses using vector embeddings",
      "Article ingestion and automatic embedding generation",
      "WebSocket-powered real-time communication",
      "SDK for simple integration into third-party websites",
      "Scalable backend with FastAPI and PostgreSQL",
      "Optimized build process with webpack"
    ],
    techStack: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Webpack", "WebSockets", "Vector Embeddings"],
    image: "/projects/hashbot/one.png",
    images: [
      "/projects/hashbot/one.png",
      "/projects/hashbot/two.png"
    ],
    results: [
      "Delivered real-time, contextually accurate chatbot responses",
      "Enabled quick website integration via SDK",
      "System scales to handle large article libraries efficiently",
      "Optimized developer workflow with modular build and deployment"
    ]
  },
  {
    id: 4,
    category: "pos",
    title: "Restaurant POS System",
    shortDescription: "Comprehensive POS system for 500+ restaurant locations with advanced order management features.",
    fullDescription: `The POS system is designed for restaurants, managing orders, staff shifts, payments, and kitchen operations. It supports shift check-ins/outs, custom item additions, multi-role access, and advanced printing for kitchen and counter staff. Integrated with mobile apps for online orders, it handles payments (cash, card, split), barcode scanning, and invoice generation. The system also assigns deliveries, tracks kitchen items, and displays orders in real-time. This scalable solution is running in 500+ locations, optimizing restaurant workflows for improved efficiency and accuracy.

This comprehensive solution streamlines restaurant operations across multiple locations, providing a unified platform for order management, staff coordination, and customer service. The system has been designed to handle high-volume operations while maintaining reliability and performance across all touchpoints.`,
    url: "https://pos.piecepie.app/builds/0.24/#/pos",

    features: [
      "Comprehensive Order Management: Complete order lifecycle from creation to fulfillment",
      "Staff Shift Management: Check-in/out systems with role-based access control",
      "Payment Processing: Multiple payment methods including cash, card, and split payments",
      "Kitchen Integration: Real-time kitchen display systems and order tracking",
      "Mobile App Integration: Seamless online ordering and delivery management",
      "Advanced Reporting: Detailed analytics and reporting for business insights"
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Payment Terminal Integration", "Printing Systems", "Mobile App Integration"],
    image: "/projects/pos/one.png",
    images: [
      "/projects/pos/one.png",
      "/projects/pos/two.png",
      "/projects/pos/three.png",
      "/projects/pos/four.png",
      "/projects/pos/five.png",
      "/projects/pos/six.png"
    ],
    results: [
      "Scalable Operations: Successfully deployed across 500+ restaurant locations",
      "Improved Efficiency: Streamlined workflows reduced order processing time by 40%",
      "Enhanced Accuracy: Real-time tracking reduced order errors by 60%",
      "Better Customer Experience: Integrated mobile ordering improved customer satisfaction"
    ]
  },
  {
    id: 5,
    category: "web",
    title: "Shorty Keyboard Shortcut Tracker",
    shortDescription: "Chrome extension that tracks and gamifies keyboard shortcut usage with real-time stats and leaderboards.",
    fullDescription: `📝 **Project Overview:**  
I developed Shorty, a sleek and fully functional Google Chrome Extension using React.js. The extension helps users improve productivity by tracking keyboard shortcut usage, providing real-time stats, and offering an interactive UI to help users learn new shortcuts.  

💡 **Features Implemented:**  
- 🏆 **Global Leaderboard:** Displays rankings of users based on shortcut usage, tracked in real time.  
- 📚 **Popular Shortcuts Panel:** Curated list of popular shortcuts with explanations and examples.  
- 📈 **Real-Time Stats:** Shows your most recent shortcut used and globally most-used shortcuts.  
- 🌗 **Dark/Light Mode:** Toggle between themes for better user experience.  
- 📱 **Responsive & Clean UI:** Mobile-first design with smooth navigation and polished components.  

🛠 **Tech Stack Used:**  
- React.js for the frontend logic and UI  
- Chrome Extension APIs for storage, background scripts, and real-time tracking  
- Tailwind CSS (or CSS-in-JS) for modern styling  
- LocalStorage/Chrome Sync for storing and syncing user stats  

📦 **What I Delivered:**  
- Full Chrome extension including popup, background, and content scripts  
- Clean, modular React codebase  
- Professional UI/UX with performance optimization in mind  

**Skills:** React.js, Chrome Extension Development, Supabase, DB Functions, Google APIs`,
    features: [
      "Global Leaderboard with real-time tracking",
      "Popular Shortcuts Panel with curated tips",
      "Real-Time Stats with recent and frequent shortcut usage",
      "Dark/Light Mode toggle",
      "Responsive, mobile-first UI"
    ],
    techStack: ["React.js", "Chrome Extension APIs", "Tailwind CSS", "LocalStorage", "Supabase", "Google APIs"],
    image: "/projects/shorty/one.png",
    images: [
      "/projects/shorty/one.png",
      "/projects/shorty/two.png",
      "/projects/shorty/three.png",
      "/projects/shorty/four.png",
      "/projects/shorty/five.png"
    ],
    results: [
      "30% improvement in workflow efficiency for active users",
      "Leaderboard with 1000+ users driving engagement",
      "Users learning an average of 15 new shortcuts per month",
      "4.8/5 rating on the Chrome Web Store"
    ]
  },
  {
    id: 6,
    category: "web",
    title: "Healthcare Management System (Full-Stack SaaS Platform)",
    shortDescription: "Production-ready healthcare management platform for clinics to streamline patient management, appointments, billing, and administrative workflows.",
    fullDescription: `**Project Overview:**
I developed a comprehensive healthcare management system designed for clinics and medical organizations to streamline operations such as patient management, appointments, billing, and administrative workflows.

This is a full-stack, production-ready platform with role-based access, real-time features, and a scalable architecture.

**Skills:** Next.js, NestJS, Node.js, PostgreSQL, TypeScript`,
    url: "#",
    features: [
      "Patient management with centralized records",
      "Appointment scheduling and management",
      "Billing and invoicing workflows",
      "Administrative and operational workflow automation",
      "Role-based access control for multiple user types",
      "Real-time features for up-to-date data",
      "Scalable, production-ready architecture"
    ],
    techStack: ["Next.js", "NestJS", "Node.js", "PostgreSQL", "TypeScript"],
    image: "/projects/healthcare/one.png",
    images: [
      "/projects/healthcare/one.png",
      "/projects/healthcare/two.png",
      "/projects/healthcare/three.png",
      "/projects/healthcare/four.png",
      "/projects/healthcare/five.png",
      "/projects/healthcare/six.png"
    ],
    results: [
      "Production-ready platform streamlining clinic operations end to end",
      "Secure, multi-role workflows via role-based access control",
      "Real-time features keeping patient and appointment data current",
      "Scalable architecture ready to grow with medical organizations"
    ]
  },
  {
    id: 7,
    category: "web",
    title: "FirstMovers AI – Learning Management & Community Platform",
    shortDescription: "Full-stack AI-powered LMS with video courses, RAG chatbot, voice AI, Stripe subscriptions, real-time community, and gamification.",
    fullDescription: `**Project Overview:**
A full-stack, AI-powered learning management and community platform combining structured video courses, intelligent AI assistants, payments, real-time community features, and gamification.

🎓 **Course & Learning System**
- Structured course architecture (Courses → Sections → Content)
- Video learning with auto progress tracking & resume playback
- Quizzes, assessments, and completion workflows
- Downloadable certificates (PDF, PNG)

🤖 **AI Integration**
- AI chatbot using RAG (context-aware responses)
- Real-time voice AI assistant
- Automatic video transcription & subtitles
- Personalized learning recommendations

💳 **Payments & Subscriptions**
- Stripe integration for subscriptions & one-time purchases
- Secure webhook handling & coupon support

👥 **Community & Real-Time Features**
- Forums with posts, comments, and reactions
- Real-time chat & notifications (WebSockets)
- Direct messaging system

🧠 **Gamification**
- Points system, badges, leaderboard, and streak tracking`,
    url: "https://labs.firstmovers.ai",
    features: [
      "Structured course architecture (Courses → Sections → Content)",
      "Video learning with auto progress tracking & resume playback",
      "Quizzes, assessments, and completion workflows",
      "Downloadable certificates (PDF, PNG)",
      "AI chatbot using RAG for context-aware responses",
      "Real-time voice AI assistant",
      "Automatic video transcription & subtitles",
      "Personalized learning recommendations",
      "Stripe subscriptions, one-time purchases, webhooks & coupons",
      "Forums with posts, comments, and reactions",
      "Real-time chat, notifications & direct messaging (WebSockets)",
      "Gamification: points, badges, leaderboard & streak tracking"
    ],
    techStack: ["RAG / Vector Embeddings", "Voice AI", "Video Transcription", "Stripe", "WebSockets", "PDF/PNG Certificates"],
    image: "/projects/rndlabs/one.png",
    images: [
      "/projects/rndlabs/one.png",
      "/projects/rndlabs/two.png",
      "/projects/rndlabs/three.png",
      "/projects/rndlabs/four.png",
      "/projects/rndlabs/five.png",
      "/projects/rndlabs/six.png"
    ],
    results: [
      "End-to-end learning platform: courses, video, quizzes, and certificates",
      "AI chatbot (RAG) and real-time voice assistant for context-aware help",
      "Monetization via Stripe subscriptions, one-time purchases, and coupons",
      "Engaged community with forums, real-time chat, DMs, and gamification"
    ]
  },
  {
    id: 8,
    category: "web",
    title: "Ops-One — Facility Operations Management Platform",
    shortDescription: "Internal operations platform unifying procurement, GRN/WCC fulfillment, expense & payment tracking, petty cash, and asset management behind role-based dashboards.",
    fullDescription: `**Project Overview:**
Ops-One is a full-stack operations management platform built to run a facility's back-office end to end: procurement requests, vendor quotations, goods receipt/work completion verification, expenses, petty cash, asset lifecycle, and staff reimbursements — all tied together with building-level scoping and role-based access.

**🛒 Procurement & GRN/WCC**
- Full procurement lifecycle: request → vendor quotations → comparison/recommendation → final approval → PO generation
- GRN/WCC (Goods Receipt / Work Completion Certificate) step between PO and Expense, with inspection, received quantity, remarks, and Verify/Reject actions
- Expenses are only created after GRN/WCC verification, preventing payment on rejected or unverified deliveries

**💵 Expense & Payment**
- Expenses auto-scoped to the requester's building and team ("Charged To"), with override support
- Partial and multiple payments per expense with Unpaid / Partial / Paid status tracking and full payment history
- Receipt requirements configurable per payment method, enforced at submission
- Procurement requests can't be marked Completed until their expense is fully paid

**💰 Petty Cash**
- Procurement Managers assign petty cash to Facility Managers per building, tracking assigned vs. remaining balance
- Expenses draw down the assigned petty cash automatically, reflected live on both manager dashboards

**📦 Asset Management**
- IT Assets and Company Assets with Assigned / Available / Maintenance / My Assets tabs and server-side pagination
- Asset assignment/unassignment, condition tracking, and recurring maintenance schedules configured per sub-category

**📊 Role-Based Dashboards**
- Purpose-built dashboards per role — IT Manager, Facility Manager, Procurement Manager, and DOF — each scoped by building and enforced by RBAC so only relevant cards and data are visible

**🧾 Reimbursements & Activity Feed**
- Employee reimbursement claims with approval workflow and status tracking (Approved / Pending / Rejected)
- Organization-wide activity feed logging key events across procurement, GRN, expenses, and payments

**Skills:** React, TypeScript, Tailwind CSS, .NET / C#, SQL Server, Role-Based Access Control, Workflow/State Machines`,
    url: "#",
    features: [
      "End-to-end procurement workflow: request → quotation → final approval → PO",
      "GRN/WCC fulfillment step with inspection, Verify/Reject, and rejection reasons",
      "Expense creation gated on GRN/WCC verification to prevent paying for rejected deliveries",
      "Partial/multiple payments with Unpaid, Partial, and Paid status tracking",
      "Petty cash assignment and balance tracking per building and Facility Manager",
      "Asset lifecycle management: assignment, condition, and recurring maintenance schedules",
      "Role-specific dashboards with building-level RBAC for IT, Facility, Procurement, and DOF roles",
      "Employee reimbursement claims with approval workflow",
      "Organization-wide activity feed for key operational events"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", ".NET / C#", "SQL Server", "Role-Based Access Control"],
    image: "/projects/ops-one/one.png",
    images: [
      "/projects/ops-one/one.png",
      "/projects/ops-one/two.png",
      "/projects/ops-one/three.png",
      "/projects/ops-one/four.png",
      "/projects/ops-one/five.png",
      "/projects/ops-one/six.png",
      "/projects/ops-one/seven.png"
    ],
    results: [
      "Consolidated procurement, GRN/WCC, and expense workflows into a single auditable pipeline",
      "Petty cash and asset visibility per building for Facility and Procurement Managers",
      "Role-scoped dashboards enforcing RBAC across four distinct operational roles",
      "Reduced manual reconciliation via automated Unpaid/Partial/Paid payment tracking"
    ]
  },
];


export const socialPlatforms=[{icon: Github,name:"GitHub",href:'https://github.com/MuhammadKhan3'}, { icon: Linkedin,name:"LinkedIn",href:"https://www.linkedin.com/in/muhammad-ahmad-khan-fullstackdeveloper/"}]

export const navItems = ["Home", "About", "Skills", "Projects", "Contact"];