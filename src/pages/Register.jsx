import axios from "axios";
import ButtonPrimary from "components/buttonPrimary/ButtonPrimary";
import InfoModal from "components/infoModal/InfoModal";
import { useContext, useState } from "react";
import { HiArrowCircleLeft, HiOutlineUserCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const [info, setInfo] = useState({});
  const [description, setDescription] = useState("");
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    try {
      const newUser = {
        ...info,
        roleId: 3,
      };

      setShowModalInfo(true);
      await axios.post(
        `${process.env.REACT_APP_API}/api/auth/register`,
        newUser
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <InfoModal
        setShowModal={setShowModalInfo}
        showModal={showModalInfo}
        info="Te has registrado de forma correcta"
      />

      <div className="login md:ml-[-16rem]">
        <div className="lContainer">
          <div className="mb-10">
            <div className="bg-blue-800  shadow-xl p-5 py-8 rounded-2xl flex items-center align-middle  justify-between">
              <div className="inline-block">
                <Link to={`/login`} className="text-white">
                  <HiArrowCircleLeft size={24} />
                </Link>
              </div>
              <h2 className="text-2xl text-white text-center  font-semibold">
                Registrarse a la plataforma
              </h2>
              <div></div>
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
                id="name"
                onChange={handleChange}
                className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="mb-4">
            <label for="name" className="block py-1 font-medium text-gray-700">
              Apellido (*)
            </label>
            <div className="flex items-center border-gray-400 p-2 border rounded-xl">
              <div className="text-gray-500">
                <HiOutlineUserCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Apellido"
                id="lastName"
                onChange={handleChange}
                className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="mb-4">
            <label for="name" className="block py-1 font-medium text-gray-700">
              Email (*)
            </label>
            <div className="flex items-center border-gray-400 p-2 border rounded-xl">
              <div className="text-gray-500">
                <HiOutlineUserCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="email"
                id="email"
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
            <p className="text-xl">Registrarse</p>
          </ButtonPrimary>
          <hr className="mt-4" />
          <p>
            ¿No tienes cuenta?{" "}
            <Link>
              <e className="font-semibold hover:underline">Registrate</e>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
