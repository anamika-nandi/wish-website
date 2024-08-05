import React from "react";
import EmailSignUp from "@/components/landingpage/emailsignup";
import { SecondaryFeatures } from "@/components/landingpage/secondaryFeature";
import { PrimaryFeatures } from "@/components/landingpage/primaryFeature";
import { Hero } from "@/components/landingpage/Hero";

export default async function MarketPlacePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { show: boolean };
}) {
  return (
    <div className="text-text">
      <Hero isMarketplace />
      <PrimaryFeatures isMarketplace />
      <SecondaryFeatures isMarketplace />
      <EmailSignUp isMarketplace />
    </div>
  );
}
