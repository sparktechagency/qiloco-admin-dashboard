// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import { MdOutlineDateRange } from "react-icons/md";
// import { DatePicker } from "antd";
// import { useGetPrdouctSalingDataQuery } from "../../../redux/apiSlices/overViewSlice";

// function generateRandomData() {
//   return [
//     { month: "Jan", totalRevenue, amt: 2400 },
//     { month: "Feb", totalRevenue, amt: 2210 },
//     { month: "Mar", totalRevenue, amt: 2290 },
//     { month: "Apr", totalRevenue, amt: 2000 },
//     { month: "May", totalRevenue, amt: 2181 },
//     { month: "Jun", totalRevenue, amt: 2500 },
//     { month: "Jul", totalRevenue, amt: 2100 },
//     { month: "Aug", totalRevenue, amt: 2600 },
//     { month: "Sep", totalRevenue, amt: 2700 },
//     { month: "Oct", totalRevenue, amt: 2800 },
//     { month: "Nov", totalRevenue, amt: 3000 },
//     { month: "Dec", totalRevenue, amt: 3200 },
//   ];
// }

// export default function MonthlySale() {
//   const [isDateSelected, setIsDateSelected] = useState(false);
//   const {
//     data: prdouctchart,
//     isLoading,
//     isError,
//   } = useGetPrdouctSalingDataQuery(year);

//   console.log(prdouctchart?.data?.formattedRevenueChart);
//   const chartData = prdouctchart?.data?.formattedRevenueChart;

//   const onChange = (date, dateString) => {
//     console.log(date, dateString);
//     setIsDateSelected(!!date); // Update state based on date selection
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between px-6">
//         <div className="flex items-center justify-between w-full pr-5 mb-4">
//           <h2 className="text-lg font-medium text-white">
//             Product Selling Overview
//           </h2>
//           <div className="flex  text-white gap-5">
//             <p className="font-light text-white">Monthly growth</p>
//             <span className="font-bold">35.80%</span>
//           </div>
//         </div>

//         <DatePicker
//           onChange={onChange}
//           picker="year"
//           className="border-1 h-8 w-28 py-2 rounded-lg mb-4"
//           suffixIcon={
//             <div
//               className="rounded-full w-6 h-6 p-1 flex items-center justify-center"
//               style={{
//                 backgroundColor: isDateSelected ? "#232323" : "#dddddd",
//               }}
//             >
//               <MdOutlineDateRange
//                 color={isDateSelected ? "white" : "#232323"}
//               />
//             </div>
//           }
//         />
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart
//           data={data}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid
//             strokeDasharray="none"
//             strokeWidth={0.2}
//             vertical={false}
//           />
//           <XAxis dataKey="month" className="text-[16px]" />
//           <YAxis hide={false} className="text-[16px]" />
//           {/* <Tooltip cursor={{ fill: "transparent" }} /> */}
//           <Tooltip
//             content={<CustomTooltip />}
//             // cursor={{ fill: "transparent" }}
//             isAnimationActive={true}
//             cursor={false}
//           />

//           <Bar dataKey="totalRevenue" fill="#ffffff" barSize={35} radius={4} />
//         </BarChart>
//       </ResponsiveContainer>
//     </>
//   );
// }

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="relative flex items-center ml-0 ">
//         {/* Arrow (pointing left) */}
//         <div className="absolute w-0 h-0  border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-prince -left-2"></div>

//         {/* Tooltip Content */}
//         <div className="bg-white p-2 text-black rounded shadow-md ">
//           {payload.map((pld, index) => (
//             <div key={index}>{pld.value}K</div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return null;
// };

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
import { DatePicker } from "antd";
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
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center justify-between w-full pr-5 mb-4">
          <h2 className="text-lg font-medium text-white">
            Product Selling Overview
          </h2>
          <div className="flex text-white gap-5">
            <p className="font-light text-white">Monthly Growth</p>
            <span className="font-bold">
              {productChartData?.data?.totalGrowth}%
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
        <BarChart
          data={chartData} // ✅ Corrected to use API data
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
          <Bar dataKey="totalRevenue" fill="#ffffff" barSize={35} radius={4} />
        </BarChart>
      </ResponsiveContainer>
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
