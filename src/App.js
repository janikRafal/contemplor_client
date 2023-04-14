import * as React from "react";
import { Bar } from "react-chartjs-2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "./App.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";

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
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}industry-data`);
        const responseData = res.data;
        setResponse(responseData);

        const excludedKeys = ["specification", "createdAt", "updatedAt"];

        const newArray = [
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
        setColumns(newArray);

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
        console.log("columns", newArray);
        console.log("response", response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  type TableData = {
    year: number,
    value: number,
    specification: string,
    id: number,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="false">
          {" "}
          {/* Zwiększ maxWidth do "md" */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "8px",
              padding: "2rem",
              boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Integracja systemów - projekt
            </Typography>
            <Typography variant="body1">
              Zestawianie danych dotyczących rozwoju przemysłu i stanu
              środowiska naturalnego
            </Typography>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rowHeight={60}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
