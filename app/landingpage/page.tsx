import React from "react";
import EmailSignUp from "@/components/landingpage/emailsignup";
import { SecondaryFeatures } from "@/components/landingpage/secondaryFeature";
import { PrimaryFeatures } from "@/components/landingpage/primaryFeature";
import { Hero } from "@/components/landingpage/Hero";
import ImageSection from "@/components/landingpage/imageSection";

export default async function page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { show: boolean };
}) {
  return (
    <div className="text-text">
      <Hero />
      <ImageSection />
      <SecondaryFeatures />
      <PrimaryFeatures />
      <EmailSignUp />
    </div>
  );
}
