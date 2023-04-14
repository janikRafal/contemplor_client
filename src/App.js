import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import BarChartComponent from "./components/BarChartComponent";

const URL = "http://localhost:3001/api/";

function formatColumns(responseData) {
  const excludedKeys = ["specification", "createdAt", "updatedAt"];

  const columnsData = [
    {
      field: "specification",
      headerName: "Wyszczególnienie",
      width: 300,
    },
    ...Object.entries(responseData[0])
      .filter(([key]) => !excludedKeys.includes(key))
      .map(([key, value]) => ({
        field: key,
        headerName: key,
        width: 70,
      })),
  ];

  return columnsData;
}

function formatRows(responseData) {
  const rows = responseData.map((row, id) => {
    const { specification, createdAt, updatedAt, ...data } = row;
    return {
      specification,
      ...data,
      id,
    };
  });

  return rows;
}

const theme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#ffa726",
    },
  },
});

function App() {
  const [industryData, setIndustryData] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}industry-data`);
        const responseData = res.data;
        setIndustryData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!industryData.length) return;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {" "}
        {/* Zwiększ maxWidth do "md" */}
        <Typography variant="h5" component="h1" gutterBottom>
          Zestawianie danych dotyczących rozwoju przemysłu i stanu środowiska
          naturalnego
        </Typography>
        <Box sx={{ flex: 1, width: "100%" }}>
          <BarChartComponent data={industryData} />
        </Box>
        <Box sx={{ flex: 1, width: "100%", px: 3, my: 3 }}>
          <Box sx={{ height: "100%" }}>
            <DataGrid
              rowHeight={60}
              rows={formatRows(industryData)}
              columns={formatColumns(industryData)}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
