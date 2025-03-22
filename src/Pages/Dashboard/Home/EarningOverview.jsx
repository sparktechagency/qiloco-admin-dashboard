import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { MdOutlineDateRange } from "react-icons/md";
import { DatePicker } from "antd";
import { useGetEarningDataQuery } from "../../../redux/apiSlices/overViewSlice";

export default function EarningOverview() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isDateSelected, setIsDateSelected] = useState(false);

  // Fetch data using RTK Query
  const {
    data: earningChartData,
    isLoading,
    isError,
  } = useGetEarningDataQuery(selectedYear);

  // Transform API response to fit chart format
  const chartData =
    earningChartData?.data?.monthlyEarnings?.map((item) => ({
      name: item.month.slice(0, 3), // Convert "January" to "Jan"
      earnings: item.earnings, // Use correct API key for earnings
    })) || [];

  // Ensure there's at least an empty grid if no earnings data
  const hasData = chartData.some((item) => item.earnings > 0);

  // Handle DatePicker change
  const onChange = (date, dateString) => {
    if (date) {
      setSelectedYear(dateString);
      setIsDateSelected(true);
    } else {
      setIsDateSelected(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center justify-between w-full pr-5 mb-4">
          <h2 className="text-lg font-medium text-white">Earning Overview</h2>
          <div className="flex text-white gap-5">
            <p className="font-light text-white">Yearly Growth</p>
            <span className="font-bold">
              ${earningChartData?.data?.yearlyGrowth?.toLocaleString() || "0"}
            </span>
          </div>
        </div>

        <DatePicker
          onChange={onChange}
          picker="year"
          className="border-1 h-8 w-28 py-2 rounded-lg mb-4"
          suffixIcon={
            <div
              className="rounded-full w-6 h-6 p-1 flex items-center justify-center"
              style={{
                backgroundColor: isDateSelected ? "#232323" : "#dddddd",
              }}
            >
              <MdOutlineDateRange
                color={isDateSelected ? "white" : "#232323"}
              />
            </div>
          }
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {isLoading ? (
          <p className="text-center text-white">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load data</p>
        ) : (
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
                <stop offset="100%" stopColor="#151515" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              strokeWidth={0.5}
              vertical={false}
            />
            <XAxis dataKey="name" className="text-[16px]" />
            <YAxis className="text-[16px]" />
            <Tooltip content={<CustomTooltip />} cursor={false} />

            {hasData ? (
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="white"
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
            ) : (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="gray"
                fontSize="16"
              >
                No earnings data available
              </text>
            )}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </>
  );
}

// Custom Tooltip for AreaChart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex items-center ml-4">
        <div className="absolute w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-prince -left-2"></div>
        <div className="bg-white p-2 text-black rounded shadow-md">
          {payload.map((pld, index) => (
            <div key={index}>${pld.value.toLocaleString()}</div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};
