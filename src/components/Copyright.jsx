import Typography from "@mui/material/Typography";
import Link from "./Link";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color={props.color}
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Fillo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright
