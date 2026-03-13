import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser, cart } = useContext(AppContext);
  const [formData, setFormData] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleLogin = async () => {
    const url = API_URL + "/auth/signin";

    const response = await axios.post(url, formData);

    setUser(response.data);   // update global user

    if (cart.length > 0) navigate("/cart");
    else navigate("/");
  };

  return (
    <div>
      <h2>Login Page</h2>

      <p>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
      </p>

      <p>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </p>

      <p>
        <button onClick={handleLogin}>Login</button>
      </p>

      <p>
        <Link to="/register">New user register here</Link>
      </p>
    </div>
  );
}

export default Login;