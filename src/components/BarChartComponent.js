import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data }) => {
  // Zmień zakres lat na 2005-2021
  const years = Array.from({ length: 2022 - 2005 }, (_, i) => 2005 + i);

  // Pobierz wszystkie obiekty z danych
  const allItems = data;

  const formattedData = years.map((year) => {
    const yearData = {
      year,
    };

    allItems.forEach((item) => {
      if (item[year] !== undefined) {
        // Dodaj wartość tylko wtedy, gdy jest zdefiniowana dla danego roku
        yearData[item.specification] = item[year];
      }
    });

    return yearData;
  });

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#FF8042",
    "#FFBB28",
    "#a9a9a9", // Dodaj odcienie szarości dla zanieczyszczeń
    "#808080",
    "#696969",
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={formattedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {allItems.map((item, index) => (
          <Bar
            key={item.specification}
            dataKey={item.specification}
            fill={colors[index]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
