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
  const getYearRange = (data) => {
    const yearsSet = new Set();

    data.forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (!isNaN(parseInt(key)) && value !== null) {
          yearsSet.add(parseInt(key));
        }
      });
    });

    return Array.from(yearsSet).sort((a, b) => a - b);
  };

  // Zmień zakres lat na 2005-2021
  const years = getYearRange(data);

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

  const getDefaultColor = (index) => {
    const defaultColors = [
      "#FFBB28", // ciepłe kolory
      "#FF8042",
      "#ffc658",
      "#82ca9d", // zimne kolory
      "#8884d8",
    ];
    return defaultColors[index % defaultColors.length];
  };

  const getEmissionColor = (index) => {
    const emissionColors = [
      "#a9a9a9", // Dodaj odcienie szarości dla zanieczyszczeń
      "#808080",
      "#696969",
    ];
    return emissionColors[index % emissionColors.length];
  };

  const isEmissionCategory = () => {
    return data.some((item) =>
      item.specification.includes("OGÓŁEM (dwutlenek siarki)")
    );
  };

  const getBarColor = (item, index) => {
    if (isEmissionCategory() && data.length > 5 && index >= 5) {
      return getEmissionColor(index - 5);
    }
    return getDefaultColor(index);
  };

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
            fill={getBarColor(item, index)}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
