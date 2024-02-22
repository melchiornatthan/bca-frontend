import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

// Array of colors for the pie chart segments
const colors = ["#FF6868", "#0F6292", "#54B435", "#EA047E", "#0088fe"]; // Add more colors if needed

/**
 * ResponsiveDoughnutChart component renders a responsive pie chart (doughnut chart) using Recharts library.
 * @param {Array} data - Array of objects containing data for the pie chart.
 * @returns {JSX.Element} - A responsive pie chart component.
 */
const ResponsiveDoughnutChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      {/* Render a PieChart component */}
      <PieChart>
        {/* Render a Pie component */}
        <Pie
          data={data} // Data for the pie chart
          dataKey="value" // Key in each data object representing the value
          cx="50%" // X-coordinate of the center of the pie chart
          cy="50%" // Y-coordinate of the center of the pie chart
          innerRadius={60} // Inner radius of the pie chart (to create a doughnut effect)
          outerRadius={80} // Outer radius of the pie chart
          fill="#8884d8" // Fill color of the pie segments
          paddingAngle={2} // Padding angle between segments
        >
          {/* Map through data and render a Cell component for each segment */}
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        {/* Render a Legend component */}
        <Legend />
        {/* Render a Tooltip component */}
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ResponsiveDoughnutChart; // Export the ResponsiveDoughnutChart component for use in other files
