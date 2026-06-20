import { Box, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  }, []);

  if (!coin) {
    return (
      <LinearProgress
        style={{
          backgroundColor: "gold",
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        width: "100%",
      }}
    >
      {/* LEFT SECTION */}
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "30%",
          },
          minWidth: {
            xs: "100%",
            md: "300px",
          },

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",

          mt: 3,

          borderRight: {
            xs: "none",
            md: "2px solid grey",
          },

          borderBottom: {
            xs: "2px solid grey",
            md: "none",
          },

          p: 2,
          boxSizing: "border-box",
        }}
      >
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="180"
          style={{
            marginBottom: 20,
            display: "block",
          }}
        />

        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontFamily: "Montserrat",
            textAlign: "center",
            color: "gold",
          }}
        >
          <a
            href={coin?.links?.homepage?.[0]}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {coin?.name}
          </a>
        </Typography>

        {/* <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            lineHeight: 1.8,
            color: "#d3d3d3",
            textAlign: "justify",
            px: 2,
          }}
        > */}<Typography
            variant="subtitle1"
            sx={{
              width: "100%",
              fontFamily: "Montserrat",
              lineHeight: 1.8,
              color: "#d3d3d3",
              textAlign: "justify",
              mt: 1,
            }}
          >
            {coin?.description?.en
              ? coin.description.en
                  .replace(/<[^>]*>/g, "")      // Remove HTML tags
                  .replace(/\s+/g, " ")         // Remove extra spaces/new lines
                  .trim()                       // Remove starting/ending spaces
                  .split(".")[0] + "."          // First sentence only
              : "No description available."}
          {/* </Typography>
          {coin?.description?.en
            ? coin.description.en
                .replace(/<[^>]*>/g, "")
                .split(".")[0] + "."
            : "No description available."} */}
        </Typography>

        <Box
          sx={{
            width: "100%",
            mt: 3,
            px: 2,

            display: "flex",
            flexDirection: "column",

            gap: 2,

            alignItems: "flex-start",
          }}
        >
          <span style={{ display: "flex" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Rank:
            </Typography>

            &nbsp;&nbsp;

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Current Price:
            </Typography>

            &nbsp;&nbsp;

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}
              {numberWithCommas(
                coin?.market_data?.current_price[
                  currency.toLowerCase()
                ]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Market Cap:
            </Typography>

            &nbsp;&nbsp;

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}
              {numberWithCommas(
                coin?.market_data?.market_cap[
                  currency.toLowerCase()
                ]
                  ?.toString()
                  ?.slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </Box>
      </Box>

      {/* RIGHT SECTION - GRAPH */}
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;