"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PageTitle from "../../components/pageTitle/pageTitle";
import CategoryMenu from "./(components)/categoryMenu";
import { portfolioData } from "@/app/data/portfolioData";
import ContactModule from "@/app/components/contactModules/contactModule";
import Loader from "@/app/components/loader/loader";
import Pagination from "@/app/components/pagination/pagination";
export default function PortfolioPage(props) {
  const [selectedCategory, setSelectedCategory] = useState(
    props.selectedCategory !== undefined ? props.selectedCategory : null
  );
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data fetching or filtering
    const fetchData = async () => {
      setLoading(true);

      // Simulate API call or data filtering
      const newData = selectedCategory
        ? portfolioData.filter(
            (item) =>
              item.category.toLowerCase().replace(/\s+/g, "-") ===
              selectedCategory.toLowerCase().replace(/\s+/g, "-")
          )
        : portfolioData;

      // Introduce a delay (simulating async operation)
      await new Promise((resolve) => setTimeout(resolve, 100));

      setFilteredData(newData);
      setLoading(false); // Set loading to false after fetching
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const [showPerPage] = useState(12);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  return (
    <>
      <div className="min-h-screen top-section-p container-margin">
        <section>
          <PageTitle
            textSize="large"
            heading="Explore Our Portfolio: A Showcase of Creativity, Innovation, and Success Stories"
            subHeading="Portfolio Showcase"
          />
        </section>
        <section className="my-8 md:my-12 lg:mt-14 lg:mb-10">
          <CategoryMenu
            categories={[
              ...Array.from(
                new Set(portfolioData.map((item) => item.category))
              ),
            ]}
            selectedCategory={props.selectedCategory || selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />
        </section>
        <section>
          <div>
            {loading ? (
              // Show loader while loading
              <Loader />
            ) : (
              <ul className="grid grid-cols-1 gap-6 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {filteredData
                  .slice(pagination.start, pagination.end)
                  .map(({ id, slug, image, title }) => (
                    <li
                      key={id}
                      className="relative w-full h-full min-w-0 col-span-1 overflow-hidden rounded-md group"
                    >
                      <Link
                        href={`/portfolio/showcase/${slug}`}
                        className="relative w-full cursor-pointer card-container"
                      >
                        <img
                          className="top-0 left-0 object-fill w-full transition-opacity "
                          src={image}
                          alt="Card Image"
                        />
                        <div className="absolute bottom-0 flex w-full group">
                          <div
                            style={{
                              transition: "all 100ms",
                            }}
                            className="relative w-full transition-transform ease-in transform translate-y-2 opacity-0 ease duration-400 bg-gradient-to-t from-black-shade-300 to-transparent group-hover:translate-y-0 group-hover:opacity-100"
                          >
                            <h4 className="bottom-0 px-4 pt-4 pb-3 font-medium tracking-wider text-white transition-all duration-300 translate-y-4 opacity-0 text-over group-hover:translate-y-0 group-hover:opacity-100">
                              {title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </section>
        <section className="margin-t">
          <Pagination
            showPerPage={showPerPage}
            onPaginationChange={onPaginationChange}
            total={filteredData?.length}
          />
        </section>
      </div>
      <ContactModule />
    </>
  );
}
