import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import {
  Box,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(
      HistoricalChart(coin.id, days, currency)
    );

    setHistoricData(data.prices);
    setFlag(true);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {/* <Box
        sx={{
          width: { xs: "100%", md: "75%" },
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "25px",
          padding: { xs: "20px", sm: "40px" },
          boxSizing: "border-box",
        }}
      > */}
      <Box
      sx={{
        flex: 1,
        width: { xs: "100%", md: "70%" },
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: "25px",
        padding: { xs: "20px", sm: "40px" },
        boxSizing: "border-box",
      }}
    >
        {!historicData || flag === false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 300, sm: 400, md: 450 },
              }}
            >
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);

                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;

                    return days === 1
                      ? time
                      : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price (Past ${days} Days) in ${currency}`,
                      borderColor: "#EEBC1D",
                      // borderWidth: 2,
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1 
                    },
                  },
                  // responsive: true,
                  // maintainAspectRatio: false,
                  // plugins: {
                  //   legend: {
                  //     display: true,
                  //   },
                  // },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "20px",
                justifyContent: "space-around",
                rowGap: "10px",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  selected={day.value === days}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                >
                  {day.label}
                </SelectButton>
              ))}
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CoinInfo;