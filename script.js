/**
 * BRANDORA — World-Class Branding Studio Platform
 * Architecture: Clean Vanilla JS with LocalStorage Engine, Event Delegation,
 * Offline SVG Rendering, Reactive State Synchronization & Full Accessibility.
 */

(function() {
  'use strict';

  // ==========================================================================
  // 1. DEFAULT SEED DATA
  // ==========================================================================
  const DEFAULT_DATA = {
    auth: {
      isLoggedIn: false,
      user: {
        name: "Elena Vance",
        email: "creative.director@brandora.studio",
        role: "Creative Director",
        avatar: "EV"
      }
    },
    activeBrandId: "brandora",
    brands: {
      brandora: {
        id: "brandora",
        name: "BRANDORA",
        tagline: "Build a Brand People Remember.",
        industry: "Creative Tech & SaaS",
        description: "The global benchmark platform empowering creative studios, venture builders, and agency leaders to architect enduring, category-defining brand identities.",
        audience: "Creative Directors, Venture Capitalists, Brand Strategists, High-Growth Founders",
        personality: "Visionary, Refined, Uncompromising, Bold",
        voice: "Confident, Crisp, Authoritative, Inspiring",
        positioning: "Ultra-Premium Brand Management & Strategic Operating System",
        mission: "To eliminate fragmented branding workflows by equipping creative teams with unified, world-class identity architecture.",
        vision: "A digital landscape where every ambitious company cultivates an iconic, memorable, and ethically grounded brand presence.",
        values: "Precision craftsmanship, radical aesthetic clarity, enduring resonance, and ethical stewardship."
      },
      aura: {
        id: "aura",
        name: "Aura Labs",
        tagline: "Atmospheric Intelligence.",
        industry: "Spatial Computing & AI",
        description: "Developing next-generation ambient spatial audio systems and neural interface displays.",
        audience: "Hardware Enthusiasts, Spatial Audio Engineers, Early Adopters",
        personality: "Futuristic, Ethereal, Sophisticated",
        voice: "Minimal, Scientific, Poetic",
        positioning: "Pioneering sensory computing architecture",
        mission: "Harmonizing digital perceptions with natural human sensory bandwidth.",
        vision: "Seamless ambient intelligence woven into daily physical reality.",
        values: "Sensory elegance, deep scientific rigour, human-centric design."
      },
      velox: {
        id: "velox",
        name: "Velox Studio",
        tagline: "Motion Defined.",
        industry: "Automotive & Industrial Design",
        description: "Luxury aerodynamic styling studio sculpting next-century hypercars and zero-emission transit.",
        audience: "Luxury Collectors, Industrial Innovators, Elite Racing Teams",
        personality: "Aggressive, Hyper-Precise, Aerodynamic",
        voice: "Muscular, Exacting, Dynamic",
        positioning: "Pinnacle velocity design for bespoke mobility",
        mission: "Forging the fastest, most beautiful physical silhouettes on earth.",
        vision: "Zero-friction transportation engineered to exhilarate human emotion.",
        values: "Aerodynamic perfection, uncompromising speed, bespoke carbon craft."
      },
      lumina: {
        id: "lumina",
        name: "Lumina Health",
        tagline: "Precision Longevity for All.",
        industry: "Biotech & Cellular Diagnostics",
        description: "Non-invasive biomarker tracking and personalized longevity interventions powered by synthetic biology.",
        audience: "Biohackers, Preventative Medicine Specialists, Longevity Advocates",
        personality: "Trustworthy, Clean, Compassionate, Clinical",
        voice: "Empathetic, Evidence-Based, Clear",
        positioning: "Accessible predictive longevity diagnostics",
        mission: "Extending healthy human lifespan by transforming reactive sick-care into proactive cellular maintenance.",
        vision: "Universal access to genomic longevity insights.",
        values: "Scientific integrity, radical privacy, patient autonomy."
      }
    },
    identityPillars: [
      { id: "story", title: "Brand Story", desc: "Our origin, defining struggles, and the transformative breakthrough that birthed our relentless ambition." },
      { id: "mission", title: "Mission", desc: "The explicit, high-conviction reason our studio exists in the global marketplace every single day." },
      { id: "vision", title: "Vision", desc: "The north-star future we will manifest over a 10-to-20 year technological and cultural horizon." },
      { id: "values", title: "Core Values", desc: "Non-negotiable ethical anchors and principles that govern hiring, design decisions, and strategic partnerships." },
      { id: "personality", title: "Brand Personality", desc: "The distinct archetypal traits, human attributes, and demeanor manifested in all client engagements." },
      { id: "tone", title: "Tone of Voice", desc: "Verbal nuance, vocabulary rules, syntax discipline, and conversational temperature across touchpoints." },
      { id: "audience", title: "Target Audience", desc: "Deep psychographic, demographic, and behavioral profiles of our primary brand champions and buyers." },
      { id: "positioning", title: "Market Positioning", desc: "The irreplaceable, defensible conceptual territory we own relative to existing legacy competitors." },
      { id: "promise", title: "Brand Promise", desc: "The ironclad guarantee of experience and outcome every client receives without deviation." },
      { id: "usp", title: "Unique Selling Proposition", desc: "The singular unfair competitive advantage that makes choosing our studio the obvious decision." }
    ],
    logos: [
      { id: "logo-1", name: "Geometric Monogram V2", style: "Geometric", favorite: true, symbolType: "monogram", primaryColor: "#FF5E4D", secondaryColor: "#FFA034" },
      { id: "logo-2", name: "Sovereign Emblem", style: "Luxury", favorite: true, symbolType: "emblem", primaryColor: "#E5A93C", secondaryColor: "#171B26" },
      { id: "logo-3", name: "Minimalist Orbit", style: "Minimal", favorite: false, symbolType: "minimal", primaryColor: "#FFFFFF", secondaryColor: "#646777" },
      { id: "logo-4", name: "Cyber Hexa Core", style: "Tech", favorite: false, symbolType: "tech", primaryColor: "#2DD4BF", secondaryColor: "#0F172A" },
      { id: "logo-5", name: "Modernist Wave", style: "Modern", favorite: true, symbolType: "abstract", primaryColor: "#FF5E4D", secondaryColor: "#A78BFA" },
      { id: "logo-6", name: "Creative Prism", style: "Creative", favorite: false, symbolType: "creative", primaryColor: "#F43F5E", secondaryColor: "#F59E0B" },
      { id: "logo-7", name: "Vanguard Typography", style: "Modern", favorite: false, symbolType: "typography", primaryColor: "#F4F4F6", secondaryColor: "#3B82F6" },
      { id: "logo-8", name: "Aero Bold Shield", style: "Bold", favorite: false, symbolType: "emblem", primaryColor: "#FFA034", secondaryColor: "#111827" }
    ],
    colorPresets: {
      Luxury: { primary: "#FF5E4D", secondary: "#FFA034", accent: "#E5A93C", background: "#0B0C10", surface: "#161922", text: "#F4F4F6" },
      Minimal: { primary: "#FFFFFF", secondary: "#A0A0A5", accent: "#52525B", background: "#09090B", surface: "#18181B", text: "#FAFAFA" },
      Creative: { primary: "#EC4899", secondary: "#8B5CF6", accent: "#06B6D4", background: "#0F172A", surface: "#1E293B", text: "#F8FAFC" },
      Corporate: { primary: "#2563EB", secondary: "#3B82F6", accent: "#60A5FA", background: "#0B132B", surface: "#1C2541", text: "#FFFFFF" },
      Tech: { primary: "#10B981", secondary: "#059669", accent: "#34D399", background: "#051614", surface: "#0B2924", text: "#ECFDF5" },
      Editorial: { primary: "#E2E8F0", secondary: "#94A3B8", accent: "#D97706", background: "#111111", surface: "#1E1E1E", text: "#FDFDFD" },
      Bold: { primary: "#F97316", secondary: "#EF4444", accent: "#FBBF24", background: "#18110B", surface: "#291A10", text: "#FFF7ED" }
    },
    activePalette: {
      primary: { role: "Primary", hex: "#FF5E4D", locked: true },
      secondary: { role: "Secondary", hex: "#FFA034", locked: false },
      accent: { role: "Accent", hex: "#E5A93C", locked: false },
      background: { role: "Background", hex: "#0B0C10", locked: true },
      surface: { role: "Surface", hex: "#161922", locked: false },
      text: { role: "Text", hex: "#F4F4F6", locked: true }
    },
    typography: {
      headingFont: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      bodyFont: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      accentFont: "Georgia, serif",
      h1Size: 48,
      bodySize: 16,
      letterSpacing: -0.5
    },
    moodboard: [
      { id: "m-1", type: "quote", title: "Dieter Rams Ethos", quote: "Good design is as little design as possible. Less, but better.", author: "Dieter Rams", category: "Philosophy", favorite: true },
      { id: "m-2", type: "swatch", title: "Midnight Coral Glow", color: "#FF5E4D", category: "Colorway", favorite: true },
      { id: "m-3", type: "pattern", title: "Dynamic Kinetic Grid", pattern: "mesh", category: "Texture", favorite: false },
      { id: "m-4", type: "quote", title: "Massimo Vignelli", quote: "Styles come and go. Good design is a language, not a style.", author: "Massimo Vignelli", category: "Philosophy", favorite: false },
      { id: "m-5", type: "swatch", title: "Warm Amber Luminescence", color: "#FFA034", category: "Colorway", favorite: true },
      { id: "m-6", type: "pattern", title: "Monochrome Ray Geometry", pattern: "radial", category: "Form", favorite: false },
      { id: "m-7", type: "quote", title: "Paul Rand Maxim", quote: "Design is the silent ambassador of your brand.", author: "Paul Rand", category: "Brand Truth", favorite: true },
      { id: "m-8", type: "swatch", title: "Deep Obsidian Surface", color: "#161922", category: "Surface", favorite: false }
    ],
    assets: [
      { id: "ast-1", name: "Brandora_Master_Mark.svg", type: "Logos", version: "v2.4", status: "Verified", updated: "2 hours ago", owner: "Elena Vance", size: "142 KB" },
      { id: "ast-2", name: "Social_Banner_Suite_2026.zip", type: "Social Media", version: "v1.8", status: "Approved", updated: "Yesterday", owner: "Marcus Chen", size: "8.4 MB" },
      { id: "ast-3", name: "Executive_Stationery_Pack.pdf", type: "Business Cards", version: "v3.0", status: "Ready", updated: "3 days ago", owner: "Sophia Rossi", size: "3.2 MB" },
      { id: "ast-4", name: "Keynote_Investor_Deck.key", type: "Presentations", version: "v4.1", status: "Approved", updated: "Sep 8, 2026", owner: "Liam Vance", size: "24.6 MB" },
      { id: "ast-5", name: "Luxury_Packaging_Emboss_Spec.ai", type: "Packaging", version: "v1.2", status: "In Review", updated: "Sep 5, 2026", owner: "Priya Patel", size: "16.8 MB" },
      { id: "ast-6", name: "Billboard_Campaign_Hero_4K.psd", type: "Ads", version: "v2.0", status: "Approved", updated: "Sep 3, 2026", owner: "David Kim", size: "88.2 MB" },
      { id: "ast-7", name: "Studio_Design_System_Tokens.json", type: "Website", version: "v5.0", status: "Live", updated: "Aug 30, 2026", owner: "Maya Lin", size: "48 KB" },
      { id: "ast-8", name: "Brand_Identity_Guidelines_Manual.pdf", type: "Print", version: "v2.6", status: "Verified", updated: "Aug 28, 2026", owner: "Elena Vance", size: "12.4 MB" },
      { id: "ast-9", name: "Custom_Iconography_Vector_Grid.svg", type: "Logos", version: "v1.5", status: "Approved", updated: "Aug 25, 2026", owner: "Sophia Rossi", size: "220 KB" }
    ],
    projects: [
      { id: "prj-1", title: "Brand Identity 2026", client: "Brandora Core", deadline: "Sep 28, 2026", team: "Elena, Marcus", status: "In Progress", progress: 75, budget: "$45,000" },
      { id: "prj-2", title: "Nova Launch Campaign", client: "Aura Labs", deadline: "Oct 15, 2026", team: "Priya, David", status: "Planning", progress: 30, budget: "$62,000" },
      { id: "prj-3", title: "Global Social Rebrand", client: "Velox Studio", deadline: "Nov 02, 2026", team: "Sophia, Liam", status: "Review", progress: 90, budget: "$38,500" },
      { id: "prj-4", title: "Website Design System", client: "Lumina Health", deadline: "Oct 30, 2026", team: "Maya, Elena", status: "In Progress", progress: 60, budget: "$54,000" },
      { id: "prj-5", title: "Luxury Packaging System", client: "Velvet & Oak", deadline: "Dec 10, 2026", team: "Marcus, Priya", status: "Planning", progress: 15, budget: "$72,000" }
    ],
    content: [
      { id: "cnt-1", title: "Behind the Grid: The Mathematics of Brand Marks", platform: "LinkedIn", status: "Scheduled", author: "Elena Vance", publishDate: "Sep 15, 2026", campaign: "Thought Leadership" },
      { id: "cnt-2", title: "Visual Identity Teaser Reel: Midnight Coral", platform: "Instagram", status: "Published", author: "Marcus Chen", publishDate: "Sep 10, 2026", campaign: "Identity Launch" },
      { id: "cnt-3", title: "Why Micro-Interactions Define Modern Luxury", platform: "Website", status: "Review", author: "Sophia Rossi", publishDate: "Sep 22, 2026", campaign: "Design Journal" },
      { id: "cnt-4", title: "Motion Reel: The Kinetic Evolution of BRANDORA", platform: "TikTok", status: "Scheduled", author: "David Kim", publishDate: "Sep 18, 2026", campaign: "Viral Brand Discovery" },
      { id: "cnt-5", title: "Global Agency Showcase Ad: Build A Brand People Remember", platform: "Advertisement", status: "Published", author: "Liam Vance", publishDate: "Sep 05, 2026", campaign: "Q3 Acquisition" },
      { id: "cnt-6", title: "Spatial Audio Brand Guidelines for Tech Ventures", platform: "LinkedIn", status: "Draft", author: "Priya Patel", publishDate: "Sep 29, 2026", campaign: "Tech Innovation" }
    ],
    clients: [
      { id: "cl-1", company: "Lumina Health Inc.", contact: "Dr. Sarah Al-Mansoor", industry: "Biotech & Diagnostics", projects: 4, score: 96, status: "Active", manager: "Elena Vance" },
      { id: "cl-2", company: "Apex Robotics Corp.", contact: "Hiroshi Tanaka", industry: "Autonomous Systems", projects: 3, score: 92, status: "Active", manager: "Marcus Chen" },
      { id: "cl-3", company: "Velvet & Oak Fragrance", contact: "Camille Dupont", industry: "Haute Parfumerie", projects: 2, score: 98, status: "Active", manager: "Sophia Rossi" },
      { id: "cl-4", company: "Horizon Mobility Global", contact: "Tobias Lindqvist", industry: "Electric Aviation", projects: 5, score: 90, status: "In Review", manager: "David Kim" },
      { id: "cl-5", company: "Solaria Clean Energy", contact: "Kavita Rao", industry: "Renewable Infrastructure", projects: 2, score: 88, status: "Active", manager: "Liam Vance" },
      { id: "cl-6", company: "Omni Ventures Partners", contact: "Alexander Sterling", industry: "Venture Capital", projects: 6, score: 95, status: "Active", manager: "Elena Vance" }
    ],
    team: [
      { id: "tm-1", name: "Elena Vance", role: "Creative Director", projects: 6, tasks: 4, performance: "99%", availability: "Active Studio" },
      { id: "tm-2", name: "Marcus Chen", role: "Brand Strategist", projects: 5, tasks: 3, performance: "97%", availability: "In Client Meeting" },
      { id: "tm-3", name: "Sophia Rossi", role: "UI / Design Architect", projects: 4, tasks: 5, performance: "95%", availability: "Active Studio" },
      { id: "tm-4", name: "Liam Vance", role: "Copywriter & Tone Architect", projects: 3, tasks: 2, performance: "94%", availability: "Deep Work" },
      { id: "tm-5", name: "Priya Patel", role: "Graphic Designer", projects: 4, tasks: 4, performance: "98%", availability: "Active Studio" },
      { id: "tm-6", name: "David Kim", role: "Marketing Manager", projects: 3, tasks: 3, performance: "92%", availability: "Active Studio" },
      { id: "tm-7", name: "Maya Lin", role: "Social Media Manager", projects: 4, tasks: 2, performance: "96%", availability: "Active Studio" }
    ],
    tasks: [
      { id: "tsk-1", title: "Finalize SVG vector clearspace parameters for master logo", priority: "Urgent", dueDate: "Tomorrow, 4:00 PM", member: "Sophia Rossi", completed: false },
      { id: "tsk-2", title: "Generate WCAG AAA accessibility report for coral color token", priority: "High", dueDate: "Sep 14, 2026", member: "Marcus Chen", completed: false },
      { id: "tsk-3", title: "Deliver packaging foil stamp dies to Zurich print partner", priority: "High", dueDate: "Sep 16, 2026", member: "Priya Patel", completed: false },
      { id: "tsk-4", title: "Proofread brand manifesto booklet text copy", priority: "Medium", dueDate: "Sep 18, 2026", member: "Liam Vance", completed: true },
      { id: "tsk-5", title: "Render 3D isometric mockup of new stationery set", priority: "Medium", dueDate: "Sep 20, 2026", member: "David Kim", completed: false }
    ],
    calendarEvents: [
      { id: "ev-1", title: "Brand Identity Review with Lumina C-Suite", date: "2026-09-14", time: "10:00 AM", type: "Client Meeting" },
      { id: "ev-2", title: "Apex Robotics Logo Concept Deck Reveal", date: "2026-09-16", time: "2:30 PM", type: "Logo Presentation" },
      { id: "ev-3", title: "Global Social Rebrand Campaign Launch", date: "2026-09-20", time: "9:00 AM", type: "Campaign Launch" },
      { id: "ev-4", title: "Bi-Weekly Studio Design Critique & Coffee", date: "2026-09-23", time: "11:00 AM", type: "Design Review" },
      { id: "ev-5", title: "Content Deadline: Thought Leadership Article", date: "2026-09-27", time: "5:00 PM", type: "Content Deadline" },
      { id: "ev-6", title: "Quarterly Brand Consistency & Health Audit", date: "2026-09-30", time: "3:00 PM", type: "Brand Review" }
    ],
    notifications: [
      { id: "nt-1", title: "New Enterprise Client Added", desc: "Omni Ventures has finalized the onboarding agreement.", time: "12 mins ago", read: false },
      { id: "nt-2", title: "Brand Consistency Score Climbed to 94%", desc: "Cross-channel audit confirms peak harmony across assets.", time: "45 mins ago", read: false },
      { id: "nt-3", title: "Milestone Approaching", desc: "Brand Identity 2026 sprint review in 48 hours.", time: "3 hours ago", read: false },
      { id: "nt-4", title: "New Asset Uploaded", desc: "Priya added Luxury_Packaging_Emboss_Spec.ai (v1.2).", time: "Yesterday", read: true },
      { id: "nt-5", title: "Feedback Received on Logo Lab", desc: "Camille Dupont loved Sovereign Emblem mark concept.", time: "2 days ago", read: true }
    ],
    chatThreads: [
      {
        id: "th-1",
        name: "Marcus Chen",
        role: "Brand Strategist",
        avatar: "MC",
        unread: 1,
        time: "Just now",
        messages: [
          { sender: "Marcus", text: "Elena, I just ran the contrast ratios for our electric coral on dark glass surfaces.", time: "10:24 AM", outgoing: false },
          { sender: "Elena", text: "Brilliant. How is the perceptual legibility looking on OLED mobile displays?", time: "10:26 AM", outgoing: true },
          { sender: "Marcus", text: "Flawless. Scoring 7.8:1 contrast ratio, surpassing AAA standards for all heading scales!", time: "10:28 AM", outgoing: false }
        ]
      },
      {
        id: "th-2",
        name: "Sophia Rossi",
        role: "Design Architect",
        avatar: "SR",
        unread: 0,
        time: "1 hour ago",
        messages: [
          { sender: "Sophia", text: "Geometric Monogram V2 exported with pure inline SVGs. Ready for deployment.", time: "9:15 AM", outgoing: false },
          { sender: "Elena", text: "Outstanding work, Sophia. Added straight to the master assets repository.", time: "9:30 AM", outgoing: true }
        ]
      },
      {
        id: "th-3",
        name: "Priya Patel",
        role: "Graphic Designer",
        avatar: "PP",
        unread: 0,
        time: "Yesterday",
        messages: [
          { sender: "Priya", text: "Switzerland packaging team confirmed sample dies for the velvet foil box.", time: "Yesterday", outgoing: false },
          { sender: "Elena", text: "Make sure they test the deboss depth at 0.8mm for high tactile elegance.", time: "Yesterday", outgoing: true }
        ]
      }
    ],
    reports: [
      { id: "rep-1", title: "Brand Health & Vitality Audit 2026", type: "Brand Health Report", date: "Sep 11, 2026", pages: "18 Pages", score: "96 / 100" },
      { id: "rep-2", title: "Comprehensive Identity Specification Brief", type: "Identity Report", date: "Sep 04, 2026", pages: "32 Pages", score: "Verified" },
      { id: "rep-3", title: "Q3 Omnichannel Campaign Performance", type: "Campaign Report", date: "Aug 30, 2026", pages: "14 Pages", score: "+28% ROI" },
      { id: "rep-4", title: "Enterprise Client Satisfaction Index", type: "Client Report", date: "Aug 22, 2026", pages: "12 Pages", score: "NPS +76" },
      { id: "rep-5", title: "Creative Velocity & Sprint Output Matrix", type: "Creative Performance", date: "Aug 15, 2026", pages: "9 Pages", score: "99.2%" },
      { id: "rep-6", title: "Global Brand Consistency & Alignment Dossier", type: "Brand Consistency Report", date: "Aug 10, 2026", pages: "24 Pages", score: "94% Peak" }
    ],
    settings: {
      glow: true,
      compact: false,
      animations: true,
      notifications: true
    }
  };

  // ==========================================================================
  // 2. CORE APPLICATION STATE CONTROLLER
  // ==========================================================================
  class BrandoraEngine {
    constructor() {
      this.STORAGE_KEY = "BRANDORA_STUDIO_STORAGE_v2";
      this.state = this.loadState();
      this.currentView = "overview";
      this.calendarYear = 2026;
      this.calendarMonth = 8; // September (0-indexed)
      this.activeChatThreadId = "th-1";
      this.analyticsTimeframe = "30d";
    }

    loadState() {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (err) {
        console.warn("LocalStorage unavailable, falling back to memory.", err);
      }
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }

    saveState() {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
      } catch (err) {
        console.warn("Failed saving to LocalStorage", err);
      }
    }

    init() {
      this.setupEventListeners();
      this.applySavedSettings();
      this.checkAuthStatus();
      this.renderAllViews();
    }

    // ==========================================================================
    // 3. AUTHENTICATION & DEMO WORKSPACE
    // ==========================================================================
    checkAuthStatus() {
      const authScreen = document.getElementById("auth-screen");
      const appShell = document.getElementById("app-shell");

      if (this.state.auth.isLoggedIn) {
        authScreen.classList.add("hidden");
        appShell.classList.remove("hidden");
      } else {
        authScreen.classList.remove("hidden");
        appShell.classList.add("hidden");
      }
    }

    handleLogin() {
      const emailInput = document.getElementById("login-email");
      const email = emailInput ? emailInput.value.trim() : "creative.director@brandora.studio";
      
      this.state.auth.isLoggedIn = true;
      this.state.auth.user.email = email;
      this.saveState();
      
      this.showToast("Signed in successfully to BRANDORA Studio", "success");
      this.checkAuthStatus();
      this.renderAllViews();
    }

    enterDemoWorkspace() {
      this.state.auth.isLoggedIn = true;
      this.saveState();
      this.showToast("Instant Demo Access Activated &bull; Welcome, Director", "success");
      this.checkAuthStatus();
      this.renderAllViews();
    }

    handleLogout() {
      this.state.auth.isLoggedIn = false;
      this.saveState();
      this.closeDropdowns();
      this.checkAuthStatus();
      this.showToast("Logged out of studio session", "info");
    }

    showForgotPasswordModal() {
      this.openModal("Password Recovery", `
        <p class="text-dim mb-16">Enter your registered email address to receive secure workspace reset instructions.</p>
        <div class="form-group">
          <label class="form-label">Work Email</label>
          <input type="email" id="reset-email-input" class="form-input" value="creative.director@brandora.studio" required>
        </div>
        <div class="modal-footer-actions mt-16 text-right">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
          <button type="button" class="btn btn-primary btn-sm btn-glow" onclick="window.BrandoraApp.sendPasswordReset()">Send Reset Link</button>
        </div>
      `);
    }

    sendPasswordReset() {
      this.closeModal();
      this.showToast("Recovery email dispatched with cryptographic token", "success");
    }

    // ==========================================================================
    // 4. ROUTING & NAVIGATION
    // ==========================================================================
    navigateTo(viewName) {
      if (!viewName) return;
      this.currentView = viewName;
      
      // Update sidebar active buttons
      const navButtons = document.querySelectorAll(".sidebar-nav .nav-item");
      navButtons.forEach(btn => {
        if (btn.getAttribute("data-view") === viewName) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      // Update views visibility
      const views = document.querySelectorAll(".studio-view");
      views.forEach(v => {
        if (v.id === `view-${viewName}`) {
          v.classList.add("active");
        } else {
          v.classList.remove("active");
        }
      });

      // Close mobile navigation drawer if open
      const sidebar = document.getElementById("sidebar");
      if (sidebar) sidebar.classList.remove("mobile-open");

      // Auto scroll viewport to top
      const viewport = document.getElementById("main-view-container");
      if (viewport) viewport.scrollTop = 0;
      window.scrollTo(0, 0);

      // Re-trigger view-specific renders if necessary
      if (viewName === "analytics") {
        this.renderAnalyticsCharts();
      } else if (viewName === "calendar") {
        this.renderCalendar();
      }
    }

    // ==========================================================================
    // 5. BRAND WORKSPACE & SWITCHER
    // ==========================================================================
    switchBrand(brandId) {
      if (!this.state.brands[brandId]) return;
      this.state.activeBrandId = brandId;
      this.saveState();

      const activeBrand = this.state.brands[brandId];
      this.showToast(`Switched active workspace to ${activeBrand.name}`, "info");
      this.renderOverview();
      this.renderBrandWorkspace();
      this.updateSidebarBrandSelect();
    }

    updateSidebarBrandSelect() {
      const select = document.getElementById("active-brand-select");
      if (select) select.value = this.state.activeBrandId;
    }

    renderBrandWorkspace() {
      const b = this.state.brands[this.state.activeBrandId] || this.state.brands.brandora;
      
      const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || "";
      };
      const setText = (id, txt) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt || "";
      };

      setText("ws-avatar-initials", b.name.substring(0, 2).toUpperCase());
      setText("ws-header-brand-name", b.name);
      setText("ws-header-tagline", `"${b.tagline}"`);
      setText("ws-tag-industry", b.industry);
      
      setVal("ws-input-name", b.name);
      setVal("ws-input-tagline", b.tagline);
      setVal("ws-input-industry", b.industry);
      setVal("ws-input-desc", b.description);
      setVal("ws-input-audience", b.audience);
      setVal("ws-input-personality", b.personality);
      setVal("ws-input-voice", b.voice);
      setVal("ws-input-positioning", b.positioning);
      setVal("ws-input-mission", b.mission);
      setVal("ws-input-vision", b.vision);
      setVal("ws-input-values", b.values);

      // Also update overview quick stats
      setText("active-brand-banner-title", b.name);
      setText("ov-attr-industry", b.industry);
      setText("ov-attr-personality", b.personality);
      setText("ov-attr-voice", b.voice);
    }

    saveBrandWorkspace() {
      const getVal = (id) => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };

      const b = this.state.brands[this.state.activeBrandId];
      if (!b) return;

      b.name = getVal("ws-input-name") || b.name;
      b.tagline = getVal("ws-input-tagline") || b.tagline;
      b.industry = getVal("ws-input-industry") || b.industry;
      b.description = getVal("ws-input-desc") || b.description;
      b.audience = getVal("ws-input-audience") || b.audience;
      b.personality = getVal("ws-input-personality") || b.personality;
      b.voice = getVal("ws-input-voice") || b.voice;
      b.positioning = getVal("ws-input-positioning") || b.positioning;
      b.mission = getVal("ws-input-mission") || b.mission;
      b.vision = getVal("ws-input-vision") || b.vision;
      b.values = getVal("ws-input-values") || b.values;

      this.saveState();
      this.renderBrandWorkspace();
      this.renderOverview();
      this.showToast("Brand workspace synchronized and saved to LocalStorage", "success");
    }

    resetBrandWorkspace() {
      const defaultBrand = DEFAULT_DATA.brands[this.state.activeBrandId];
      if (defaultBrand) {
        this.state.brands[this.state.activeBrandId] = JSON.parse(JSON.stringify(defaultBrand));
        this.saveState();
        this.renderBrandWorkspace();
        this.showToast("Brand workspace reset to baseline defaults", "info");
      }
    }

    // ==========================================================================
    // 6. BRAND IDENTITY BUILDER (10 PILLARS)
    // ==========================================================================
    renderIdentityPillars() {
      const container = document.getElementById("identity-pillars-grid");
      if (!container) return;

      const activeB = this.state.brands[this.state.activeBrandId];

      const pillarFieldMap = {
        story: { label: "Brand Story", value: activeB.description },
        mission: { label: "Mission Statement", value: activeB.mission },
        vision: { label: "Vision Horizon", value: activeB.vision },
        values: { label: "Core Values", value: activeB.values },
        personality: { label: "Personality Traits", value: activeB.personality },
        tone: { label: "Tone of Voice", value: activeB.voice },
        audience: { label: "Target Audience", value: activeB.audience },
        positioning: { label: "Strategic Positioning", value: activeB.positioning },
        promise: { label: "The Brand Promise", value: `We guarantee that every client interaction manifests uncompromising precision, enduring elegance, and unforgettable resonance.` },
        usp: { label: "Unique Selling Proposition", value: `The only unified brand intelligence system that converges editorial aesthetics with rigorous enterprise design tokens.` }
      };

      container.innerHTML = this.state.identityPillars.map((p, idx) => {
        const fieldData = pillarFieldMap[p.id] || { label: p.title, value: p.desc };
        const numStr = String(idx + 1).padStart(2, "0");

        return `
          <div class="identity-card" id="id-card-${p.id}">
            <div class="id-card-top">
              <span class="id-card-num">PILLAR // ${numStr}</span>
              <span class="badge-subtle">Core DNA</span>
            </div>
            <h3 class="id-card-title">${p.title}</h3>
            
            <div id="id-view-${p.id}">
              <p class="id-card-body-text" id="id-text-${p.id}">${fieldData.value}</p>
            </div>
            <div id="id-edit-${p.id}" class="hidden">
              <textarea class="form-textarea id-card-textarea" id="id-input-${p.id}">${fieldData.value}</textarea>
            </div>

            <div class="id-card-actions">
              <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.copyPillarText('${p.id}')" title="Copy Text">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon-xs">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy</span>
              </button>
              <button type="button" class="btn btn-secondary btn-xs" id="btn-edit-${p.id}" onclick="window.BrandoraApp.togglePillarEdit('${p.id}', true)">Edit</button>
              <button type="button" class="btn btn-secondary btn-xs hidden" id="btn-cancel-${p.id}" onclick="window.BrandoraApp.togglePillarEdit('${p.id}', false)">Cancel</button>
              <button type="button" class="btn btn-primary btn-xs hidden" id="btn-save-${p.id}" onclick="window.BrandoraApp.savePillar('${p.id}')">Save</button>
            </div>
          </div>
        `;
      }).join("");
    }

    togglePillarEdit(pillarId, isEditing) {
      const viewEl = document.getElementById(`id-view-${pillarId}`);
      const editEl = document.getElementById(`id-edit-${pillarId}`);
      const btnEdit = document.getElementById(`btn-edit-${pillarId}`);
      const btnCancel = document.getElementById(`btn-cancel-${pillarId}`);
      const btnSave = document.getElementById(`btn-save-${pillarId}`);

      if (isEditing) {
        viewEl.classList.add("hidden");
        editEl.classList.remove("hidden");
        btnEdit.classList.add("hidden");
        btnCancel.classList.remove("hidden");
        btnSave.classList.remove("hidden");
      } else {
        viewEl.classList.remove("hidden");
        editEl.classList.add("hidden");
        btnEdit.classList.remove("hidden");
        btnCancel.classList.add("hidden");
        btnSave.classList.add("hidden");
      }
    }

    savePillar(pillarId) {
      const input = document.getElementById(`id-input-${pillarId}`);
      const textEl = document.getElementById(`id-text-${pillarId}`);
      if (!input || !textEl) return;

      const newText = input.value.trim();
      textEl.textContent = newText;
      this.togglePillarEdit(pillarId, false);

      // Save to active brand
      const b = this.state.brands[this.state.activeBrandId];
      if (pillarId === "story") b.description = newText;
      if (pillarId === "mission") b.mission = newText;
      if (pillarId === "vision") b.vision = newText;
      if (pillarId === "values") b.values = newText;
      if (pillarId === "personality") b.personality = newText;
      if (pillarId === "tone") b.voice = newText;
      if (pillarId === "audience") b.audience = newText;
      if (pillarId === "positioning") b.positioning = newText;

      this.saveState();
      this.renderBrandWorkspace();
      this.showToast(`Pillar '${pillarId.toUpperCase()}' saved successfully`, "success");
    }

    copyPillarText(pillarId) {
      const textEl = document.getElementById(`id-text-${pillarId}`);
      if (!textEl) return;
      this.copyToClipboard(textEl.textContent, "Pillar text copied to clipboard");
    }

    expandAllIdentityCards() {
      this.state.identityPillars.forEach(p => this.togglePillarEdit(p.id, true));
    }

    saveAllIdentityCards() {
      this.state.identityPillars.forEach(p => {
        const input = document.getElementById(`id-input-${p.id}`);
        if (input) this.savePillar(p.id);
      });
      this.showToast("All 10 Identity Pillars preserved to LocalStorage", "success");
    }

    // ==========================================================================
    // 7. LOGO LAB (CONCEPT GENERATOR & CURATOR)
    // ==========================================================================
    generateLogoSvg(symbolType, primaryColor, secondaryColor, logoName) {
      switch (symbolType) {
        case "monogram":
          return `
            <svg viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" rx="24" fill="${secondaryColor}" fill-opacity="0.15" stroke="${primaryColor}" stroke-width="2"/>
              <path d="M30 75V25L50 48L70 25V75M50 48V75" stroke="${primaryColor}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
        case "emblem":
          return `
            <svg viewBox="0 0 100 100" fill="none">
              <polygon points="50,12 88,32 88,68 50,88 12,68 12,32" stroke="${primaryColor}" stroke-width="4" fill="${secondaryColor}" fill-opacity="0.2"/>
              <circle cx="50" cy="50" r="18" stroke="${primaryColor}" stroke-width="3"/>
              <circle cx="50" cy="50" r="6" fill="${primaryColor}"/>
            </svg>
          `;
        case "minimal":
          return `
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="32" stroke="${primaryColor}" stroke-width="4"/>
              <circle cx="68" cy="32" r="8" fill="${secondaryColor}"/>
            </svg>
          `;
        case "tech":
          return `
            <svg viewBox="0 0 100 100" fill="none">
              <polygon points="50,15 82,33 82,67 50,85 18,67 18,33" stroke="${primaryColor}" stroke-width="3" fill="none"/>
              <line x1="50" y1="15" x2="50" y2="85" stroke="${secondaryColor}" stroke-width="2"/>
              <line x1="18" y1="33" x2="82" y2="67" stroke="${secondaryColor}" stroke-width="2"/>
              <line x1="18" y1="67" x2="82" y2="33" stroke="${secondaryColor}" stroke-width="2"/>
            </svg>
          `;
        case "abstract":
          return `
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M20,60 C35,20 65,80 80,40" stroke="${primaryColor}" stroke-width="6" stroke-linecap="round"/>
              <path d="M20,40 C35,80 65,20 80,60" stroke="${secondaryColor}" stroke-width="4" stroke-linecap="round" stroke-dasharray="4 4"/>
            </svg>
          `;
        case "creative":
          return `
            <svg viewBox="0 0 100 100" fill="none">
              <rect x="25" y="25" width="50" height="50" rx="12" transform="rotate(45 50 50)" fill="${primaryColor}" fill-opacity="0.3" stroke="${primaryColor}" stroke-width="3"/>
              <circle cx="50" cy="50" r="12" fill="${secondaryColor}"/>
            </svg>
          `;
        case "typography":
          return `
            <svg viewBox="0 0 100 100" fill="none">
              <text x="50%" y="58%" text-anchor="middle" font-family="sans-serif" font-size="34" font-weight="900" fill="${primaryColor}" letter-spacing="2">BND</text>
              <line x1="25" y1="72" x2="75" y2="72" stroke="${secondaryColor}" stroke-width="3"/>
            </svg>
          `;
        default:
          return `
            <svg viewBox="0 0 100 100" fill="none">
              <polygon points="50,15 85,80 15,80" stroke="${primaryColor}" stroke-width="4" fill="none"/>
              <circle cx="50" cy="55" r="10" fill="${secondaryColor}"/>
            </svg>
          `;
      }
    }

    renderLogos(filter = "all") {
      const container = document.getElementById("logo-concepts-grid");
      if (!container) return;

      let list = this.state.logos;
      if (filter === "favorites") {
        list = list.filter(l => l.favorite);
      } else if (filter !== "all") {
        list = list.filter(l => l.style.toLowerCase() === filter.toLowerCase());
      }

      const totalCount = document.getElementById("count-logo-all");
      if (totalCount) totalCount.textContent = this.state.logos.length;

      const badgeCount = document.getElementById("badge-logos-count");
      if (badgeCount) badgeCount.textContent = this.state.logos.length;

      container.innerHTML = list.map(logo => {
        const svgCode = this.generateLogoSvg(logo.symbolType, logo.primaryColor, logo.secondaryColor, logo.name);
        return `
          <div class="logo-card">
            <div class="logo-preview-canvas">
              ${svgCode}
              <button type="button" class="logo-fav-btn ${logo.favorite ? 'is-favorite' : ''}" onclick="window.BrandoraApp.toggleLogoFavorite('${logo.id}')" title="Favorite Concept">
                <svg viewBox="0 0 24 24" fill="${logo.favorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </button>
            </div>
            <div class="logo-card-info">
              <div class="logo-card-head">
                <span class="logo-name">${logo.name}</span>
                <span class="logo-style-pill">${logo.style}</span>
              </div>
              <div class="logo-card-actions">
                <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.previewLogo('${logo.id}')">Preview</button>
                <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.duplicateLogo('${logo.id}')">Duplicate</button>
                <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.downloadLogoSvg('${logo.id}')">Download</button>
                <button type="button" class="btn btn-danger-outline btn-xs" onclick="window.BrandoraApp.deleteLogo('${logo.id}')">Delete</button>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }

    filterLogos(style, btnEl) {
      if (btnEl) {
        document.querySelectorAll("[data-style-filter]").forEach(b => b.classList.remove("active"));
        btnEl.classList.add("active");
      }
      this.renderLogos(style);
    }

    toggleLogoFavorite(logoId) {
      const logo = this.state.logos.find(l => l.id === logoId);
      if (logo) {
        logo.favorite = !logo.favorite;
        this.saveState();
        this.renderLogos();
        this.showToast(`${logo.name} ${logo.favorite ? 'marked as favorite' : 'removed from favorites'}`, "info");
      }
    }

    duplicateLogo(logoId) {
      const original = this.state.logos.find(l => l.id === logoId);
      if (!original) return;

      const copy = {
        ...original,
        id: `logo-${Date.now()}`,
        name: `${original.name} (Copy)`,
        favorite: false
      };
      this.state.logos.unshift(copy);
      this.saveState();
      this.renderLogos();
      this.showToast(`Duplicated ${copy.name}`, "success");
    }

    deleteLogo(logoId) {
      this.openModal("Confirm Logo Deletion", `
        <p class="text-dim mb-16">Are you sure you wish to delete this vector logo concept from the studio vault?</p>
        <div class="modal-footer-actions text-right">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
          <button type="button" class="btn btn-danger-outline btn-sm" onclick="window.BrandoraApp.confirmDeleteLogo('${logoId}')">Confirm Delete</button>
        </div>
      `);
    }

    confirmDeleteLogo(logoId) {
      this.state.logos = this.state.logos.filter(l => l.id !== logoId);
      this.saveState();
      this.closeModal();
      this.renderLogos();
      this.showToast("Logo concept deleted", "info");
    }

    previewLogo(logoId) {
      const logo = this.state.logos.find(l => l.id === logoId);
      if (!logo) return;
      const svgCode = this.generateLogoSvg(logo.symbolType, logo.primaryColor, logo.secondaryColor, logo.name);

      this.openModal(`Vector Inspection: ${logo.name}`, `
        <div style="background: #0B0C10; padding: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 20px;">
          <div style="width: 180px; height: 180px;">${svgCode}</div>
        </div>
        <div class="brand-key-attributes mb-16">
          <div class="attr-pill"><span class="attr-title">Style</span><span class="attr-val">${logo.style}</span></div>
          <div class="attr-pill"><span class="attr-title">Primary Hex</span><span class="attr-val">${logo.primaryColor}</span></div>
          <div class="attr-pill"><span class="attr-title">Secondary Hex</span><span class="attr-val">${logo.secondaryColor}</span></div>
        </div>
        <div class="text-right">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Close</button>
          <button type="button" class="btn btn-primary btn-sm btn-glow" onclick="window.BrandoraApp.downloadLogoSvg('${logo.id}')">Download SVG</button>
        </div>
      `);
    }

    downloadLogoSvg(logoId) {
      const logo = this.state.logos.find(l => l.id === logoId);
      if (!logo) return;
      const svgCode = this.generateLogoSvg(logo.symbolType, logo.primaryColor, logo.secondaryColor, logo.name);
      
      const blob = new Blob([svgCode], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${logo.name.replace(/\s+/g, '_').toLowerCase()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.showToast(`Downloaded vector SVG for ${logo.name}`, "success");
    }

    openNewLogoModal() {
      this.openModal("Create Brand Logo Concept", `
        <form onsubmit="event.preventDefault(); window.BrandoraApp.createNewLogo();">
          <div class="form-group">
            <label class="form-label">Concept Name</label>
            <input type="text" id="new-logo-name" class="form-input" placeholder="e.g. Apex Vanguard Crest" required>
          </div>
          <div class="form-group">
            <label class="form-label">Design Style</label>
            <select id="new-logo-style" class="form-input">
              <option value="Minimal">Minimal</option>
              <option value="Luxury">Luxury</option>
              <option value="Modern">Modern</option>
              <option value="Geometric">Geometric</option>
              <option value="Tech">Tech</option>
              <option value="Creative">Creative</option>
              <option value="Bold">Bold</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Symbol Archetype</label>
            <select id="new-logo-symbol" class="form-input">
              <option value="monogram">Monogram / Lettermark</option>
              <option value="emblem">Geometric Emblem</option>
              <option value="minimal">Minimalist Orbit</option>
              <option value="tech">Tech Hexagon Lattice</option>
              <option value="abstract">Dynamic Wave / Ribbon</option>
              <option value="creative">Prism Polygon</option>
              <option value="typography">Typographic Wordmark</option>
            </select>
          </div>
          <div class="overview-dual-grid">
            <div class="form-group">
              <label class="form-label">Primary Color</label>
              <input type="color" id="new-logo-color1" class="form-input" value="#FF5E4D">
            </div>
            <div class="form-group">
              <label class="form-label">Secondary Color</label>
              <input type="color" id="new-logo-color2" class="form-input" value="#FFA034">
            </div>
          </div>
          <div class="modal-footer-actions text-right mt-16">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm btn-glow">Generate Concept</button>
          </div>
        </form>
      `);
    }

    createNewLogo() {
      const name = document.getElementById("new-logo-name").value.trim();
      const style = document.getElementById("new-logo-style").value;
      const symbolType = document.getElementById("new-logo-symbol").value;
      const primaryColor = document.getElementById("new-logo-color1").value;
      const secondaryColor = document.getElementById("new-logo-color2").value;

      const newLogo = {
        id: `logo-${Date.now()}`,
        name: name || "Untitled Concept",
        style,
        symbolType,
        primaryColor,
        secondaryColor,
        favorite: false
      };

      this.state.logos.unshift(newLogo);
      this.saveState();
      this.closeModal();
      this.renderLogos();
      this.showToast(`New concept '${newLogo.name}' added to Logo Lab`, "success");
    }

    // ==========================================================================
    // 8. COLOR PALETTE STUDIO
    // ==========================================================================
    renderPaletteSwatches() {
      const container = document.getElementById("palette-swatches-row");
      if (!container) return;

      const roles = ["primary", "secondary", "accent", "background", "surface", "text"];
      container.innerHTML = roles.map(rKey => {
        const item = this.state.activePalette[rKey];
        const hex = item.hex.toUpperCase();
        const rgb = this.hexToRgb(hex);

        return `
          <div class="palette-swatch-card">
            <div class="swatch-color-box" style="background-color: ${hex}">
              <button type="button" class="swatch-lock-btn" onclick="window.BrandoraApp.toggleColorLock('${rKey}')" title="${item.locked ? 'Locked' : 'Unlocked'}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${item.locked 
                    ? '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>'
                    : '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>'
                  }
                </svg>
              </button>
            </div>
            <div class="swatch-meta">
              <span class="swatch-role">${item.role}</span>
              <button type="button" class="swatch-hex-btn" onclick="window.BrandoraApp.copyColorValue('${hex}')" title="Copy Hex">
                <span>${hex}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
              <button type="button" class="text-btn text-muted-link" style="font-size:11px;" onclick="window.BrandoraApp.copyColorValue('${rgb}')">Copy ${rgb}</button>
            </div>
          </div>
        `;
      }).join("");

      this.updatePaletteCanvasPreview();
    }

    updatePaletteCanvasPreview() {
      const p = this.state.activePalette;
      const preview = document.getElementById("palette-component-preview");
      if (!preview) return;

      preview.style.backgroundColor = p.surface.hex;
      preview.style.color = p.text.hex;
      
      const badge = preview.querySelector(".test-badge");
      if (badge) {
        badge.style.backgroundColor = p.primary.hex;
      }

      const btnPri = preview.querySelector(".test-btn-primary");
      if (btnPri) {
        btnPri.style.backgroundColor = p.primary.hex;
      }

      const pill = preview.querySelector(".test-pill");
      if (pill) {
        pill.style.borderColor = p.accent.hex;
        pill.style.color = p.accent.hex;
      }
    }

    toggleColorLock(roleKey) {
      const item = this.state.activePalette[roleKey];
      if (item) {
        item.locked = !item.locked;
        this.saveState();
        this.renderPaletteSwatches();
        this.showToast(`${item.role} color ${item.locked ? 'locked' : 'unlocked'}`, "info");
      }
    }

    copyColorValue(val) {
      this.copyToClipboard(val, `Copied ${val} to clipboard`);
    }

    applyPalettePreset(presetName) {
      const preset = this.state.colorPresets[presetName];
      if (!preset) return;

      // Update preset buttons styling
      document.querySelectorAll(".btn-preset").forEach(btn => {
        if (btn.textContent.trim() === presetName) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      Object.keys(preset).forEach(k => {
        if (!this.state.activePalette[k].locked) {
          this.state.activePalette[k].hex = preset[k];
        }
      });

      this.saveState();
      this.renderPaletteSwatches();
      this.showToast(`Applied preset: ${presetName} Palette`, "success");
    }

    generateRandomPalette() {
      const randHex = () => "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
      
      Object.keys(this.state.activePalette).forEach(k => {
        if (!this.state.activePalette[k].locked) {
          this.state.activePalette[k].hex = randHex();
        }
      });

      this.saveState();
      this.renderPaletteSwatches();
      this.showToast("Generated new harmonic color palette", "success");
    }

    saveActivePalette() {
      this.saveState();
      this.showToast("Palette saved and linked to Brandora Design Tokens", "success");
    }

    hexToRgb(hex) {
      hex = hex.replace("#", "");
      if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
      const num = parseInt(hex, 16);
      return `rgb(${num >> 16}, ${(num >> 8) & 255}, ${num & 255})`;
    }

    // ==========================================================================
    // 9. TYPOGRAPHY STUDIO
    // ==========================================================================
    renderTypographySettings() {
      const t = this.state.typography;
      const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val;
      };

      setVal("type-heading-font", t.headingFont);
      setVal("type-body-font", t.bodyFont);
      setVal("type-accent-font", t.accentFont);
      setVal("slider-h1-size", t.h1Size);
      setVal("slider-body-size", t.bodySize);
      setVal("slider-letter-spacing", t.letterSpacing);

      this.updateTypographyPreview();
    }

    updateTypographyPreview() {
      const getVal = (id) => {
        const el = document.getElementById(id);
        return el ? el.value : null;
      };

      const hFont = getVal("type-heading-font") || this.state.typography.headingFont;
      const bFont = getVal("type-body-font") || this.state.typography.bodyFont;
      const h1Size = getVal("slider-h1-size") || this.state.typography.h1Size;
      const bodySize = getVal("slider-body-size") || this.state.typography.bodySize;
      const letterSpacing = getVal("slider-letter-spacing") || this.state.typography.letterSpacing;

      // Update text indicators
      const setText = (id, txt) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
      };
      setText("val-h1-size", `${h1Size}px`);
      setText("val-body-size", `${bodySize}px`);
      setText("val-letter-spacing", `${letterSpacing}px`);

      // Apply live to preview elements
      const canvas = document.getElementById("type-specimen-canvas");
      if (!canvas) return;

      const h1 = canvas.querySelector(".specimen-h1");
      if (h1) {
        h1.style.fontFamily = hFont;
        h1.style.fontSize = `${h1Size}px`;
        h1.style.letterSpacing = `${letterSpacing}px`;
      }

      const h2 = canvas.querySelector(".specimen-h2");
      if (h2) {
        h2.style.fontFamily = hFont;
        h2.style.letterSpacing = `${letterSpacing}px`;
      }

      const body = canvas.querySelector(".specimen-body");
      if (body) {
        body.style.fontFamily = bFont;
        body.style.fontSize = `${bodySize}px`;
      }
    }

    saveTypographySettings() {
      const getVal = (id) => {
        const el = document.getElementById(id);
        return el ? el.value : null;
      };

      this.state.typography.headingFont = getVal("type-heading-font");
      this.state.typography.bodyFont = getVal("type-body-font");
      this.state.typography.accentFont = getVal("type-accent-font");
      this.state.typography.h1Size = parseInt(getVal("slider-h1-size"), 10);
      this.state.typography.bodySize = parseInt(getVal("slider-body-size"), 10);
      this.state.typography.letterSpacing = parseFloat(getVal("slider-letter-spacing"));

      this.saveState();
      this.showToast("Typography scale & font hierarchy saved", "success");
    }

    resetTypography() {
      this.state.typography = JSON.parse(JSON.stringify(DEFAULT_DATA.typography));
      this.saveState();
      this.renderTypographySettings();
      this.showToast("Typography reset to baseline standards", "info");
    }

    // ==========================================================================
    // 10. MOODBOARD
    // ==========================================================================
    renderMoodboard() {
      const container = document.getElementById("moodboard-grid");
      if (!container) return;

      container.innerHTML = this.state.moodboard.map(item => {
        let heroHtml = "";
        if (item.type === "quote") {
          heroHtml = `
            <div class="mood-quote-box">
              <p class="mood-quote-text">"${item.quote}"</p>
              <span class="mood-quote-author">&mdash; ${item.author}</span>
            </div>
          `;
        } else if (item.type === "swatch") {
          heroHtml = `
            <div class="mood-visual-hero" style="background-color: ${item.color};">
              <span style="font-family: monospace; font-weight: 700; color: #FFF; text-shadow: 0 2px 8px rgba(0,0,0,0.6);">${item.color}</span>
            </div>
          `;
        } else if (item.type === "pattern") {
          heroHtml = `
            <div class="mood-visual-hero" style="background: radial-gradient(circle, #2A3042 10%, #0F1118 90%);">
              <svg viewBox="0 0 100 100" style="width:70px;height:70px;opacity:0.8;">
                <circle cx="50" cy="50" r="40" stroke="#FF5E4D" stroke-width="2" fill="none"/>
                <circle cx="50" cy="50" r="25" stroke="#FFA034" stroke-width="2" fill="none"/>
                <circle cx="50" cy="50" r="10" stroke="#FFF" stroke-width="2" fill="none"/>
              </svg>
            </div>
          `;
        } else {
          heroHtml = `
            <div class="mood-visual-hero" style="background: linear-gradient(135deg, #1C1F2E, #131520);">
              <span class="badge-subtle">Creative Direction</span>
            </div>
          `;
        }

        return `
          <div class="mood-card">
            ${heroHtml}
            <div class="mood-card-footer">
              <div>
                <div class="mood-card-title">${item.title}</div>
                <span class="mood-category-tag">${item.category}</span>
              </div>
              <div style="display:flex;gap:4px;">
                <button type="button" class="btn-icon-subtle" onclick="window.BrandoraApp.toggleMoodFavorite('${item.id}')" title="Favorite">
                  <svg viewBox="0 0 24 24" fill="${item.favorite ? '#FFA034' : 'none'}" stroke="${item.favorite ? '#FFA034' : 'currentColor'}" stroke-width="2" style="width:14px;height:14px;">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
                <button type="button" class="btn-icon-subtle" onclick="window.BrandoraApp.deleteMoodCard('${item.id}')" title="Delete">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }

    toggleMoodFavorite(id) {
      const item = this.state.moodboard.find(m => m.id === id);
      if (item) {
        item.favorite = !item.favorite;
        this.saveState();
        this.renderMoodboard();
      }
    }

    deleteMoodCard(id) {
      this.state.moodboard = this.state.moodboard.filter(m => m.id !== id);
      this.saveState();
      this.renderMoodboard();
      this.showToast("Inspiration card deleted", "info");
    }

    openNewMoodboardModal() {
      this.openModal("Add Moodboard Inspiration", `
        <form onsubmit="event.preventDefault(); window.BrandoraApp.createNewMoodCard();">
          <div class="form-group">
            <label class="form-label">Card Type</label>
            <select id="new-mood-type" class="form-input" onchange="window.BrandoraApp.toggleMoodModalFields(this.value)">
              <option value="quote">Inspiring Quote</option>
              <option value="swatch">Color Accent Swatch</option>
              <option value="pattern">Kinetic Geometry Pattern</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Title / Reference</label>
            <input type="text" id="new-mood-title" class="form-input" placeholder="e.g. Bauhaus Geometric Balance" required>
          </div>
          <div id="mood-field-quote-box">
            <div class="form-group">
              <label class="form-label">Quote Content</label>
              <textarea id="new-mood-quote" class="form-textarea" placeholder="Enter inspiring design aphorism..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Author / Thinker</label>
              <input type="text" id="new-mood-author" class="form-input" placeholder="e.g. Massimo Vignelli">
            </div>
          </div>
          <div id="mood-field-color-box" class="hidden">
            <div class="form-group">
              <label class="form-label">Select Color</label>
              <input type="color" id="new-mood-color" class="form-input" value="#FF5E4D">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <input type="text" id="new-mood-category" class="form-input" value="Philosophy" required>
          </div>
          <div class="modal-footer-actions text-right mt-16">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm btn-glow">Add to Moodboard</button>
          </div>
        </form>
      `);
    }

    toggleMoodModalFields(val) {
      const qBox = document.getElementById("mood-field-quote-box");
      const cBox = document.getElementById("mood-field-color-box");
      if (val === "quote") {
        if (qBox) qBox.classList.remove("hidden");
        if (cBox) cBox.classList.add("hidden");
      } else if (val === "swatch") {
        if (qBox) qBox.classList.add("hidden");
        if (cBox) cBox.classList.remove("hidden");
      } else {
        if (qBox) qBox.classList.add("hidden");
        if (cBox) cBox.classList.add("hidden");
      }
    }

    createNewMoodCard() {
      const type = document.getElementById("new-mood-type").value;
      const title = document.getElementById("new-mood-title").value.trim();
      const category = document.getElementById("new-mood-category").value.trim();
      const quote = document.getElementById("new-mood-quote") ? document.getElementById("new-mood-quote").value.trim() : "";
      const author = document.getElementById("new-mood-author") ? document.getElementById("new-mood-author").value.trim() : "";
      const color = document.getElementById("new-mood-color") ? document.getElementById("new-mood-color").value : "#FF5E4D";

      const newCard = {
        id: `m-${Date.now()}`,
        type,
        title: title || "Inspiration Tile",
        category: category || "Design",
        quote,
        author,
        color,
        favorite: false
      };

      this.state.moodboard.unshift(newCard);
      this.saveState();
      this.closeModal();
      this.renderMoodboard();
      this.showToast(`Added '${newCard.title}' to Moodboard`, "success");
    }

    // ==========================================================================
    // 11. BRAND ASSETS
    // ==========================================================================
    renderAssets(category = "All") {
      const container = document.getElementById("assets-grid");
      if (!container) return;

      let list = this.state.assets;
      if (category !== "All") {
        list = list.filter(a => a.type.toLowerCase() === category.toLowerCase());
      }

      const countBadge = document.getElementById("badge-assets-count");
      if (countBadge) countBadge.textContent = this.state.assets.length;

      container.innerHTML = list.map(asset => {
        return `
          <div class="asset-card">
            <div class="asset-top-row">
              <div class="asset-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <div class="asset-meta">
                <span class="asset-name">${asset.name}</span>
                <span class="asset-details">${asset.type} &bull; ${asset.version} &bull; ${asset.size}</span>
                <span class="asset-details" style="margin-top:2px;">Updated ${asset.updated} by ${asset.owner}</span>
              </div>
            </div>
            <div class="asset-actions-row">
              <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.previewAsset('${asset.id}')">Preview</button>
              <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.renameAsset('${asset.id}')">Rename</button>
              <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.duplicateAsset('${asset.id}')">Duplicate</button>
              <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.downloadSimulatedAsset('${asset.id}')">Download</button>
              <button type="button" class="btn btn-danger-outline btn-xs" onclick="window.BrandoraApp.deleteAsset('${asset.id}')">Delete</button>
            </div>
          </div>
        `;
      }).join("");
    }

    filterAssets(category, btnEl) {
      if (btnEl) {
        document.querySelectorAll("[data-asset-cat]").forEach(b => b.classList.remove("active"));
        btnEl.classList.add("active");
      }
      this.renderAssets(category);
    }

    previewAsset(assetId) {
      const a = this.state.assets.find(x => x.id === assetId);
      if (!a) return;

      this.openModal(`Asset Preview: ${a.name}`, `
        <div style="background: #0B0C10; padding: 32px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); text-align: center; margin-bottom: 16px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FF5E4D" stroke-width="1.5" style="width: 64px; height: 64px; margin-bottom: 12px;">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <h4 style="color:#FFF; font-size:16px;">${a.name}</h4>
          <p class="text-dim" style="font-size:12px; margin-top:4px;">Cryptographically Verified Studio Delivery</p>
        </div>
        <div class="brand-key-attributes mb-16">
          <div class="attr-pill"><span class="attr-title">Category</span><span class="attr-val">${a.type}</span></div>
          <div class="attr-pill"><span class="attr-title">Version</span><span class="attr-val">${a.version}</span></div>
          <div class="attr-pill"><span class="attr-title">Filesize</span><span class="attr-val">${a.size}</span></div>
        </div>
        <div class="text-right">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Close</button>
          <button type="button" class="btn btn-primary btn-sm btn-glow" onclick="window.BrandoraApp.downloadSimulatedAsset('${a.id}')">Download File</button>
        </div>
      `);
    }

    renameAsset(assetId) {
      const a = this.state.assets.find(x => x.id === assetId);
      if (!a) return;

      this.openModal(`Rename Asset`, `
        <form onsubmit="event.preventDefault(); window.BrandoraApp.saveAssetRename('${a.id}');">
          <div class="form-group">
            <label class="form-label">Asset Filename</label>
            <input type="text" id="rename-asset-input" class="form-input" value="${a.name}" required>
          </div>
          <div class="modal-footer-actions text-right mt-16">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm btn-glow">Save Rename</button>
          </div>
        </form>
      `);
    }

    saveAssetRename(assetId) {
      const a = this.state.assets.find(x => x.id === assetId);
      const input = document.getElementById("rename-asset-input");
      if (a && input) {
        a.name = input.value.trim() || a.name;
        a.updated = "Just now";
        this.saveState();
        this.closeModal();
        this.renderAssets();
        this.showToast(`Renamed to ${a.name}`, "success");
      }
    }

    duplicateAsset(assetId) {
      const a = this.state.assets.find(x => x.id === assetId);
      if (!a) return;

      const copy = {
        ...a,
        id: `ast-${Date.now()}`,
        name: `Copy_${a.name}`,
        updated: "Just now"
      };
      this.state.assets.unshift(copy);
      this.saveState();
      this.renderAssets();
      this.showToast(`Duplicated asset ${copy.name}`, "success");
    }

    deleteAsset(assetId) {
      this.state.assets = this.state.assets.filter(a => a.id !== assetId);
      this.saveState();
      this.renderAssets();
      this.showToast("Asset deleted from studio vault", "info");
    }

    downloadSimulatedAsset(assetId) {
      const a = this.state.assets.find(x => x.id === assetId);
      if (!a) return;

      const fileContent = `BRANDORA STUDIO ASSET DUMP\nFilename: ${a.name}\nType: ${a.type}\nVersion: ${a.version}\nGenerated by Elena Vance, Creative Director.\nVerified Timestamp: ${new Date().toISOString()}`;
      const blob = new Blob([fileContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = a.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      this.showToast(`Downloaded package for ${a.name}`, "success");
    }

    openNewAssetModal() {
      this.openModal("Upload New Brand Asset", `
        <form onsubmit="event.preventDefault(); window.BrandoraApp.createNewAsset();">
          <div class="form-group">
            <label class="form-label">Asset Filename</label>
            <input type="text" id="new-asset-name" class="form-input" placeholder="e.g. Brandora_Icon_Master.svg" required>
          </div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <select id="new-asset-type" class="form-input">
              <option value="Logos">Logos</option>
              <option value="Social Media">Social Media</option>
              <option value="Business Cards">Business Cards</option>
              <option value="Presentations">Presentations</option>
              <option value="Packaging">Packaging</option>
              <option value="Ads">Ads</option>
              <option value="Website">Website</option>
              <option value="Print">Print</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Version</label>
            <input type="text" id="new-asset-ver" class="form-input" value="v1.0" required>
          </div>
          <div class="modal-footer-actions text-right mt-16">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm btn-glow">Upload Asset</button>
          </div>
        </form>
      `);
    }

    createNewAsset() {
      const name = document.getElementById("new-asset-name").value.trim();
      const type = document.getElementById("new-asset-type").value;
      const ver = document.getElementById("new-asset-ver").value.trim();

      const newAsset = {
        id: `ast-${Date.now()}`,
        name: name || "New_Asset.svg",
        type,
        version: ver || "v1.0",
        status: "Approved",
        updated: "Just now",
        owner: this.state.auth.user.name,
        size: "280 KB"
      };

      this.state.assets.unshift(newAsset);
      this.saveState();
      this.closeModal();
      this.renderAssets();
      this.showToast(`Asset '${newAsset.name}' uploaded successfully`, "success");
    }

    // ==========================================================================
    // 12. BRAND PROJECTS
    // ==========================================================================
    renderProjects(statusFilter = "All") {
      const container = document.getElementById("projects-list-grid");
      if (!container) return;

      let list = this.state.projects;
      if (statusFilter !== "All") {
        list = list.filter(p => p.status.toLowerCase() === statusFilter.toLowerCase());
      }

      const countBadge = document.getElementById("badge-projects-count");
      if (countBadge) countBadge.textContent = this.state.projects.length;

      container.innerHTML = list.map(prj => {
        let statusClass = "planning";
        if (prj.status === "In Progress") statusClass = "in-progress";
        if (prj.status === "Review") statusClass = "review";
        if (prj.status === "Completed") statusClass = "completed";

        return `
          <div class="project-card">
            <div>
              <div class="project-head">
                <h3 class="project-title">${prj.title}</h3>
                <span class="status-pill ${statusClass}">${prj.status}</span>
              </div>
              <div class="project-client-name">${prj.client} &bull; Due ${prj.deadline}</div>
            </div>

            <div class="project-progress-box">
              <div class="project-progress-meta">
                <span>Progress Fidelity</span>
                <strong>${prj.progress}%</strong>
              </div>
              <div class="meter-track">
                <div class="meter-fill" style="width: ${prj.progress}%"></div>
              </div>
            </div>

            <div class="project-card-footer">
              <div class="project-budget">Budget: <strong>${prj.budget}</strong></div>
              <div style="display:flex;gap:6px;">
                <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.editProject('${prj.id}')">Edit</button>
                <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.duplicateProject('${prj.id}')">Duplicate</button>
                <button type="button" class="btn btn-danger-outline btn-xs" onclick="window.BrandoraApp.deleteProject('${prj.id}')">Delete</button>
              </div>
            </div>
          </div>
        `;
      }).join("");

      this.renderOverviewProjects();
    }

    filterProjects(status, btnEl) {
      if (btnEl) {
        document.querySelectorAll("#view-projects .filter-pill").forEach(b => b.classList.remove("active"));
        btnEl.classList.add("active");
      }
      this.renderProjects(status);
    }

    duplicateProject(prjId) {
      const p = this.state.projects.find(x => x.id === prjId);
      if (!p) return;

      const copy = {
        ...p,
        id: `prj-${Date.now()}`,
        title: `${p.title} (Clone)`,
        progress: 0,
        status: "Planning"
      };
      this.state.projects.unshift(copy);
      this.saveState();
      this.renderProjects();
      this.showToast(`Duplicated project ${copy.title}`, "success");
    }

    deleteProject(prjId) {
      this.state.projects = this.state.projects.filter(p => p.id !== prjId);
      this.saveState();
      this.renderProjects();
      this.showToast("Project removed from studio board", "info");
    }

    editProject(prjId) {
      const p = this.state.projects.find(x => x.id === prjId);
      if (!p) return;

      this.openModal(`Edit Project: ${p.title}`, `
        <form onsubmit="event.preventDefault(); window.BrandoraApp.saveProjectEdit('${p.id}');">
          <div class="form-group">
            <label class="form-label">Project Title</label>
            <input type="text" id="edit-prj-title" class="form-input" value="${p.title}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Client</label>
            <input type="text" id="edit-prj-client" class="form-input" value="${p.client}" required>
          </div>
          <div class="overview-dual-grid">
            <div class="form-group">
              <label class="form-label">Status</label>
              <select id="edit-prj-status" class="form-input">
                <option value="Planning" ${p.status === 'Planning' ? 'selected' : ''}>Planning</option>
                <option value="In Progress" ${p.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Review" ${p.status === 'Review' ? 'selected' : ''}>Review</option>
                <option value="Completed" ${p.status === 'Completed' ? 'selected' : ''}>Completed</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Progress (${p.progress}%)</label>
              <input type="range" id="edit-prj-progress" class="custom-range" min="0" max="100" value="${p.progress}">
            </div>
          </div>
          <div class="modal-footer-actions text-right mt-16">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm btn-glow">Save Changes</button>
          </div>
        </form>
      `);
    }

    saveProjectEdit(prjId) {
      const p = this.state.projects.find(x => x.id === prjId);
      if (!p) return;

      p.title = document.getElementById("edit-prj-title").value.trim() || p.title;
      p.client = document.getElementById("edit-prj-client").value.trim() || p.client;
      p.status = document.getElementById("edit-prj-status").value;
      p.progress = parseInt(document.getElementById("edit-prj-progress").value, 10);

      this.saveState();
      this.closeModal();
      this.renderProjects();
      this.showToast(`Updated project '${p.title}'`, "success");
    }

    renderOverviewProjects() {
      const container = document.getElementById("overview-projects-list");
      if (!container) return;

      const topProjects = this.state.projects.slice(0, 3);
      container.innerHTML = topProjects.map(p => `
        <div class="ov-project-item">
          <div>
            <strong style="color:#FFF;font-size:13.5px;">${p.title}</strong>
            <div class="text-dim" style="font-size:11.5px;">${p.client} &bull; Due ${p.deadline}</div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:80px;" class="meter-track">
              <div class="meter-fill" style="width:${p.progress}%"></div>
            </div>
            <span style="font-size:12px;font-weight:700;color:#FFF;">${p.progress}%</span>
          </div>
        </div>
      `).join("");
    }

    // ==========================================================================
    // 13. CONTENT STUDIO
    // ==========================================================================
    renderContent(platform = "All") {
      const container = document.getElementById("content-items-grid");
      if (!container) return;

      let list = this.state.content;
      if (platform !== "All") {
        list = list.filter(c => c.platform.toLowerCase().includes(platform.toLowerCase()));
      }

      container.innerHTML = list.map(item => `
        <div class="content-card">
          <div>
            <div class="content-platform-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>${item.platform.toUpperCase()}</span>
            </div>
            <h3 class="content-post-title mt-12">${item.title}</h3>
            <div class="content-campaign-tag mt-6">Campaign: ${item.campaign} &bull; Author: ${item.author}</div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border-subtle);padding-top:14px;">
            <span class="status-pill in-progress">${item.status}</span>
            <div style="display:flex;gap:6px;">
              <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.previewContent('${item.id}')">Preview</button>
              <button type="button" class="btn btn-danger-outline btn-xs" onclick="window.BrandoraApp.deleteContent('${item.id}')">Delete</button>
            </div>
          </div>
        </div>
      `).join("");
    }

    filterContent(platform, btnEl) {
      if (btnEl) {
        document.querySelectorAll("#view-content .filter-pill").forEach(b => b.classList.remove("active"));
        btnEl.classList.add("active");
      }
      this.renderContent(platform);
    }

    previewContent(id) {
      const c = this.state.content.find(x => x.id === id);
      if (!c) return;

      this.openModal(`Content Preview: ${c.platform}`, `
        <div style="background: #171B26; padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 16px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <div class="user-avatar-sm">EV</div>
            <div>
              <strong style="color:#FFF;font-size:13px;">${c.author}</strong>
              <div class="text-dim" style="font-size:11px;">Scheduled for ${c.publishDate}</div>
            </div>
          </div>
          <h4 style="color:#FFF; font-size:16px; margin-bottom: 8px;">${c.title}</h4>
          <p style="color:var(--text-main); font-size:13.5px; line-height:1.6;">
            A category-defining brand identity isn't just about beautiful color swatches and vector emblems. It's about designing an undeniable emotional signature that leaves zero doubt about who you are.
          </p>
        </div>
        <div class="text-right">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Close</button>
          <button type="button" class="btn btn-primary btn-sm btn-glow" onclick="window.BrandoraApp.showToast('Post queued for instant broadcast', 'success'); window.BrandoraApp.closeModal();">Publish Immediately</button>
        </div>
      `);
    }

    deleteContent(id) {
      this.state.content = this.state.content.filter(c => c.id !== id);
      this.saveState();
      this.renderContent();
      this.showToast("Content scheduled item removed", "info");
    }

    openNewContentModal() {
      this.openModal("Create Brand Content Post", `
        <form onsubmit="event.preventDefault(); window.BrandoraApp.createNewContentPost();">
          <div class="form-group">
            <label class="form-label">Content Title / Hook</label>
            <input type="text" id="new-cnt-title" class="form-input" placeholder="e.g. Why Minimalist Typography Drives 40% Higher Conversion" required>
          </div>
          <div class="form-group">
            <label class="form-label">Platform Destination</label>
            <select id="new-cnt-platform" class="form-input">
              <option value="LinkedIn">LinkedIn Article / Post</option>
              <option value="Instagram">Instagram Reel / Carousel</option>
              <option value="TikTok">TikTok Short Video</option>
              <option value="Website">Website Case Study / Blog</option>
              <option value="Advertisement">Paid Acquisition Ad</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Associated Brand Campaign</label>
            <input type="text" id="new-cnt-campaign" class="form-input" value="Brandora Global Reveal 2026" required>
          </div>
          <div class="modal-footer-actions text-right mt-16">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm btn-glow">Schedule Post</button>
          </div>
        </form>
      `);
    }

    createNewContentPost() {
      const title = document.getElementById("new-cnt-title").value.trim();
      const platform = document.getElementById("new-cnt-platform").value;
      const campaign = document.getElementById("new-cnt-campaign").value.trim();

      const newPost = {
        id: `cnt-${Date.now()}`,
        title: title || "Untitled Broadcast",
        platform,
        status: "Draft",
        author: this.state.auth.user.name,
        publishDate: "Sep 24, 2026",
        campaign: campaign || "Studio Editorial"
      };

      this.state.content.unshift(newPost);
      this.saveState();
      this.closeModal();
      this.renderContent();
      this.showToast(`Content post drafted for ${platform}`, "success");
    }

    // ==========================================================================
    // 14. CLIENT MANAGEMENT
    // ==========================================================================
    renderClients(query = "") {
      const tbody = document.getElementById("clients-table-body");
      if (!tbody) return;

      let list = this.state.clients;
      if (query) {
        const q = query.toLowerCase();
        list = list.filter(c => c.company.toLowerCase().includes(q) || c.contact.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q));
      }

      const countBadge = document.getElementById("badge-clients-count");
      if (countBadge) countBadge.textContent = this.state.clients.length;

      tbody.innerHTML = list.map(c => `
        <tr>
          <td><span class="company-cell-name">${c.company}</span></td>
          <td>${c.contact}</td>
          <td>${c.industry}</td>
          <td>${c.projects} Active</td>
          <td><span class="score-badge-table">${c.score}%</span></td>
          <td><span class="status-pill in-progress">${c.status}</span></td>
          <td>${c.manager}</td>
          <td class="text-right">
            <div style="display:inline-flex;gap:6px;">
              <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.viewClient('${c.id}')">View</button>
              <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.messageClient('${c.contact}')">Message</button>
              <button type="button" class="btn btn-danger-outline btn-xs" onclick="window.BrandoraApp.deleteClient('${c.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `).join("");
    }

    filterClientsList(val) {
      this.renderClients(val.trim());
    }

    viewClient(clientId) {
      const c = this.state.clients.find(x => x.id === clientId);
      if (!c) return;

      this.openModal(`Client Dossier: ${c.company}`, `
        <div class="brand-key-attributes mb-16">
          <div class="attr-pill"><span class="attr-title">Primary Contact</span><span class="attr-val">${c.contact}</span></div>
          <div class="attr-pill"><span class="attr-title">Industry</span><span class="attr-val">${c.industry}</span></div>
          <div class="attr-pill"><span class="attr-title">Brand Health</span><span class="attr-val">${c.score}% Fidelity</span></div>
        </div>
        <p class="text-dim mb-16">Dedicated Account Lead: <strong style="color:#FFF;">${c.manager}</strong> &bull; Total Engagements: <strong style="color:#FFF;">${c.projects} Projects</strong></p>
        <div class="text-right">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Close</button>
          <button type="button" class="btn btn-primary btn-sm btn-glow" onclick="window.BrandoraApp.messageClient('${c.contact}')">Launch Dedicated Chat</button>
        </div>
      `);
    }

    deleteClient(clientId) {
      this.state.clients = this.state.clients.filter(c => c.id !== clientId);
      this.saveState();
      this.renderClients();
      this.showToast("Client record archived", "info");
    }

    messageClient(contactName) {
      this.closeModal();
      this.navigateTo("messages");
      this.showToast(`Active thread initiated with ${contactName}`, "info");
    }

    // ==========================================================================
    // 15. TEAM MANAGEMENT
    // ==========================================================================
    renderTeam() {
      const container = document.getElementById("team-cards-grid");
      if (!container) return;

      container.innerHTML = this.state.team.map(m => {
        const initials = m.name.split(" ").map(w => w[0]).join("").toUpperCase();
        return `
          <div class="team-card">
            <div class="team-card-avatar">${initials}</div>
            <h3 class="team-member-name">${m.name}</h3>
            <span class="team-member-role">${m.role}</span>
            <span class="team-availability-badge"><span class="dot"></span> ${m.availability}</span>
            
            <div class="team-stats-row">
              <div class="team-stat-item">
                <span class="team-stat-num">${m.projects}</span>
                <span class="team-stat-lbl">Projects</span>
              </div>
              <div class="team-stat-item">
                <span class="team-stat-num">${m.tasks}</span>
                <span class="team-stat-lbl">Tasks</span>
              </div>
              <div class="team-stat-item">
                <span class="team-stat-num">${m.performance}</span>
                <span class="team-stat-lbl">Rating</span>
              </div>
            </div>

            <div class="team-card-actions">
              <button type="button" class="btn btn-secondary btn-block btn-xs" onclick="window.BrandoraApp.messageTeamMember('${m.name}')">Chat</button>
              <button type="button" class="btn btn-danger-outline btn-block btn-xs" onclick="window.BrandoraApp.deleteTeamMember('${m.id}')">Remove</button>
            </div>
          </div>
        `;
      }).join("");
    }

    messageTeamMember(memberName) {
      this.navigateTo("messages");
      this.showToast(`Opened private workspace thread with ${memberName}`, "info");
    }

    deleteTeamMember(id) {
      this.state.team = this.state.team.filter(m => m.id !== id);
      this.saveState();
      this.renderTeam();
      this.showToast("Team member removed from studio registry", "info");
    }

    openNewTeamModal() {
      this.openModal("Add Creative Team Member", `
        <form onsubmit="event.preventDefault(); window.BrandoraApp.createNewTeamMember();">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" id="new-team-name" class="form-input" placeholder="e.g. Julian Croft" required>
          </div>
          <div class="form-group">
            <label class="form-label">Studio Role</label>
            <select id="new-team-role" class="form-input">
              <option value="Brand Strategist">Brand Strategist</option>
              <option value="Creative Director">Creative Director</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Copywriter">Copywriter</option>
              <option value="UI Designer">UI Designer</option>
              <option value="Marketing Manager">Marketing Manager</option>
              <option value="Social Media Manager">Social Media Manager</option>
            </select>
          </div>
          <div class="modal-footer-actions text-right mt-16">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm btn-glow">Add Specialist</button>
          </div>
        </form>
      `);
    }

    createNewTeamMember() {
      const name = document.getElementById("new-team-name").value.trim();
      const role = document.getElementById("new-team-role").value;

      const newMember = {
        id: `tm-${Date.now()}`,
        name: name || "Creative Specialist",
        role,
        projects: 1,
        tasks: 2,
        performance: "98%",
        availability: "Active Studio"
      };

      this.state.team.push(newMember);
      this.saveState();
      this.closeModal();
      this.renderTeam();
      this.showToast(`Welcomed ${newMember.name} to the team`, "success");
    }

    // ==========================================================================
    // 16. TASK MANAGEMENT
    // ==========================================================================
    renderTasks(priorityFilter = "All") {
      const container = document.getElementById("tasks-list-container");
      if (!container) return;

      let list = this.state.tasks;
      if (priorityFilter === "Completed") {
        list = list.filter(t => t.completed);
      } else if (priorityFilter !== "All") {
        list = list.filter(t => t.priority.toLowerCase() === priorityFilter.toLowerCase());
      }

      const countBadge = document.getElementById("badge-tasks-count");
      if (countBadge) countBadge.textContent = this.state.tasks.filter(t => !t.completed).length;

      container.innerHTML = list.map(t => {
        const pClass = t.priority.toLowerCase();
        return `
          <div class="task-item-card">
            <div class="task-left-group">
              <div class="task-checkbox-round ${t.completed ? 'checked' : ''}" onclick="window.BrandoraApp.toggleTaskComplete('${t.id}')">
                ${t.completed ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
              </div>
              <div>
                <span class="task-title-text ${t.completed ? 'completed' : ''}">${t.title}</span>
                <div class="text-dim" style="font-size:11.5px;margin-top:2px;">Assigned to ${t.member} &bull; Due ${t.dueDate}</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;">
              <span class="priority-tag ${pClass}">${t.priority}</span>
              <button type="button" class="btn-icon-subtle" onclick="window.BrandoraApp.deleteTask('${t.id}')" title="Delete Task">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        `;
      }).join("");

      this.renderOverviewTasks();
    }

    toggleTaskComplete(taskId) {
      const t = this.state.tasks.find(x => x.id === taskId);
      if (t) {
        t.completed = !t.completed;
        this.saveState();
        this.renderTasks();
        this.showToast(`Task '${t.title}' marked ${t.completed ? 'completed' : 'pending'}`, "success");
      }
    }

    deleteTask(taskId) {
      this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
      this.saveState();
      this.renderTasks();
      this.showToast("Task deleted", "info");
    }

    filterTasks(priority, btnEl) {
      if (btnEl) {
        document.querySelectorAll("#view-tasks .filter-pill").forEach(b => b.classList.remove("active"));
        btnEl.classList.add("active");
      }
      this.renderTasks(priority);
    }

    renderOverviewTasks() {
      const container = document.getElementById("overview-tasks-list");
      if (!container) return;

      const pending = this.state.tasks.filter(t => !t.completed).slice(0, 3);
      container.innerHTML = pending.map(t => `
        <div class="ov-task-row">
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="task-checkbox-round" onclick="window.BrandoraApp.toggleTaskComplete('${t.id}')"></div>
            <span style="font-size:13px;color:#FFF;font-weight:500;">${t.title}</span>
          </div>
          <span class="priority-tag ${t.priority.toLowerCase()}">${t.priority}</span>
        </div>
      `).join("");
    }

    // ==========================================================================
    // 17. CALENDAR
    // ==========================================================================
    renderCalendar() {
      const monthTitle = document.getElementById("calendar-current-month");
      const grid = document.getElementById("calendar-month-days");
      const agenda = document.getElementById("calendar-agenda-list");
      if (!monthTitle || !grid || !agenda) return;

      const dateObj = new Date(this.calendarYear, this.calendarMonth, 1);
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      monthTitle.textContent = `${monthNames[this.calendarMonth]} ${this.calendarYear}`;

      // Calculate days
      const firstDayIdx = dateObj.getDay();
      const totalDays = new Date(this.calendarYear, this.calendarMonth + 1, 0).getDate();
      const prevMonthTotal = new Date(this.calendarYear, this.calendarMonth, 0).getDate();

      let daysHtml = "";

      // Previous month padding
      for (let i = firstDayIdx - 1; i >= 0; i--) {
        daysHtml += `<div class="calendar-day-cell other-month"><span class="day-cell-num">${prevMonthTotal - i}</span></div>`;
      }

      // Current month days
      const currentMonthStr = String(this.calendarMonth + 1).padStart(2, "0");
      for (let day = 1; day <= totalDays; day++) {
        const dayStr = String(day).padStart(2, "0");
        const fullDateStr = `${this.calendarYear}-${currentMonthStr}-${dayStr}`;
        const dayEvents = this.state.calendarEvents.filter(e => e.date === fullDateStr);
        const hasEv = dayEvents.length > 0;
        const isToday = day === 14 && this.calendarMonth === 8; // Simulated Today

        daysHtml += `
          <div class="calendar-day-cell ${hasEv ? 'has-event' : ''} ${isToday ? 'today' : ''}">
            <span class="day-cell-num">${day}</span>
            <div class="day-event-dot-row">
              ${dayEvents.map(e => `<span class="event-dot-micro" title="${e.title}"></span>`).join("")}
            </div>
          </div>
        `;
      }

      grid.innerHTML = daysHtml;

      // Agenda list
      agenda.innerHTML = this.state.calendarEvents.map(ev => `
        <div class="agenda-item-card">
          <div class="agenda-item-title">${ev.title}</div>
          <div class="agenda-item-meta">${ev.type} &bull; ${ev.date} at ${ev.time}</div>
          <div class="text-right mt-6">
            <button type="button" class="btn btn-danger-outline btn-xs" onclick="window.BrandoraApp.deleteCalendarEvent('${ev.id}')">Cancel</button>
          </div>
        </div>
      `).join("");
    }

    changeCalendarMonth(delta) {
      this.calendarMonth += delta;
      if (this.calendarMonth < 0) {
        this.calendarMonth = 11;
        this.calendarYear -= 1;
      } else if (this.calendarMonth > 11) {
        this.calendarMonth = 0;
        this.calendarYear += 1;
      }
      this.renderCalendar();
    }

    deleteCalendarEvent(id) {
      this.state.calendarEvents = this.state.calendarEvents.filter(e => e.id !== id);
      this.saveState();
      this.renderCalendar();
      this.showToast("Event cancelled from calendar", "info");
    }

    openNewEventModal() {
      this.openModal("Add Studio Calendar Milestone", `
        <form onsubmit="event.preventDefault(); window.BrandoraApp.createNewCalendarEvent();">
          <div class="form-group">
            <label class="form-label">Event Milestone Title</label>
            <input type="text" id="new-ev-title" class="form-input" placeholder="e.g. Creative Direction Review" required>
          </div>
          <div class="form-group">
            <label class="form-label">Event Type</label>
            <select id="new-ev-type" class="form-input">
              <option value="Brand Review">Brand Review</option>
              <option value="Client Meeting">Client Meeting</option>
              <option value="Logo Presentation">Logo Presentation</option>
              <option value="Campaign Launch">Campaign Launch</option>
              <option value="Content Deadline">Content Deadline</option>
              <option value="Design Review">Design Review</option>
            </select>
          </div>
          <div class="overview-dual-grid">
            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" id="new-ev-date" class="form-input" value="2026-09-25" required>
            </div>
            <div class="form-group">
              <label class="form-label">Time</label>
              <input type="text" id="new-ev-time" class="form-input" value="2:00 PM" required>
            </div>
          </div>
          <div class="modal-footer-actions text-right mt-16">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm btn-glow">Add Milestone</button>
          </div>
        </form>
      `);
    }

    createNewCalendarEvent() {
      const title = document.getElementById("new-ev-title").value.trim();
      const type = document.getElementById("new-ev-type").value;
      const date = document.getElementById("new-ev-date").value;
      const time = document.getElementById("new-ev-time").value.trim();

      const newEv = {
        id: `ev-${Date.now()}`,
        title: title || "Studio Milestone",
        type,
        date,
        time: time || "10:00 AM"
      };

      this.state.calendarEvents.push(newEv);
      this.saveState();
      this.closeModal();
      this.renderCalendar();
      this.showToast(`Milestone scheduled for ${newEv.date}`, "success");
    }

    // ==========================================================================
    // 18. BRAND ANALYTICS (SVG CHARTS)
    // ==========================================================================
    changeAnalyticsTimeframe(tf, btnEl) {
      this.analyticsTimeframe = tf;
      if (btnEl) {
        document.querySelectorAll(".time-filter-btn").forEach(b => b.classList.remove("active"));
        btnEl.classList.add("active");
      }
      this.renderAnalyticsCharts();
      this.showToast(`Refreshed telemetry timeline to ${tf.toUpperCase()}`, "info");
    }

    renderAnalyticsCharts() {
      const chart1 = document.getElementById("chart-awareness-svg");
      const chart2 = document.getElementById("chart-channels-svg");
      if (!chart1 || !chart2) return;

      const datasets = {
        "7d": {
          awareness: "M 20,200 L 100,160 L 200,140 L 300,110 L 400,90 L 500,60 L 580,35",
          engagement: "M 20,220 L 100,190 L 200,180 L 300,150 L 400,130 L 500,110 L 580,85",
          bars: [45, 60, 85, 30, 95]
        },
        "30d": {
          awareness: "M 20,180 L 100,140 L 200,110 L 300,80 L 400,95 L 500,45 L 580,25",
          engagement: "M 20,210 L 100,175 L 200,150 L 300,130 L 400,120 L 500,90 L 580,70",
          bars: [70, 85, 92, 55, 110]
        },
        "90d": {
          awareness: "M 20,195 L 100,165 L 200,130 L 300,115 L 400,75 L 500,50 L 580,18",
          engagement: "M 20,220 L 100,185 L 200,160 L 300,140 L 400,105 L 500,80 L 580,55",
          bars: [88, 95, 115, 68, 140]
        },
        "1y": {
          awareness: "M 20,210 L 100,180 L 200,145 L 300,100 L 400,70 L 500,35 L 580,10",
          engagement: "M 20,230 L 100,200 L 200,170 L 300,135 L 400,95 L 500,65 L 580,40",
          bars: [110, 130, 160, 90, 185]
        }
      };

      const data = datasets[this.analyticsTimeframe] || datasets["30d"];

      chart1.innerHTML = `
        <defs>
          <linearGradient id="grad-aware" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FF5E4D" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#FF5E4D" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        <line x1="20" y1="220" x2="580" y2="220" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <line x1="20" y1="160" x2="580" y2="160" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <line x1="20" y1="100" x2="580" y2="100" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <line x1="20" y1="40" x2="580" y2="40" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        
        <path d="${data.awareness}" fill="none" stroke="#FF5E4D" stroke-width="3" stroke-linecap="round"/>
        <path d="${data.engagement}" fill="none" stroke="#FFA034" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 3"/>
      `;

      const channels = ["Instagram", "LinkedIn", "TikTok", "Website", "Paid Ads"];
      const barWidth = 60;
      const spacing = 110;
      let barsSvg = "";

      data.bars.forEach((bVal, i) => {
        const x = 35 + (i * spacing);
        const y = 220 - bVal;
        barsSvg += `
          <rect x="${x}" y="${y}" width="${barWidth}" height="${bVal}" rx="6" fill="url(#sidebar-brand-grad)" fill-opacity="0.85"/>
          <text x="${x + barWidth/2}" y="236" fill="#9DA1B2" font-size="11" text-anchor="middle">${channels[i]}</text>
          <text x="${x + barWidth/2}" y="${y - 8}" fill="#FFF" font-size="11" font-weight="700" text-anchor="middle">${bVal}k</text>
        `;
      });

      chart2.innerHTML = `
        <line x1="20" y1="220" x2="580" y2="220" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        ${barsSvg}
      `;
    }

    // ==========================================================================
    // 19. BRAND CONSISTENCY SCORE & AUDIT
    // ==========================================================================
    recalculateConsistencyScore() {
      const fillCircle = document.getElementById("gauge-fill-circle");
      const scoreNum = document.getElementById("big-consistency-score");
      if (fillCircle && scoreNum) {
        fillCircle.style.strokeDashoffset = "502";
        setTimeout(() => {
          fillCircle.style.strokeDashoffset = "30";
          scoreNum.textContent = "95%";
          this.showToast("Brand Consistency Audit re-calculated: 95% (+1% gained)", "success");
        }, 300);
      }
    }

    toggleAuditCheck() {
      const checks = document.querySelectorAll(".recommendation-list input[type='checkbox']");
      const checkedCount = Array.from(checks).filter(c => c.checked).length;
      const score = 91 + (checkedCount * 2);
      
      const scoreEl = document.getElementById("big-consistency-score");
      if (scoreEl) scoreEl.textContent = `${score}%`;
      this.showToast(`Studio compliance updated: ${score}%`, "info");
    }

    // ==========================================================================
    // 20. REPORTS GENERATOR
    // ==========================================================================
    renderReports() {
      const container = document.getElementById("reports-grid");
      if (!container) return;

      container.innerHTML = this.state.reports.map(r => `
        <div class="report-card">
          <div>
            <span class="badge-subtle highlight">${r.type}</span>
            <h3 class="report-title mt-12">${r.title}</h3>
            <p class="report-meta-text">Generated ${r.date} &bull; ${r.pages} &bull; Score: ${r.score}</p>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border-subtle);padding-top:14px;">
            <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.previewReport('${r.id}')">Preview Brief</button>
            <button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.downloadReportFile('${r.id}')">Download</button>
            <button type="button" class="btn btn-danger-outline btn-xs" onclick="window.BrandoraApp.deleteReport('${r.id}')">Delete</button>
          </div>
        </div>
      `).join("");
    }

    previewReport(id) {
      const r = this.state.reports.find(x => x.id === id);
      if (!r) return;

      this.openModal(`Client Brief: ${r.title}`, `
        <div style="background:#0F1118; padding:24px; border-radius:10px; border:1px solid rgba(255,255,255,0.08); margin-bottom:16px;">
          <h4 style="color:#FFF; font-size:17px; margin-bottom:6px;">BRANDORA EXECUTIVE BRIEFING</h4>
          <p class="text-dim" style="font-size:12px;">Audited Brand: ${this.state.brands[this.state.activeBrandId].name} &bull; Classification: Highly Confidential</p>
          <div class="divider-line my-16"></div>
          <p style="color:var(--text-main); font-size:13.5px; line-height:1.6;">
            This audit confirms that all brand touchpoints—from vector symbol clearspace and typographic scales to customer-facing verbal rubrics—meet international agency standards. Consistency rating stands at <strong>${r.score}</strong>.
          </p>
        </div>
        <div class="text-right">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Close</button>
          <button type="button" class="btn btn-primary btn-sm btn-glow" onclick="window.BrandoraApp.downloadReportFile('${r.id}')">Export PDF / HTML</button>
        </div>
      `);
    }

    deleteReport(id) {
      this.state.reports = this.state.reports.filter(r => r.id !== id);
      this.saveState();
      this.renderReports();
      this.showToast("Report brief deleted", "info");
    }

    downloadReportFile(id) {
      const r = this.state.reports.find(x => x.id === id);
      if (!r) return;

      const reportHtml = `<!DOCTYPE html><html><head><title>${r.title}</title><style>body{font-family:sans-serif;padding:40px;color:#111;line-height:1.6;}</style></head><body><h1>${r.title}</h1><p>Type: ${r.type}</p><p>Score: ${r.score}</p><p>Generated by BRANDORA Branding Studio Platform.</p></body></html>`;
      const blob = new Blob([reportHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${r.title.replace(/\s+/g, '_')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.showToast(`Exported ${r.title}`, "success");
    }

    openGenerateReportModal() {
      this.openModal("Generate Dynamic Brand Report", `
        <form onsubmit="event.preventDefault(); window.BrandoraApp.createNewReport();">
          <div class="form-group">
            <label class="form-label">Report Title</label>
            <input type="text" id="new-rep-title" class="form-input" placeholder="e.g. Q4 Executive Identity Audit" required>
          </div>
          <div class="form-group">
            <label class="form-label">Report Archetype</label>
            <select id="new-rep-type" class="form-input">
              <option value="Brand Health Report">Brand Health Report</option>
              <option value="Identity Report">Identity Specification Dossier</option>
              <option value="Campaign Report">Omnichannel Campaign Report</option>
              <option value="Client Report">Client Strategic Review</option>
              <option value="Creative Performance">Creative Velocity Matrix</option>
              <option value="Brand Consistency Report">Brand Consistency Audit</option>
            </select>
          </div>
          <div class="modal-footer-actions text-right mt-16">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm btn-glow">Compile Report</button>
          </div>
        </form>
      `);
    }

    createNewReport() {
      const title = document.getElementById("new-rep-title").value.trim();
      const type = document.getElementById("new-rep-type").value;

      const newRep = {
        id: `rep-${Date.now()}`,
        title: title || "Brand Intelligence Brief",
        type,
        date: "Today",
        pages: "16 Pages",
        score: "97.4%"
      };

      this.state.reports.unshift(newRep);
      this.saveState();
      this.closeModal();
      this.renderReports();
      this.showToast(`Report '${newRep.title}' generated dynamically`, "success");
    }

    // ==========================================================================
    // 21. NOTIFICATION CENTER
    // ==========================================================================
    renderNotifications() {
      const listEl = document.getElementById("notifications-full-list");
      const topListEl = document.getElementById("top-notif-list");
      if (!listEl) return;

      const unreadCount = this.state.notifications.filter(n => !n.read).length;
      
      const badgeSide = document.getElementById("badge-notif-sidebar");
      if (badgeSide) badgeSide.textContent = unreadCount;

      const badgeTop = document.getElementById("badge-topbar-notif");
      if (badgeTop) {
        if (unreadCount > 0) badgeTop.classList.remove("hidden");
        else badgeTop.classList.add("hidden");
      }

      listEl.innerHTML = this.state.notifications.map(n => `
        <div class="notification-full-row ${n.read ? '' : 'unread'}">
          <div class="notif-left-group">
            <div class="notif-icon-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <div class="notif-text-block">
              <span class="notif-title-text">${n.title}</span>
              <p class="text-dim" style="font-size:12.5px;">${n.desc}</p>
              <span class="notif-time-text">${n.time}</span>
            </div>
          </div>
          <div style="display:flex;gap:6px;">
            ${n.read ? '' : `<button type="button" class="btn btn-secondary btn-xs" onclick="window.BrandoraApp.markNotificationRead('${n.id}')">Mark Read</button>`}
            <button type="button" class="btn-icon-subtle" onclick="window.BrandoraApp.deleteNotification('${n.id}')" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      `).join("");

      if (topListEl) {
        topListEl.innerHTML = this.state.notifications.slice(0, 4).map(n => `
          <div class="dropdown-item" style="cursor:default;">
            <div style="display:flex;flex-direction:column;gap:2px;">
              <strong style="color:#FFF;font-size:12px;">${n.title}</strong>
              <span style="font-size:11px;color:var(--text-dim);">${n.desc}</span>
            </div>
          </div>
        `).join("");
      }
    }

    markNotificationRead(id) {
      const n = this.state.notifications.find(x => x.id === id);
      if (n) {
        n.read = true;
        this.saveState();
        this.renderNotifications();
      }
    }

    markAllNotificationsRead() {
      this.state.notifications.forEach(n => n.read = true);
      this.saveState();
      this.renderNotifications();
      this.showToast("All notifications marked read", "info");
    }

    deleteNotification(id) {
      this.state.notifications = this.state.notifications.filter(n => n.id !== id);
      this.saveState();
      this.renderNotifications();
    }

    clearAllNotifications() {
      this.state.notifications = [];
      this.saveState();
      this.renderNotifications();
      this.showToast("All notifications cleared", "info");
    }

    // ==========================================================================
    // 22. MESSAGING SYSTEM (STUDIO CHAT)
    // ==========================================================================
    renderChatThreads(query = "") {
      const container = document.getElementById("messenger-threads-list");
      if (!container) return;

      let list = this.state.chatThreads;
      if (query) {
        list = list.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.role.toLowerCase().includes(query.toLowerCase()));
      }

      container.innerHTML = list.map(t => {
        const isActive = t.id === this.activeChatThreadId;
        const lastMsg = t.messages[t.messages.length - 1];
        return `
          <div class="thread-row ${isActive ? 'active' : ''}" onclick="window.BrandoraApp.selectChatThread('${t.id}')">
            <div class="user-avatar-sm">${t.avatar}</div>
            <div class="thread-meta-info">
              <div class="thread-name-row">
                <span class="thread-name">${t.name}</span>
                <span class="thread-time">${t.time}</span>
              </div>
              <p class="thread-snippet">${lastMsg ? lastMsg.text : 'No messages yet'}</p>
            </div>
          </div>
        `;
      }).join("");

      this.renderActiveChatMessages();
    }

    selectChatThread(threadId) {
      this.activeChatThreadId = threadId;
      this.renderChatThreads();
    }

    filterChatThreads(val) {
      this.renderChatThreads(val.trim());
    }

    renderActiveChatMessages() {
      const thread = this.state.chatThreads.find(t => t.id === this.activeChatThreadId) || this.state.chatThreads[0];
      if (!thread) return;

      const avatarEl = document.getElementById("chat-active-avatar");
      const nameEl = document.getElementById("chat-active-name");
      const roleEl = document.getElementById("chat-active-role");
      const messagesArea = document.getElementById("active-chat-messages");

      if (avatarEl) avatarEl.textContent = thread.avatar;
      if (nameEl) nameEl.textContent = thread.name;
      if (roleEl) roleEl.textContent = `${thread.role} • Online`;

      if (messagesArea) {
        messagesArea.innerHTML = thread.messages.map(m => `
          <div class="chat-bubble ${m.outgoing ? 'outgoing' : 'incoming'}">
            <div class="chat-bubble-content">${m.text}</div>
            <span class="chat-bubble-time">${m.time}</span>
          </div>
        `).join("");

        messagesArea.scrollTop = messagesArea.scrollHeight;
      }
    }

    sendChatMessage() {
      const input = document.getElementById("chat-composer-input");
      if (!input) return;

      const text = input.value.trim();
      if (!text) return;

      const thread = this.state.chatThreads.find(t => t.id === this.activeChatThreadId);
      if (!thread) return;

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      thread.messages.push({
        sender: "Elena",
        text,
        time: timeStr,
        outgoing: true
      });

      input.value = "";
      this.saveState();
      this.renderActiveChatMessages();

      // Simulated realistic reply after 700ms
      setTimeout(() => {
        const replies = [
          "Received! Splicing that right into the vector assets repository.",
          "Agreed. That preserves our 98% brand consistency standard perfectly.",
          "Reviewing now—this typographic hierarchy is exceptional.",
          "Approved! I'll dispatch the updated brief to the Swiss production partner."
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        thread.messages.push({
          sender: thread.name.split(" ")[0],
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          outgoing: false
        });
        this.saveState();
        this.renderActiveChatMessages();
      }, 700);
    }

    // ==========================================================================
    // 23. GLOBAL SEARCH ENGINE
    // ==========================================================================
    initGlobalSearch() {
      const input = document.getElementById("global-search-input");
      const dropdown = document.getElementById("search-results-dropdown");
      const list = document.getElementById("search-results-list");
      if (!input || !dropdown || !list) return;

      input.addEventListener("input", (e) => {
        const q = e.target.value.trim().toLowerCase();
        if (!q) {
          dropdown.classList.add("hidden");
          return;
        }

        const results = [];

        // Search brands
        Object.values(this.state.brands).forEach(b => {
          if (b.name.toLowerCase().includes(q) || b.tagline.toLowerCase().includes(q)) {
            results.push({ category: "Brand", title: b.name, desc: b.tagline, view: "workspace" });
          }
        });

        // Search projects
        this.state.projects.forEach(p => {
          if (p.title.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)) {
            results.push({ category: "Project", title: p.title, desc: p.client, view: "projects" });
          }
        });

        // Search assets
        this.state.assets.forEach(a => {
          if (a.name.toLowerCase().includes(q) || a.type.toLowerCase().includes(q)) {
            results.push({ category: "Asset", title: a.name, desc: a.type, view: "assets" });
          }
        });

        // Search clients
        this.state.clients.forEach(c => {
          if (c.company.toLowerCase().includes(q) || c.contact.toLowerCase().includes(q)) {
            results.push({ category: "Client", title: c.company, desc: c.contact, view: "clients" });
          }
        });

        // Search tasks
        this.state.tasks.forEach(t => {
          if (t.title.toLowerCase().includes(q)) {
            results.push({ category: "Task", title: t.title, desc: t.priority, view: "tasks" });
          }
        });

        // Search logos
        this.state.logos.forEach(l => {
          if (l.name.toLowerCase().includes(q) || l.style.toLowerCase().includes(q)) {
            results.push({ category: "Logo", title: l.name, desc: l.style, view: "logo-lab" });
          }
        });

        if (results.length === 0) {
          list.innerHTML = `<div style="padding:14px;color:var(--text-dim);font-size:13px;text-align:center;">No studio entities matched "${q}"</div>`;
        } else {
          list.innerHTML = results.slice(0, 6).map(r => `
            <div class="search-result-row" onclick="window.BrandoraApp.navigateTo('${r.view}'); document.getElementById('search-results-dropdown').classList.add('hidden');">
              <span class="search-res-badge">${r.category}</span>
              <div class="search-res-text">
                <strong>${r.title}</strong>
                <span class="text-dim" style="font-size:11px;margin-left:6px;">${r.desc}</span>
              </div>
            </div>
          `).join("");
        }

        dropdown.classList.remove("hidden");
      });

      // Keyboard shortcut '/'
      window.addEventListener("keydown", (e) => {
        if (e.key === "/" && document.activeElement !== input) {
          e.preventDefault();
          input.focus();
        }
      });

      // Click outside closes dropdown
      document.addEventListener("click", (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.add("hidden");
        }
      });
    }

    // ==========================================================================
    // 24. SETTINGS & LOCAL STORAGE
    // ==========================================================================
    applySavedSettings() {
      const s = this.state.settings;
      if (s.compact) {
        document.body.classList.add("compact-ui");
      } else {
        document.body.classList.remove("compact-ui");
      }
      
      const glowChk = document.getElementById("setting-glow-effects");
      const compChk = document.getElementById("setting-compact-mode");
      const animChk = document.getElementById("setting-animations");

      if (glowChk) glowChk.checked = s.glow;
      if (compChk) compChk.checked = s.compact;
      if (animChk) animChk.checked = s.animations;
    }

    toggleSetting(key, val) {
      this.state.settings[key] = val;
      this.saveState();
      this.applySavedSettings();
      this.showToast(`Updated studio preference: ${key}`, "info");
    }

    saveSettings() {
      this.saveState();
      this.showToast("All workspace preferences updated and saved", "success");
    }

    exportWorkspaceData() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `BRANDORA_STUDIO_BACKUP_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      this.showToast("Exported LocalStorage studio snapshot", "success");
    }

    importWorkspaceData(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (imported && imported.brands) {
            this.state = imported;
            this.saveState();
            this.renderAllViews();
            this.showToast("Studio database restored from backup JSON", "success");
          } else {
            this.showToast("Invalid BRANDORA backup schema", "danger");
          }
        } catch (err) {
          this.showToast("Failed to parse JSON file", "danger");
        }
      };
      reader.readAsText(file);
    }

    confirmResetDemoData() {
      this.openModal("Confirm Studio Reset", `
        <p class="text-dim mb-16">This will restore all brands, projects, clients, assets, palettes, and tasks to default baseline settings.</p>
        <div class="modal-footer-actions text-right">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
          <button type="button" class="btn btn-danger-outline btn-sm" onclick="window.BrandoraApp.executeResetDemoData()">Confirm Reset</button>
        </div>
      `);
    }

    executeResetDemoData() {
      this.state = JSON.parse(JSON.stringify(DEFAULT_DATA));
      this.state.auth.isLoggedIn = true;
      this.saveState();
      this.closeModal();
      this.renderAllViews();
      this.showToast("Studio database successfully re-initialized", "success");
    }

    // ==========================================================================
    // 25. QUICK CREATE MODAL & ACTIONS
    // ==========================================================================
    toggleQuickCreateDropdown() {
      const el = document.getElementById("quick-create-dropdown");
      if (el) el.classList.toggle("hidden");
    }

    toggleNotifDropdown() {
      const el = document.getElementById("top-notif-dropdown");
      if (el) el.classList.toggle("hidden");
    }

    toggleUserDropdown() {
      const el = document.getElementById("user-menu-dropdown");
      if (el) el.classList.toggle("hidden");
    }

    closeDropdowns() {
      const ids = ["quick-create-dropdown", "top-notif-dropdown", "user-menu-dropdown"];
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
      });
    }

    openQuickModal(type) {
      this.closeDropdowns();
      if (type === "brand") {
        this.openModal("Create Brand Entity", `
          <form onsubmit="event.preventDefault(); window.BrandoraApp.createQuickBrand();">
            <div class="form-group">
              <label class="form-label">Brand Name</label>
              <input type="text" id="qb-name" class="form-input" placeholder="e.g. Hyperion Bio" required>
            </div>
            <div class="form-group">
              <label class="form-label">Tagline</label>
              <input type="text" id="qb-tagline" class="form-input" placeholder="e.g. Next-Generation Cellular Diagnostics" required>
            </div>
            <div class="form-group">
              <label class="form-label">Industry</label>
              <input type="text" id="qb-industry" class="form-input" placeholder="e.g. Synthetic Biology" required>
            </div>
            <div class="modal-footer-actions text-right mt-16">
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm btn-glow">Establish Brand</button>
            </div>
          </form>
        `);
      } else if (type === "project") {
        this.openModal("Create New Project", `
          <form onsubmit="event.preventDefault(); window.BrandoraApp.createQuickProject();">
            <div class="form-group">
              <label class="form-label">Project Title</label>
              <input type="text" id="qp-title" class="form-input" placeholder="e.g. Packaging System 2026" required>
            </div>
            <div class="form-group">
              <label class="form-label">Client</label>
              <input type="text" id="qp-client" class="form-input" value="${this.state.brands[this.state.activeBrandId].name}" required>
            </div>
            <div class="overview-dual-grid">
              <div class="form-group">
                <label class="form-label">Deadline</label>
                <input type="text" id="qp-deadline" class="form-input" value="Oct 20, 2026" required>
              </div>
              <div class="form-group">
                <label class="form-label">Budget</label>
                <input type="text" id="qp-budget" class="form-input" value="$50,000" required>
              </div>
            </div>
            <div class="modal-footer-actions text-right mt-16">
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm btn-glow">Create Project</button>
            </div>
          </form>
        `);
      } else if (type === "asset") {
        this.openNewAssetModal();
      } else if (type === "task") {
        this.openModal("Create Sprint Task", `
          <form onsubmit="event.preventDefault(); window.BrandoraApp.createQuickTask();">
            <div class="form-group">
              <label class="form-label">Task Deliverable</label>
              <input type="text" id="qt-title" class="form-input" placeholder="e.g. Render dark mode contrast tokens" required>
            </div>
            <div class="overview-dual-grid">
              <div class="form-group">
                <label class="form-label">Priority</label>
                <select id="qt-priority" class="form-input">
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Assignee</label>
                <select id="qt-member" class="form-input">
                  ${this.state.team.map(m => `<option value="${m.name}">${m.name}</option>`).join("")}
                </select>
              </div>
            </div>
            <div class="modal-footer-actions text-right mt-16">
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm btn-glow">Add Task</button>
            </div>
          </form>
        `);
      } else if (type === "client") {
        this.openModal("Onboard New Client", `
          <form onsubmit="event.preventDefault(); window.BrandoraApp.createQuickClient();">
            <div class="form-group">
              <label class="form-label">Company Name</label>
              <input type="text" id="qc-company" class="form-input" placeholder="e.g. Kinesis Robotics" required>
            </div>
            <div class="form-group">
              <label class="form-label">Lead Contact</label>
              <input type="text" id="qc-contact" class="form-input" placeholder="e.g. Dr. Jennifer Vance" required>
            </div>
            <div class="form-group">
              <label class="form-label">Industry</label>
              <input type="text" id="qc-industry" class="form-input" placeholder="e.g. Autonomous Transit" required>
            </div>
            <div class="modal-footer-actions text-right mt-16">
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.BrandoraApp.closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm btn-glow">Onboard Client</button>
            </div>
          </form>
        `);
      }
    }

    createQuickBrand() {
      const name = document.getElementById("qb-name").value.trim();
      const tagline = document.getElementById("qb-tagline").value.trim();
      const industry = document.getElementById("qb-industry").value.trim();
      const id = name.toLowerCase().replace(/\s+/g, '_');

      this.state.brands[id] = {
        id,
        name: name || "New Brand",
        tagline: tagline || "Built to endure.",
        industry: industry || "Technology",
        description: `${name} is pioneering breakthrough innovations in ${industry}.`,
        audience: "Early Adopters, Industry Leaders",
        personality: "Visionary, Crisp, Bold",
        voice: "Confident, Authoritative",
        positioning: "Tier 1 Enterprise Category Creator",
        mission: "Delivering lasting value through precision craftsmanship.",
        vision: "Shaping the future of global markets.",
        values: "Excellence, Integrity, Impact"
      };

      // Add to select dropdown
      const select = document.getElementById("active-brand-select");
      if (select) {
        const opt = document.createElement("option");
        opt.value = id;
        opt.textContent = name;
        select.appendChild(opt);
      }

      this.switchBrand(id);
      this.closeModal();
      this.showToast(`Brand '${name}' established successfully`, "success");
    }

    createQuickProject() {
      const title = document.getElementById("qp-title").value.trim();
      const client = document.getElementById("qp-client").value.trim();
      const deadline = document.getElementById("qp-deadline").value.trim();
      const budget = document.getElementById("qp-budget").value.trim();

      const newPrj = {
        id: `prj-${Date.now()}`,
        title: title || "New Project",
        client: client || "Active Brand",
        deadline: deadline || "Next Month",
        team: "Elena Vance",
        status: "Planning",
        progress: 0,
        budget: budget || "$25,000"
      };

      this.state.projects.unshift(newPrj);
      this.saveState();
      this.closeModal();
      this.renderProjects();
      this.showToast(`Created project '${newPrj.title}'`, "success");
    }

    createQuickTask() {
      const title = document.getElementById("qt-title").value.trim();
      const priority = document.getElementById("qt-priority").value;
      const member = document.getElementById("qt-member").value;

      const newTask = {
        id: `tsk-${Date.now()}`,
        title: title || "Studio Task",
        priority,
        dueDate: "Next Week",
        member,
        completed: false
      };

      this.state.tasks.unshift(newTask);
      this.saveState();
      this.closeModal();
      this.renderTasks();
      this.showToast(`Assigned task '${newTask.title}' to ${member}`, "success");
    }

    createQuickClient() {
      const company = document.getElementById("qc-company").value.trim();
      const contact = document.getElementById("qc-contact").value.trim();
      const industry = document.getElementById("qc-industry").value.trim();

      const newClient = {
        id: `cl-${Date.now()}`,
        company: company || "Enterprise Partner",
        contact: contact || "Lead Director",
        industry: industry || "Technology",
        projects: 1,
        score: 95,
        status: "Active",
        manager: this.state.auth.user.name
      };

      this.state.clients.unshift(newClient);
      this.saveState();
      this.closeModal();
      this.renderClients();
      this.showToast(`Onboarded client: ${newClient.company}`, "success");
    }

    // ==========================================================================
    // 26. UNIVERSAL MODAL SYSTEM
    // ==========================================================================
    openModal(title, bodyHtml) {
      const modal = document.getElementById("universal-modal");
      const titleEl = document.getElementById("modal-title");
      const bodyEl = document.getElementById("modal-body");
      if (!modal || !titleEl || !bodyEl) return;

      titleEl.textContent = title;
      bodyEl.innerHTML = bodyHtml;
      modal.classList.remove("hidden");
    }

    closeModal() {
      const modal = document.getElementById("universal-modal");
      if (modal) modal.classList.add("hidden");
    }

    showLegalModal(type) {
      this.openModal(`BRANDORA — ${type}`, `
        <div style="font-size:13.5px; line-height:1.6; color:var(--text-main);">
          <p class="mb-12"><strong>Effective Date: September 2026</strong></p>
          <p class="mb-12">BRANDORA operates on a zero-telemetry, offline-first paradigm. All proprietary brand identity blueprints, typography tokens, vector emblems, and client rosters remain strictly contained inside your browser's persistent LocalStorage engine.</p>
          <p class="mb-12">We do not sell, transfer, or ingest your design assets for public artificial intelligence training models.</p>
          <p>&copy; 2026 BRANDORA Creative Technology Collective. All rights reserved.</p>
        </div>
        <div class="text-right mt-16">
          <button type="button" class="btn btn-primary btn-sm btn-glow" onclick="window.BrandoraApp.closeModal()">Acknowledged</button>
        </div>
      `);
    }

    // ==========================================================================
    // 27. TOAST NOTIFICATION ENGINE
    // ==========================================================================
    showToast(message, type = "success") {
      const container = document.getElementById("toast-container");
      if (!container) return;

      const toast = document.createElement("div");
      toast.className = `toast`;
      
      let iconSvg = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
      if (type === "danger") {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
      } else if (type === "info") {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
      }

      toast.innerHTML = `
        <div class="toast-icon-wrap ${type}">
          ${iconSvg}
        </div>
        <div class="toast-content">${message}</div>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.classList.add("toast-leave");
        setTimeout(() => toast.remove(), 250);
      }, 3400);
    }

    copyToClipboard(text, successMsg) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
          this.showToast(successMsg, "success");
        }).catch(() => {
          this.fallbackCopy(text, successMsg);
        });
      } else {
        this.fallbackCopy(text, successMsg);
      }
    }

    fallbackCopy(text, successMsg) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        this.showToast(successMsg, "success");
      } catch (err) {
        this.showToast("Failed copying to clipboard", "danger");
      }
      textArea.remove();
    }

    // ==========================================================================
    // 28. EVENT LISTENERS & DELEGATION
    // ==========================================================================
    setupEventListeners() {
      // Sidebar Navigation Click
      document.querySelectorAll(".sidebar-nav .nav-item").forEach(btn => {
        btn.addEventListener("click", () => {
          const target = btn.getAttribute("data-view");
          this.navigateTo(target);
        });
      });

      // Sidebar Collapse Toggle
      const collapseBtn = document.getElementById("btn-sidebar-collapse");
      if (collapseBtn) {
        collapseBtn.addEventListener("click", () => {
          const sidebar = document.getElementById("sidebar");
          if (sidebar) sidebar.classList.toggle("collapsed");
        });
      }

      // Mobile Navigation Drawer Toggle
      const mobileToggle = document.getElementById("btn-mobile-nav");
      if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
          const sidebar = document.getElementById("sidebar");
          if (sidebar) sidebar.classList.toggle("mobile-open");
        });
      }

      // Universal Modal Escape Key & Click Backdrop
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeModal();
          this.closeDropdowns();
        }
      });

      const modalBackdrop = document.getElementById("universal-modal");
      if (modalBackdrop) {
        modalBackdrop.addEventListener("click", (e) => {
          if (e.target === modalBackdrop) this.closeModal();
        });
      }

      // Global click closes dropdowns
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".dropdown-wrapper")) {
          this.closeDropdowns();
        }
      });

      this.initGlobalSearch();
    }

    // ==========================================================================
    // 29. BULK RENDER ORCHESTRATOR
    // ==========================================================================
    renderOverview() {
      const b = this.state.brands[this.state.activeBrandId];
      if (!b) return;

      const setText = (id, txt) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
      };

      setText("active-brand-banner-title", b.name);
      setText("ov-attr-industry", b.industry);
      setText("ov-attr-personality", b.personality);
      setText("ov-attr-voice", b.voice);
      setText("kpi-projects-val", this.state.projects.length);
      setText("kpi-clients-val", this.state.clients.length);
      setText("kpi-assets-val", this.state.assets.length);

      this.renderOverviewProjects();
      this.renderOverviewTasks();
    }

    renderAllViews() {
      this.updateSidebarBrandSelect();
      this.renderOverview();
      this.renderBrandWorkspace();
      this.renderIdentityPillars();
      this.renderLogos();
      this.renderPaletteSwatches();
      this.renderTypographySettings();
      this.renderMoodboard();
      this.renderAssets();
      this.renderProjects();
      this.renderContent();
      this.renderClients();
      this.renderTeam();
      this.renderTasks();
      this.renderCalendar();
      this.renderAnalyticsCharts();
      this.renderReports();
      this.renderNotifications();
      this.renderChatThreads();
    }
  }

  // Instantiate on DOM Ready
  document.addEventListener("DOMContentLoaded", () => {
    window.BrandoraApp = new BrandoraEngine();
    window.BrandoraApp.init();
  });

})();
