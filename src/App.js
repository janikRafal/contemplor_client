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

const theme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#ffa726",
    },
  },
});

function App() {
  const [response, setResponse] = React.useState("");
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    console.log("useEffect is called");
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}industry-data`);
        const responseData = res.data;
        setResponse(responseData);

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
        setColumns(columnsData);

        const rows = responseData.map((row, id) => {
          const { specification, createdAt, updatedAt, ...data } = row;
          return {
            specification,
            ...data,
            id,
          };
        });

        setRows(rows);

        console.log("rows ", rows);
        console.log("columns", columnsData);
        console.log("response", response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!columns.length || !rows.length) return;

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
          <BarChartComponent data={response} />
        </Box>
        <Box sx={{ flex: 1, width: "100%", px: 3, my: 3 }}>
          <Box sx={{ height: "100%" }}>
            <DataGrid
              rowHeight={60}
              rows={rows}
              columns={columns}
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
