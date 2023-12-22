import { Box, Container, Typography } from "@mui/material";

const Feature = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(rgba(1, 1, 1, 0.5), rgba(5, 5, 5, 0.7)), url(https://i.pcmag.com/imagery/articles/01Fgf2kCfxbiHEUdYjGq4WT-11..v1585579011.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          minHeight: "70vh",
          pt: 8,
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          color="white"
          sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }}
        >
          Fillo is Used By Many Including
        </Typography>
        <Typography color="white" sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }} variant="h4" component="ul">
          <Typography color="white" sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }} variant="h5" component="li">Artists</Typography>
          <Typography color="white" sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }} variant="h5" component="li">Manegers</Typography>
          <Typography color="white" sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }} variant="h5" component="li">Scientists</Typography>
          <Typography color="white" sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }} variant="h5" component="li">Progemmers</Typography>
          <Typography color="white" sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }} variant="h5" component="li">Journalists</Typography>
          <Typography color="white" sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }} variant="h5" component="li">Teachers</Typography>
          <Typography color="white" sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }} variant="h5" component="li">Students</Typography>
          <Typography color="white" sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, .75)" }} variant="h5" component="li">and Mnay ohters ...</Typography>
        </Typography>
      </Container>
    </Box>
  );
};

export default Feature;
