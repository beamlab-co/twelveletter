"use client";
import React, { useState, useEffect, useCallback } from "react";
import PageTitle from "../../components/pageTitle/pageTitle";
import CategoryMenu from "./(components)/categoryMenu";
import portfolioData from "@/app/data/portfolioData"; // Ensure this path is correct
import ContactModule from "@/app/components/contactModules/contactModule";
import Loader from "@/app/components/loader/loader";
import Pagination from "@/app/components/pagination/pagination";
import Link from "next/link";

export default function PortfolioPage(props) {
  const [selectedCategory, setSelectedCategory] = useState(
    props.selectedCategory || null
  );
  const [flatPortfolioItems, setFlatPortfolioItems] = useState([]);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ start: 0, end: 12 });

  useEffect(() => {
    setLoading(true);

    // Filter and flatten portfolio items based on the selected category
    const filteredData = selectedCategory
      ? portfolioData.filter(
          (category) => category.categorySlug === selectedCategory
        )
      : portfolioData;

    const allPortfolioItems = filteredData.reduce(
      (acc, category) => [
        ...acc,
        ...category.portfolioItems.map((item) => ({
          ...item,
          categorySlug: category.categorySlug,
        })),
      ],
      []
    );

    setFlatPortfolioItems(allPortfolioItems);
    setLoading(false);
  }, [selectedCategory]);

  useEffect(() => {
    // Apply pagination to the flat list of portfolio items
    const updatePaginatedItems = flatPortfolioItems.slice(
      pagination.start,
      pagination.end
    );
    setPaginatedItems(updatePaginatedItems);
  }, [flatPortfolioItems, pagination]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const onPaginationChange = useCallback((start, end) => {
    setPagination({ start, end });
  }, []);

  return (
    <>
      <div className="min-h-screen top-section-p container-margin">
        <section>
          <PageTitle
            textSize="large"
            heading="A Showcase of Creativity, Innovation, and Success Stories"
            subHeading="Portfolio Showcase"
            highlightText="Explore Our Portfolio:"
            highlightGradient={true}
          />
        </section>
        <section className="mb-8 my-7 md:my-12 lg:mt-12 lg:mb-10">
          <CategoryMenu
            categorySlug={[
              ...new Set(portfolioData.map((item) => item.categorySlug)),
            ]}
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />
        </section>
        <section>
          <div>
            {loading ? (
              <Loader />
            ) : (
              <ul className="grid grid-cols-1 gap-6 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {paginatedItems.map(
                  ({ id, slug, image, title, categorySlug }) => (
                    <li
                      key={id}
                      className="relative w-full h-full min-w-0 col-span-1 overflow-hidden rounded-md group"
                    >
                      <Link
                        title={title}
                        href={`/portfolio/${categorySlug}/${slug}`}
                        className="relative w-full cursor-pointer card-container"
                      >
                        <img
                          title={title}
                          loading="lazy"
                          className="top-0 left-0 object-fill w-full overflow-hidden transition-opacity rounded-md"
                          src={image}
                          alt={title}
                        />
                        {/* Additional UI elements here */}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </section>
        <section className="margin-t">
          <Pagination
            showPerPage={12}
            onPaginationChange={onPaginationChange}
            total={flatPortfolioItems.length}
          />
        </section>
      </div>
      <ContactModule />
    </>
  );
}
