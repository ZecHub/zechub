import { useEffect } from "react";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import "../messages.css";
import "../pop2.css";

const Logout = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        // Remove access token from localStorage or sessionStorage
        localStorage.removeItem("access_token"); // If you're storing token in localStorage
        // sessionStorage.removeItem("access_token"); // If you're using sessionStorage

        // Redirect to login
        navigate("/login");
    }, [navigate]);

    return(
        <div className="desktop-13">
          <div className="screenshot-3151">
          </div>
            <NavBar />
            <div className="coming-soon">Coming Soon...</div>
        </div>
    )
}

export default Logout;