import { useLocation } from "react-router-dom";

const useQuery = async () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export default useQuery;
