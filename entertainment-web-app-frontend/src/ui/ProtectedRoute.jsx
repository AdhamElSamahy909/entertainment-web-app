import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentAuthSate } from "../services/api/authSlice";
import { useRefreshMutation } from "../services/api/authApiSlice";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { token, isLoading } = useSelector(selectCurrentAuthSate);
  const [refresh, { isLoading: isRefreshing }] = useRefreshMutation();

  console.log("TOKEN IN PR: ", token);
  console.log("LOADING IN PR: ", isLoading);
  console.log("Cookie: ", document.cookie);

  console.log("Render:", {
    token: token ? "exists" : "none",
    isLoading,
    isRefreshing,
  });

  useEffect(() => {
    const checkProtection = async () => {
      console.log(token);
      console.log("REFRESHING");
      const data = await refresh();
      console.log(data);
      if (data.error) navigate("/login");
      else navigate("/");
    };

    if (!token) checkProtection();
  }, [token, navigate, refresh]);

  if (isLoading || isRefreshing) return <Loader />;

  if (token) return children;
}

export default ProtectedRoute;
