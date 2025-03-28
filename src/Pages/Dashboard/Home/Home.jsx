import React from "react";
import EarningOverview from "./EarningOverview";
import MonthlySale from "./MonthlySale";

import { LiaUsersSolid } from "react-icons/lia";
import { PiCurrencyCircleDollarBold } from "react-icons/pi";
import { useGetTotalQuery } from "../../../redux/apiSlices/overViewSlice";
import { Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import RecentSellingProduct from "./RerecentSellingProduct";

const Home = () => {
  const { data: response, isLoading, isError } = useGetTotalQuery();

  if (isLoading) return <Loading />; // Fixed missing return

  if (isError) {
    return (
      <div className="text-red-500 text-center text-lg">
        Failed to load data. Please try again.
      </div>
    );
  }

  const totalData = response?.data || {}; // Ensure totalData is at least an empty object

  const stats = [
    {
      label: "Total Users",
      value: totalData.totalUser ?? "N/A", // Prevent undefined values
      icon: <LiaUsersSolid size={60} className="text-white" />,
      bg: "bg-quilocoS",
    },
    {
      label: "Total Earnings",
      value: `$${parseFloat(totalData.totalRevenue || 0).toFixed(2)}`, // Ensure proper formatting
      icon: <PiCurrencyCircleDollarBold size={60} className="text-white" />,
      bg: "bg-quilocoS",
    },
  ];

  return (
    <div className="px-3">
      <div className="flex flex-col flex-wrap items-end gap-5 justify-between w-full bg-transparent rounded-md">
        {/* Stats Section */}
        <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-5 w-full">
          {stats.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-5 w-full">
          <div className="w-[50%] p-4 bg-quilocoP rounded-lg">
            <EarningOverview />
          </div>
          <div className="w-[50%] p-4 bg-quilocoP rounded-lg">
            <MonthlySale />
          </div>
        </div>

        {/* Recent Selling Products Section */}
        <div className="w-full">
          <div className="w-full flex items-center justify-between">
            <h3 className="text-white text-[24px] font-bold mb-2">
              Recent Selling Products
            </h3>
            <Link
              to="/recent-selling-products"
              className="text-green-700 underline"
            >
              See More
            </Link>
          </div>

          <div
            className="h-60 overflow-y-scroll rounded-lg bg-quilocoP [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            <RecentSellingProduct />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const Card = ({ item }) => (
  <div className="flex w-full items-center justify-start pl-10 h-32 rounded-xl bg-quilocoP gap-5">
    <div
      className={`${item.bg} w-20 h-20 flex items-center justify-center rounded-full`}
    >
      {item.icon}
    </div>
    <div className="flex flex-col">
      <h1 className="text-[24px] text-white font-normal mb-1">{item.label}</h1>
      <p className="text-[32px] text-white font-medium">{item.value}</p>
    </div>
  </div>
);
