import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

function Banner() {
  return (
    <div
      style={{
        backgroundImage: "url(./banner2.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <div
          style={{
            height: 400,
            display: "flex",
            flexDirection: "column",
            paddingTop: 25,
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "40%",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
                fontFamily: "Montserrat",
              }}
            >
              Crypto Sphere
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
              }}
            >
              Get all the Info regarding your favorite Crypto Currency
            </Typography>
          </div>

          <Carousel />
        </div>
      </Container>
    </div>
  );
}

export default Banner;