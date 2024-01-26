"use client";
import React from "react";
import { portfolioData } from "@/app/data/portfolioData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function portfolioSlider() {
  const commonSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: false,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          pauseOnHover: true,
        },
      },
    ],
  };

  const rtlSettings = {
    ...commonSettings,
    rtl: true,
  };

  const simplifiedPortfolioData = portfolioData.map(
    ({ image, title, slug }) => ({ image, title, slug })
  );

  return (
    <div className="flex flex-col gap-8 overflow-x-hidden lg:gap-16">
      <Slider {...commonSettings}>
        {simplifiedPortfolioData?.slice(0, 6).map((portfolio, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-3 md:px-5 lg:px-6 max-w-[350px] lg:max-w-[420px]"
          >
            <Link href={`/portfolio/showcase/${portfolio.slug}`}>
              <img
                className="transition-all duration-200 rounded-md hover:group hover:shadow-md"
                src={portfolio?.image}
                alt={portfolio?.title}
              />
            </Link>
          </div>
        ))}
      </Slider>
      <Slider {...rtlSettings}>
        {simplifiedPortfolioData?.slice(6, 12).map((portfolio, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-3 md:px-5 lg:px-6 max-w-[350px] lg:max-w-[420px]"
          >
            <Link className="" href={`/portfolio/showcase/${portfolio.slug}`}>
              <img
                className="transition-all duration-200 rounded-md hover:group hover:shadow-md"
                src={portfolio?.image}
                alt={portfolio?.title}
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
