import { Helmet } from "react-helmet-async";

const Title = ({ children }) => {
  return (
    <Helmet>
      <title>{children} | Fillo</title>
    </Helmet>
  );
};

export default Title;
