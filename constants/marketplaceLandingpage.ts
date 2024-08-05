import screenshotDefault from "@/public/screenshots/contacts.png";

export const marketplaceLandingpageContent = {
  hero: {
    preHeadline: " Seamless surfboard rentals",
    headline: "Explore Surfboard Rentals",
    highlightedText: "finally Effortlessly",
    suffix: "Wherever You Surf",
    subheadline:
      "Discover the Ultimate Marketplace for Renting Surfboards and Enhancing Your Surfing Adventures",

    cta: {
      actions: {
        email: {
          active: false,
          placeholder: "Enter your email address",
        },
        links: {
          howItWorks: {
            active: true,
            text: "How It Works",
            link: "#how-it-works",
          },
        },
      },
      button: {
        text: "Get Started",
        link: "/?onboarding=user",
      },
    },
  },
  primaryfeatures: {
    id: "features",
    headline: "Everything You Need for",
    highlightedText: "Your Surfing",
    suffix: "Adventures",
    subheadline:
      "Find, book, and rent surfboards with ease using our all-in-one platform designed for surfers like you.",
    features: [
      {
        title: "Global Surfboard Rentals",
        description:
          "Browse a wide selection of surfboards available for rent at your destination, no matter where you are in the world.",
        image: screenshotDefault,
      },
      {
        title: "Simple Booking Process",
        description:
          "Easily book your surfboard rental through a user-friendly interface. Reserve your board in advance and ensure it's ready when you arrive.",
        image: screenshotDefault,
      },
      {
        title: "Personalized Recommendations",
        description:
          "Get tailored surfboard recommendations based on your skill level and preferences to find the perfect board for your surf session.",
        image: screenshotDefault,
      },
      {
        title: "Top-Notch Shop Visibility",
        description:
          "Our marketplace is designed to feature the best surf shops and boards, so you can trust you're getting quality equipment from reputable shops.",
        image: screenshotDefault,
      },
    ],
  },
  secondaryFeature: {
    id: "how-it-works",
    headline: "How It Works",
    highlightedText: "Your Operations",
    suffix: "",
    subheadline:
      "Our platform is designed to make your surfboard rental experience smooth and hassle-free. Here’s how it works:",
    howItWorks: [
      {
        step: "Search for Surfboards",
        summary:
          "Find surfboards available for rent near your location or at your travel destination.",
        description:
          "Use our search feature to explore surfboard listings, read reviews, and compare options from various surf shops.",
        image: screenshotDefault,
        iconKey: "search",
      },
      {
        step: "Book Your Board",
        summary: "Secure your rental quickly and easily.",
        description:
          "Select your surfboard, choose your rental period, and book it through our platform. Confirm your reservation and receive instant booking details.",
        image: screenshotDefault,
        iconKey: "book",
      },
      {
        step: "Pick Up and Ride",
        summary: "Get ready to hit the waves.",
        description:
          "Pick up your rented surfboard from the designated shop, or arrange for delivery if offered. Enjoy your surfing experience with the perfect board.",
        image: screenshotDefault,
        iconKey: "reviews",
      },
    ],
  },
  emailSignUp: {
    id: "email-sign-up",
    headline: "Join our marketplace",
    highlightedText: "today",
    suffix: "",
    subheadline:
      "Sign up to receive updates and get early access to our marketplace. Start your surfing adventures with the best boards available.",
    placeholder: "Enter your email",
    buttonText: "Get Started",
  },
};
