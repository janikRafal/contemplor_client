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
import { Button, ButtonGroup } from "@mui/material";

const URL = "http://localhost:3001/api/"; //fragment adresu url do laczenia sie z backendem

function formatColumns(responseData) { 
  const excludedKeys = ["specification", "createdAt", "updatedAt"];

  const columnsData = [
    {
      field: "specification",
      headerName: "Wyszczególnienie",
      width: 350,
    },
    ...Object.entries(responseData[0])
      .filter(([key]) => !excludedKeys.includes(key))
      .map(([key, value]) => ({
        field: key,
        headerName: key,
        width: 80,
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
  const [sulphurDioxideData, setSulphurDioxideData] = React.useState("");
  const [nitrogenOxidesData, setIndustryNitrogenOxidesData] =
    React.useState("");
  const [dustData, setDustData] = React.useState("");
  const [industrialWastewater, setIndustrialWastewaterData] =
    React.useState("");
  const [wastewaterTreatment, setWastewaterTreatmentData] = React.useState("");
  const [wastewaterWithdrawal, setWastewaterWithdrawalData] =
    React.useState("");
  const [tableData, setTableData] = React.useState("");
  const [dataForChart, setDataForChart] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`${URL}industry-data`);
        const responseIndustryData = res1.data;
        setIndustryData(responseIndustryData);

        const res2 = await axios.get(`${URL}sulphur-dioxide`);
        const responseSulphurDioxideData = res2.data;
        setSulphurDioxideData(responseSulphurDioxideData);

        const res3 = await axios.get(`${URL}nitrogen-oxides`);
        const responseNitrogenOxidesData = res3.data;
        setIndustryNitrogenOxidesData(responseNitrogenOxidesData);

        const res4 = await axios.get(`${URL}dust`);
        const responseDustData = res4.data;
        setDustData(responseDustData);

        const res5 = await axios.get(`${URL}industrial-wastewater`);
        const responseIndustrialWastewaterData = res5.data;
        setIndustrialWastewaterData(responseIndustrialWastewaterData);

        const res6 = await axios.get(`${URL}wastewater-treatment-plants`);
        const responseWastewaterTreatmentPlantsData = res6.data;
        setWastewaterTreatmentData(responseWastewaterTreatmentPlantsData);

        const res7 = await axios.get(`${URL}wastewater-withdrawal`);
        const responseWastewaterWithdrawalData = res7.data;
        setWastewaterWithdrawalData(responseWastewaterWithdrawalData);

        setTableData(responseIndustryData);
        setDataForChart([...responseIndustryData.slice(0, 5)]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const buttons = [
    <Button
      key="industryData"
      onClick={() => {
        setTableData(industryData);
        setDataForChart([...industryData.slice(0, 5)]);
      }}
    >
      Rozwój przemysłu
    </Button>,
    <Button
      key="emission"
      onClick={() => {
        setTableData([
          ...sulphurDioxideData,
          ...nitrogenOxidesData,
          ...dustData,
        ]);
        setDataForChart([
          ...industryData.slice(0, 5),
          sulphurDioxideData[0],
          nitrogenOxidesData[0],
          dustData[0],
        ]);
      }}
    >
      Emisja
    </Button>,
    <Button
      key="industrialWastewater"
      onClick={() => {
        setTableData(industrialWastewater);
        setDataForChart(industrialWastewater);
      }}
    >
      Ścieki
    </Button>,
    <Button
      key="wastewaterTreatment"
      onClick={() => {
        setTableData(wastewaterTreatment);
        setDataForChart(wastewaterTreatment);
      }}
    >
      Zakładowe oczyszczalnie ścieków
    </Button>,
    <Button
      key="wastewaterWithdrawal"
      onClick={() => {
        setTableData(wastewaterWithdrawal);
        setDataForChart(wastewaterWithdrawal);
      }}
    >
      Pobór wody
    </Button>,
  ];

  if (
    !industryData.length ||
    !sulphurDioxideData.length ||
    !nitrogenOxidesData.length ||
    !dustData.length ||
    !industrialWastewater.length ||
    !wastewaterTreatment.length ||
    !wastewaterWithdrawal.length
  )
    return;

  console.log("1", industryData); //dane o przemysle
  console.log("2", sulphurDioxideData); // dwutlenek siarki
  console.log("3", nitrogenOxidesData); // tlenki azotu
  console.log("4", dustData); // pyly
  console.log("5", industrialWastewater); //scieki przemyslowe
  console.log("6", wastewaterTreatment); // oczyszczalnie sciekow
  console.log("7", wastewaterWithdrawal); // pobor wody
  console.log("8", dataForChart);

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
        <Typography variant="h5" component="h1" gutterBottom>
          Zestawianie danych dotyczących rozwoju przemysłu i stanu środowiska
          naturalnego
        </Typography>
        <Box sx={{ flex: 1, width: "100%" }}>
          <BarChartComponent data={dataForChart} />
        </Box>
        <ButtonGroup
          sx={{ mt: 2 }}
          color="secondary"
          aria-label="medium secondary button group"
        >
          {buttons}
        </ButtonGroup>
        <Box sx={{ flex: 1, width: "100%", px: 3, my: 3 }}>
          <Box sx={{ height: "100%" }}>
            <DataGrid
              rowHeight={60}
              rows={formatRows(tableData)}
              columns={formatColumns(tableData)}
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
