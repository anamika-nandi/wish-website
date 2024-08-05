"use client";

import React from "react";
import Image, { type ImageProps } from "next/image";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
import { FiActivity, FiCheckCircle, FiStar } from "react-icons/fi";

import { Container } from "@/components/landingpage/container";
import { landingpageContent } from "@/constants/landingpage";
import { marketplaceLandingpageContent } from "@/constants/marketplaceLandingpage";
import { IconType } from "react-icons";

const iconMap: { [key: string]: IconType } = {
  search: FiActivity,
  book: FiCheckCircle,
  reviews: FiStar,
};

interface Feature {
  step: React.ReactNode;
  summary: string;
  description: string;
  image: ImageProps["src"];
  iconKey: string;
}

function Feature({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  feature: Feature;
  isActive: boolean;
}) {
  const Icon = iconMap[feature.iconKey];

  return (
    <div
      className={clsx(className, !isActive && "opacity-75 hover:opacity-100")}
      {...props}
    >
      <div
        className={clsx(
          "w-9 rounded-lg",
          isActive ? "bg-accent text-text-900" : "bg-primary-700 text-text-100"
        )}
      >
        <Icon className="h-9 w-9 mx-auto p-1" aria-hidden="true" />
      </div>
      <h3
        className={clsx(
          "mt-6 text-sm font-medium",
          isActive ? "text-accent" : "text-text-700"
        )}
      >
        {feature.step}
      </h3>
      <p className="mt-2 font-display text-xl text-text-900">
        {feature.summary}
      </p>
      <p className="mt-4 text-sm text-text-600">{feature.description}</p>
    </div>
  );
}

function FeaturesMobile({
  content,
}: {
  content: typeof landingpageContent | typeof marketplaceLandingpageContent;
}) {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {content.secondaryFeature.howItWorks.map((feature) => (
        <div key={feature.summary}>
          <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8  sm:-inset-x-6" />
            {/* <div className="relative mx-auto w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              <Image
                className="w-full"
                src={feature.image}
                alt=""
                sizes="52.75rem"
              />
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturesDesktop({
  content,
}: {
  content: typeof landingpageContent | typeof marketplaceLandingpageContent;
}) {
  return (
    <TabGroup className="hidden lg:mt-20 lg:block">
      {({ selectedIndex }) => (
        <>
          <TabList className="grid grid-cols-3 gap-x-8">
            {content.secondaryFeature.howItWorks.map(
              (feature, featureIndex) => (
                <Feature
                  key={feature.summary}
                  feature={{
                    ...feature,
                    step: (
                      <Tab className="focus:outline-none">
                        <span className="absolute inset-0" />
                        {feature.step}
                      </Tab>
                    ),
                  }}
                  isActive={featureIndex === selectedIndex}
                  className="relative"
                />
              )
            )}
          </TabList>
          {/* <TabPanels className="relative mt-20 overflow-hidden rounded-4xl bg-background-100 px-14 py-16 xl:px-16">
            <div className="-mx-5 flex">
              {content.secondaryFeature.howItWorks.map(
                (feature, featureIndex) => (
                  <TabPanel
                    static
                    key={feature.summary}
                    className={clsx(
                      "px-5 transition duration-500 ease-in-out focus:outline-none",
                      featureIndex !== selectedIndex && "opacity-60"
                    )}
                    style={{
                      transform: `translateX(-${selectedIndex * 100}%)`,
                    }}
                    aria-hidden={featureIndex !== selectedIndex}
                  >
                    <div className="w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
                      <Image
                        className="w-full"
                        src={feature.image}
                        alt=""
                        sizes="52.75rem"
                      />
                    </div>
                  </TabPanel>
                )
              )}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10" />
          </TabPanels> */}
        </>
      )}
    </TabGroup>
  );
}

export function SecondaryFeatures({ isMarketplace = false }) {
  const content = isMarketplace
    ? marketplaceLandingpageContent
    : landingpageContent;

  return (
    <section
      id={content.secondaryFeature.id}
      aria-label={content.secondaryFeature.headline}
      className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32 bg-stone-50"
    >
      <Container>
        <div className="mx-auto max-w-3xl md:text-center">
          <div className="relative flex flex-wrap justify-center items-center font-semibold text-3xl tracking-tight text-text-900 md:text-5xl">
            <span className="whitespace-nowrap">
              {content.secondaryFeature.headline}
            </span>
            <span className="mx-2 relative whitespace-nowrap text-accent-400">
              {content.secondaryFeature.highlightedText}
            </span>
            <span className="whitespace-nowrap">
              {content.secondaryFeature.suffix}
            </span>
          </div>

          <p className="mt-4 text-lg tracking-tight text-text-700">
            {content.secondaryFeature.subheadline}
          </p>
        </div>
        <FeaturesMobile content={content} />
        <FeaturesDesktop content={content} />
      </Container>
    </section>
  );
}
