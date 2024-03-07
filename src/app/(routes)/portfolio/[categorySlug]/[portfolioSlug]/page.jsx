import React from "react";
import PortfolioContent from "./portfolioContent";
import portfolioData from "@/app/data/portfolioData";
import NotFound from "@/app/not-found";

/* Dynamic SEO */
export async function generateMetadata({ params }) {
  // read route params
  const portfolioSlug = params.portfolioSlug;
  const categorySlug = params.categorySlug;

  // Find the portfolio item based on the slug
  if (!portfolioSlug || !categorySlug) {
    return <NotFound message={`${portfolioSlug} page not found`} />;
  }

  // Find the category in the portfolioData
  const categoryName = portfolioData.find(
    (item) => item.categorySlug === categorySlug
  );

  if (!categoryName) {
    return <NotFound message={`${categorySlug} page not found`} />;
  }

  // Find the portfolio item within the category
  const portfolioItem = categoryName.portfolioItems.find(
    (item) => item.slug === portfolioSlug
  );

  if (!portfolioItem) {
    return <NotFound message={`${portfolioSlug} page not found`} />;
  }

  const { title, description, category } = portfolioItem;

  return {
    title: `${title} Portfolio`,
    description: `${description}  Phone: +977 9802366500, Email: pranisha@twelveletter.co, Location: Kupondole, Lalitpur, Nepal`,
    keywords: ["Twelveletter", "Portfolio", category, title],
    alternates: {
      canonical: `/portfolio/showcase/${portfolioSlug}`,
    },
  };
}

export default function page() {
  return (
    <div className="overflow-x-hidden">
      <PortfolioContent />
    </div>
  );
}
