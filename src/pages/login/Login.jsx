import axios from "axios";
import ButtonPrimary from "components/buttonPrimary/ButtonPrimary";
import { useContext, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    //e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "http://localhost:8090/api/auth/authenticate",
        credentials
      );

      console.log(res);

      if (res.data.username !== null) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        if(res.data.roleId === 1){
          navigate("/claims");
        }else{
          navigate("/claims");
        }
       
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "No estás registrado!" },
        });
        console.log(error);
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      console.log(err);
    }
  };

  return (
    <div className="login md:ml-[-16rem]">
      <div className="lContainer">
        <div className="mb-10">
          <div className="bg-blue-800  shadow-xl p-5 py-8 rounded-2xl items-center  justify-between">
            <h2 className="text-2xl text-white text-center  font-semibold">
              Ingresar a la plataforma
            </h2>
          </div>
        </div>
        <div className="mb-4">
          <label for="name" className="block py-1 font-medium text-gray-700">
            Nombre (*)
          </label>
          <div className="flex items-center border-gray-400 p-2 border rounded-xl">
            <div className="text-gray-500">
              <HiOutlineUserCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="email"
              id="username"
              onChange={handleChange}
              className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
            />
          </div>
        </div>
        <div className="mb-4">
          <label for="name" className="block py-1 font-medium text-gray-700">
            Password (*)
          </label>
          <div className="flex items-center border-gray-400 p-2 border rounded-xl">
            <div className="text-gray-500">
              <HiOutlineUserCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
            />
          </div>
        </div>

        <ButtonPrimary onClick={(e) => handleClick(e)}>
          <p className="text-xl">Iniciar sesión</p>
        </ButtonPrimary>
        <hr className="mt-4" />
        <p>¿No tienes cuenta? <Link to={`/register`} ><e className="font-semibold hover:underline">Registrate</e></Link></p>

        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
