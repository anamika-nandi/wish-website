import code from "@/public/landingpage/code.jpg";
import code2 from "@/public/landingpage/code2.jpg";

export const landingpageContent = {
  header: {
    companyName: "Next.js Supabase Boilerplate",
    NavAndFooterLinks: [
      {
        active: false,
        text: "Setup",
        href: "#setup",
      },
      {
        active: false,
        text: "Features",
        href: "#features",
      },
    ],
    button: {
      active: true,
      text: "Get Started",
      href: "/signin",
    },
  },
  hero: {
    preHeadline: "Effortless Project Initialization",
    headline: "Next.js and Supabase",
    highlightedText: "Boilerplate Setup",
    suffix: "Simplified",
    subheadline:
      "Kickstart your project with an easy-to-use template for rapid landing page validation and development.",
    cta: {
      actions: {
        email: {
          active: true,
          placeholder: "Enter your email for updates",
        },
        links: {
          howItWorks: {
            active: false,
            text: "Learn More",
            link: "#setup",
          },
        },
      },
      button: {
        text: "Get Started",
        link: "/signup",
      },
    },
  },
  primaryfeatures: {
    id: "features",
    headline: "Why Choose This",
    highlightedText: "Boilerplate",
    suffix: "Setup",
    subheadline:
      "Experience the ease and efficiency of starting your project with our comprehensive boilerplate.",
    features: [
      {
        title: "Quick Setup",
        description:
          "Clone the repository, install dependencies, and start your server in minutes.",
        image: code,
      },
      {
        title: "Seamless Integration",
        description:
          "Easily integrate with Supabase for authentication, database management, and more.",
        image: code2,
      },
      {
        title: "Optimized for Development",
        description:
          "Pre-configured settings and tools to streamline your development process.",
        image: code,
      },
      {
        title: "Landing Page Validation",
        description:
          "Validate your landing page concepts quickly with built-in components and templates.",
        image: code2,
      },
    ],
  },
  secondaryFeature: {
    id: "setup",
    headline: "Get Started",
    highlightedText: "in 3 Simple Steps",
    suffix: "",
    subheadline:
      "Follow these steps to set up your Next.js and Supabase project effortlessly.",
    howItWorks: [
      {
        step: "Clone the Repository",
        summary: "Get the codebase locally.",
        description: "Use Git to clone the repository to your local machine.",
        iconKey: "clone",
      },
      {
        step: "Install Dependencies",
        summary: "Set up your project environment.",
        description: "Run `npm install` to install all necessary dependencies.",
        iconKey: "install",
      },
      {
        step: "Start the Development Server",
        summary: "Launch your project.",
        description:
          "Run `npm run dev` to start the development server and see your project in action.",
        iconKey: "start",
      },
    ],
  },
  imageSection: {
    id: "image-section",
    features: [
      {
        title: "Pre-built Components",
        description:
          "Utilize a library of pre-built components to speed up your development process.",
        image: "",
        background: "bg-stone-900",
      },
      {
        title: "Responsive Design",
        description:
          "Ensure your landing page looks great on all devices with responsive design principles.",
        image: code,
        background: "",
      },
      {
        title: "Customizable Templates",
        description:
          "Easily customize templates to match your brand and project requirements.",
        image: code2,
        background: "",
      },
      {
        title: "SEO Optimized",
        description:
          "Improve your search engine ranking with SEO best practices integrated into the boilerplate.",
        image: "",
        background: "bg-accent",
      },
    ],
  },
  emailSignUp: {
    id: "email-sign-up",
    headline: "Stay Updated",
    highlightedText: "with Our Progress",
    suffix: "",
    subheadline:
      "Enter your email to receive the latest updates and features for our Next.js and Supabase boilerplate.",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
  },
};
