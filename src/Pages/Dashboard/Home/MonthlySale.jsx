import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { MdOutlineDateRange } from "react-icons/md";
import { ConfigProvider, DatePicker } from "antd";
import { useGetPrdouctSalingDataQuery } from "../../../redux/apiSlices/overViewSlice";

export default function MonthlySale() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isDateSelected, setIsDateSelected] = useState(false);

  const {
    data: productChartData,
    isLoading,
    isError,
  } = useGetPrdouctSalingDataQuery(selectedYear);

  // Extract data from API response
  const chartData =
    productChartData?.data?.formattedRevenueChart?.map((item) => ({
      month: item.month.slice(0, 3), // Convert "January" to "Jan"
      totalRevenue: item.totalRevenue,
    })) || [];

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
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              hoverBorderColor: "white ",
              activeBorderColor: "white ",
            },
          },
        }}
      >
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center justify-between w-full pr-5 mb-4">
            <h2 className="text-lg font-medium text-white">
              Product Selling Overview
            </h2>
            <div className="flex text-white gap-5">
              <p className="font-light text-white mt-1">Monthly Growth</p>
              <span className="font-bold">
                {productChartData?.data?.totalGrowth}%
              </span>
            </div>
          </div>

          <DatePicker
            onChange={onChange}
            picker="year"
            className="border border-gray-500 bg-black text-white placeholder-white h-8 w-28 py-2 rounded-lg mb-4"
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
            style={{
              backgroundColor: "#575958",
              color: "white",
            }}
          />
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="none"
              strokeWidth={0.2}
              vertical={false}
            />
            <XAxis dataKey="month" className="text-[16px]" />
            <YAxis className="text-[16px]" />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar
              dataKey="totalRevenue"
              fill="#ffffff"
              barSize={35}
              radius={4}
            />
          </BarChart>
        </ResponsiveContainer>
      </ConfigProvider>
    </>
  );
}

// Custom Tooltip for BarChart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex items-center ml-0">
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
