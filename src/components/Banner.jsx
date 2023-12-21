import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        background:
          "linear-gradient(rgba(1, 1, 1, 0.4), rgba(5, 5, 5, 0.7)), url(https://blog.trello.com/hubfs/Trello-Like-a-Pro-final.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "70vh",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          color="white"
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }}
        >
          Manage Your Tasks
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color="white"
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }}
          mb={3}
        >
          Fillo is a robust, powerful, awesome  task maneger.
          <br />
          Try Fillo now
        </Typography>
        <Divider color="white" />
        <Box align="left" mt={2}>
          <Button
            size="large"
            variant="contained"
            onClick={() => navigate("/dashboard")}
          >
            Explore Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
