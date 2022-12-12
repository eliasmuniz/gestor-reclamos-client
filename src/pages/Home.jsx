import ButtonPrimary from "components/buttonPrimary/ButtonPrimary";
import ButtonSecondary from "components/buttonSecondary/ButtonSecondary";
import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import imgSupport  from "../assets/img/soporte.png";

const Home = () => {
  return (
    <div className=" md:ml-[-16rem]">
      <div className="w-full h-screen w-screen grid grid-cols-3">
        <div className=""></div>
        <div className="text-center flex items-center">
          <div>
            <img src={imgSupport} className="w-full" alt="" />
            <h4 className="text-lg text-blue-600 w-full font-semibold ">
              SOPORTE TÉCNICO
            </h4>
            <h1 className="text-5xl text-black w-full font-semibold mt-4 mb-6">
              Portal de solicitudes de AgroExpert
            </h1>
            <p className="mb-8">Realiza solicitudes y reclamos con soporte especializado</p>
            <Link to={`/login`} className="ml-4 link">
              <ButtonPrimary>Ingresa</ButtonPrimary>
            </Link>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Home;
