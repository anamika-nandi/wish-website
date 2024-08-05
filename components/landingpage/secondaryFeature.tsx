"use client";

import React from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import clsx from "clsx";
import { FiGitBranch, FiPackage, FiPlay } from "react-icons/fi";

import { Container } from "@/components/landingpage/container";
import { landingpageContent } from "@/constants/landingpage";
import { IconType } from "react-icons";

const iconMap: { [key: string]: IconType } = {
  clone: FiGitBranch,
  install: FiPackage,
  start: FiPlay,
};

interface Feature {
  step: React.ReactNode;
  summary: string;
  description: string;
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
          isActive
            ? "bg-secondary text-text-900"
            : "bg-primary-700 text-text-100"
        )}
      >
        {Icon && <Icon className="h-9 w-9 mx-auto p-1" aria-hidden="true" />}
      </div>
      <h3
        className={clsx(
          "mt-6 text-sm font-medium",
          isActive ? "text-secondary" : "text-text-900"
        )}
      >
        {feature.step}
      </h3>
      <p className="mt-2 font-display text-xl text-text-900">
        {feature.summary}
      </p>
      <p className="mt-4 text-sm text-gray-600">{feature.description}</p>
    </div>
  );
}

function FeaturesMobile({ content }: { content: typeof landingpageContent }) {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {content.secondaryFeature.howItWorks.map((feature) => (
        <div key={feature.summary}>
          <Feature
            feature={feature}
            className="mx-auto max-w-2xl"
            isActive={true}
          />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 sm:-inset-x-6" />
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturesDesktop({ content }: { content: typeof landingpageContent }) {
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
        </>
      )}
    </TabGroup>
  );
}

export function SecondaryFeatures({
  isMarketplace = false,
}: {
  isMarketplace?: boolean;
}) {
  const content = landingpageContent;

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
          <p className="mt-4 text-lg tracking-tight text-gray-600">
            {content.secondaryFeature.subheadline}
          </p>
        </div>
        <FeaturesMobile content={content} />
        <FeaturesDesktop content={content} />
      </Container>
    </section>
  );
}
