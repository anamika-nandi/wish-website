import placeholder from "@/public/landingpage/bluebackground.png";

export const landingpageContent = {
  hero: {
    preHeadline: " Seamless surfboard rentals",
    headline: "Renting Surfboards",
    highlightedText: "Made Effortless",
    suffix: "for Small Businesses",
    subheadline:
      "Discover the Ultimate Marketplace for Renting Surfboards and Enhancing Your Surfing Adventures",
    cta: {
      actions: {
        email: {
          active: true,
          placeholder: "Enter your email address",
        },
        links: {
          howItWorks: {
            active: false,
            text: "How It Works",
            link: "#how-it-works",
          },
        },
      },
      button: {
        text: "Get Started",
        link: "/?onboarding=shop",
      },
    },
  },
  primaryfeatures: {
    id: "features",
    headline: "Enhance and Expand ",
    highlightedText: " Your Surf Shop’s",
    suffix: "Reach",
    subheadline:
      "Attract more surfers effortlessly, streamline your rental management, and grow your business with our all-in-one platform.",
    features: [
      {
        title: "Expand Your Reach",
        description:
          "Connect with a global community of surfers seeking rental options. Increase your shop’s visibility and attract more customers.",
        // google seo search result screenshot
        image: placeholder,
      },
      {
        title: "Easy Management",
        description:
          "Manage your listings, bookings, and customer interactions from a single, user-friendly platform.",
        image: placeholder,
      },
      {
        title: "Surfboard Recommendation Tool",
        description:
          "Our personalized recommendation tool helps surfers find the right board, increasing your chances of rentals.",
        image: placeholder,
      },
      {
        title: "Maximize Your Online Visibility",
        description:
          "Our marketplace is SEO-optimized to ensure your surf shop appears at the top of search results. When users search for 'surfboard rentals near me,' your listings will be among the first they see, driving more traffic and bookings to your shop.",
        image: placeholder,
      },
    ],
  },
  secondaryFeature: {
    id: "how-it-works",
    headline: "How We Simplify ",
    highlightedText: "Your Operations",
    suffix: "",
    subheadline:
      "Our platform is designed to simplify your booking processes, attract more customers, and help you grow your surf shop. Here’s how it works:",
    howItWorks: [
      {
        step: "Create a Business Account",
        summary:
          "Stay on top of things with always up-to-date reporting features.",
        description:
          "Sign up and create a detailed profile for your shop, including location, rental options, and pricing.",
        image: placeholder,
        iconKey: "search",
      },
      {
        step: "List Your Surfboards",
        summary:
          "Never lose track of what’s in stock with accurate inventory tracking.",
        description:
          "Easily add your surfboards and equipment to our platform, making them available to a wide audience of surfers.",
        image: placeholder,
        iconKey: "book",
      },
      {
        // do fake google search result screenshot
        step: "Attract More Surfers",
        summary:
          "Reach a global community of surfers and increase your bookings.",
        description:
          "Our platform’s SEO optimization ensures your listings are visible to surfers searching for rentals near their location.",
        image: placeholder,
        iconKey: "reviews",
      },
    ],
  },
  imageSection: {
    id: "image-section",
    features: [
      {
        title: "Amplify Your Visibility",
        description:
          "Lorem ipsum dolor sit amet consectetur. Suspendisse eu consequat nulla tortor nulla.",
        image: "",
        background: "bg-stone-900",
      },
      {
        title: "Increase Your Sales",
        description:
          "Lorem ipsum dolor sit amet consectetur. Suspendisse eu consequat nulla tortor nulla.",
        image: placeholder,
        background: "",
      },
      {
        title: "Streamlined Management",
        description:
          "Lorem ipsum dolor sit amet consectetur. Suspendisse eu consequat nulla tortor nulla.",
        image: placeholder,
        background: "",
      },
      {
        title: "Get Started Today",
        description:
          "Lorem ipsum dolor sit amet consectetur. Suspendisse eu consequat nulla tortor nulla.",
        image: "",
        background: "bg-accent-400",
      },
    ],
  },
  emailSignUp: {
    id: "email-sign-up",
    headline: "Join our marketplace",
    highlightedText: "today",
    suffix: "",
    subheadline:
      "Discover the Ultimate Marketplace for Renting Surfboards and Enhancing Your",
    placeholder: "Enter your email",
    buttonText: "Get Started",
  },
};
