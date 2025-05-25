import type { SEOConfig } from "../types/seo";

export const pageSeo: Record<string, SEOConfig> = {
  home: {
    title: "Digital Marketing Services for Purpose-Driven Brands",
    description:
      "Expert digital marketing services including social media strategy, content creation, Meta & Google ads, and branding for purpose-driven small businesses. Get a free strategy call today.",
    keywords:
      "digital marketing services, social media marketing, Meta ads, Google ads, content creation, branding, small business marketing, purpose-driven brands, marketing strategy, paid advertising",
    ogImage: "/images/og-homepage.jpg",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Tarsier Digital Solutions",
      alternateName: "Tarsier Digital",
      description:
        "Expert digital marketing services including social media strategy, content creation, Meta & Google ads, and branding for purpose-driven small businesses. Get a free strategy call today.",
      url: "https://tarsierdigital.com",
      logo: "https://tarsierdigital.com/images/logo.png",
      founder: {
        "@type": "Person",
        name: "Camille Nicole",
        jobTitle: "Digital Marketing Specialist & Founder",
        description:
          "Former educator turned digital marketer specializing in helping purpose-driven brands tell their story.",
        image: "https://tarsierdigital.com/images/camille-high-def.webp",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@tarsierdigital.com",
        availableLanguage: ["English"],
      },
      service: [
        {
          "@type": "Service",
          name: "Digital Marketing Strategy",
          description:
            "Custom marketing plans to guide your brand's growth and connect with your ideal audience.",
        },
        {
          "@type": "Service",
          name: "Content Creation",
          description:
            "Engaging social media posts, graphics, and videos that showcase your brand's unique story.",
        },
        {
          "@type": "Service",
          name: "Paid Advertising",
          description:
            "Targeted Meta and Google ad campaigns to reach new customers and grow your business.",
        },
        {
          "@type": "Service",
          name: "Branding Services",
          description:
            "Visual identity and messaging that creates consistency and recognition for your business.",
        },
      ],
      areaServed: "Worldwide",
      knowsAbout: [
        "Digital Marketing",
        "Social Media Marketing",
        "Content Creation",
        "Paid Advertising",
        "Meta Ads",
        "Google Ads",
        "Brand Development",
      ],
      sameAs: [
        "https://www.linkedin.com/company/tarsier-digital-solutions",
        "https://www.instagram.com/tarsierdigital",
        "https://www.facebook.com/tarsierdigital",
      ],
    },
  },

  services: {
    title: "Digital Marketing Services & Pricing - Social Media Management",
    description:
      "Professional social media marketing services and packages for businesses. Content creation, community management, growth strategy, and performance reporting. Starting at 4,000 NOK/month.",
    keywords:
      "social media marketing services, social media management packages, content creation services, digital marketing pricing, Instagram marketing, Facebook marketing, LinkedIn marketing",
    ogImage: "/images/og-services.jpg",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Digital Marketing Services",
      description:
        "Professional social media marketing services and packages for businesses. Content creation, community management, growth strategy, and performance reporting. Starting at 4,000 NOK/month.",
      provider: {
        "@type": "Organization",
        name: "Tarsier Digital Solutions",
        url: "https://tarsierdigital.com",
      },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Social Media Marketing Packages",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Basic Social Media Package",
              description:
                "8 social media posts per month, content creation for 1 platform, monthly performance report",
            },
            price: "4000",
            priceCurrency: "NOK",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "4000",
              priceCurrency: "NOK",
              billingDuration: "P1M",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Standard Social Media Package",
              description:
                "16 social media posts per month, content creation for 2 platforms, bi-weekly performance reports",
            },
            price: "8000",
            priceCurrency: "NOK",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "8000",
              priceCurrency: "NOK",
              billingDuration: "P1M",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Premium Social Media Package",
              description:
                "24 social media posts per month, content creation for 3 platforms, weekly performance reports",
            },
            price: "12000",
            priceCurrency: "NOK",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "12000",
              priceCurrency: "NOK",
              billingDuration: "P1M",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Enterprise Social Media Package",
              description:
                "40 social media posts per month, content creation for all platforms, weekly reports with strategy calls",
            },
            price: "20000",
            priceCurrency: "NOK",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "20000",
              priceCurrency: "NOK",
              billingDuration: "P1M",
            },
          },
        ],
      },
      serviceType: "Digital Marketing",
      category: "Social Media Marketing",
    },
  },

  // Add other pages as needed
  // about: { ... },
  // contact: { ... },
  // blog: { ... },
};

// Default SEO config for pages that don't have a specific configuration
export const defaultSeo: SEOConfig = {
  title: "Tarsier Digital Solutions",
  description:
    "Professional digital marketing services for purpose-driven brands. Social media management, content creation, and paid advertising.",
  keywords:
    "digital marketing, social media marketing, content creation, paid advertising, branding, purpose-driven brands",
  ogImage: "/images/og-default.jpg",
  ogType: "website",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Tarsier Digital Solutions",
    description:
      "Professional digital marketing services helping purpose-driven brands with strategy, content creation, paid advertising, and branding.",
    url: "https://tarsierdigital.com",
    email: "hello@tarsierdigital.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      name: "Camille Nicole",
      jobTitle: "Digital Marketing Specialist",
      description:
        "Former educator turned digital marketer specializing in helping purpose-driven brands tell their story.",
    },
    serviceType: [
      "Digital Marketing Strategy",
      "Social Media Marketing",
      "Content Creation",
      "Paid Advertising",
      "Brand Development",
      "Meta Advertising",
      "Google Advertising",
    ],
    areaServed: "Worldwide",
  },
};

// Helper function to get SEO config by page key
export function getSeoConfig(pageKey: string): SEOConfig {
  return pageSeo[pageKey] || defaultSeo;
}
