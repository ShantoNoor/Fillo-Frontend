import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import Link from "./Link";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Copyright from "./Copyright";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";

const LogoIcon = styled(StackedBarChartIcon)();
const logoText = "Fillo";

const Footer = () => {
  const navigate = useNavigate();
  const navigateHome = () => navigate("/");

  const { pathname } = useLocation();

  return (
    <Box
      py={2}
      sx={{
        background:
          pathname === "/"
            ? "linear-gradient(rgba(1, 1, 1, 0.4), rgba(5, 5, 5, 0.7)), url(https://comuti.in/wp-content/uploads/2021/07/footer-bg.png)"
            : "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Stack
          direction={{ md: "row" }}
          gap={5}
          my={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Stack
              direction={"row"}
              divider={
                <Divider
                  color={pathname === "/" ? "white" : "black"}
                  orientation="vertical"
                  flexItem
                />
              }
              gap={1}
            >
              <Link to="/" underline={"hover"}>
                Home
              </Link>
              <Link underline={"hover"}>About</Link>
              <Link underline={"hover"}>Contact Us</Link>
            </Stack>
          </Box>

          <Box
            display={"flex"}
            gap={1}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <LogoIcon
              onClick={navigateHome}
              cursor={"pointer"}
              sx={{
                fontSize: { xs: "3rem" },
                color: pathname === "/" ? "white" : "black",
                textShadow:
                  pathname === "/" ? "2px 2px 4px rgba(0, 0, 0, .75)" : "",
              }}
            />
            <Typography
              variant="h6"
              mb={1}
              fontSize={{ xs: "2rem" }}
              onClick={navigateHome}
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: pathname === "/" ? "white" : "black",
                textDecoration: "none",
                flexGrow: 1,
                textShadow:
                  pathname === "/" ? "2px 2px 4px rgba(0, 0, 0, .75)" : "",
              }}
            >
              {logoText}
            </Typography>
          </Box>

          <Box>
            <Stack
              direction={"row"}
              gap={1}
              divider={
                <Divider
                  color={pathname === "/" ? "white" : "black"}
                  orientation="vertical"
                  flexItem
                />
              }
            >
              <Link to="https://google.com">
                <GoogleIcon />
              </Link>
              <Link to="https://facebook.com">
                <FacebookIcon />
              </Link>
              <Link to="https://linkedin.com">
                <LinkedInIcon />
              </Link>
              <Link to="https://instagram.com">
                <InstagramIcon />
              </Link>
            </Stack>
          </Box>
        </Stack>
        <Divider color={pathname === "/" ? "white" : "black"} />
        <Copyright color={pathname === "/" ? "white" : "black"} my={3} />
      </Container>
    </Box>
  );
};

export default Footer;
