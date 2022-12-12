import React, { useEffect, useState } from "react";
import {
  HiOutlineUserCircle,
  HiArrowCircleLeft,
} from "react-icons/hi";


import ButtonPrimary from "components/buttonPrimary/ButtonPrimary";
import ButtonSecondary from "components/buttonSecondary/ButtonSecondary";
import axios from "axios";
import useFetch from "hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import UploadModal from "components/uploadModal/UploadModal";
import InfoModal from "components/infoModal/InfoModal";

const EditPropertyType = () => {
  const loc = useLocation();
  const path = loc.pathname.split("/")[2];
  const path_2 = loc.pathname.split("/")[1];
  
  const [info, setInfo] = useState({});
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false)

  const { data, loading, error } = useFetch(`/api/propertyTypes/find/${path}/`);

  const handleChange = (e) => {
    console.log(e.target.value);
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    console.log(data);
    setInfo(data);
  }, [data]);


  const handleClick = async (e) => {

    try {
      const updatePropertyType = {
        ...info,
      };
 
      await axios.put(`/api/propertyTypes/${path}`, updatePropertyType,{ withCredentials: true });
      setShowModalInfo(true);
      //await axios.post("/api/properties", newProperty, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }

    
  };

  return (
    <>
      <div className="bg-indigo-500 px-3 md:px-8" />
      <UploadModal setShowModal={setShowModalUpload} showModal={showModalUpload} />
      <InfoModal setShowModal={setShowModalInfo} showModal={showModalInfo} info="Se ha actualizado la propiedad" />
      
      <div className="px-3 md:px-8 h-auto ">
        <div className="container mx-auto max-w-full">
          <div className="mt-10 mb-10">
            <div className="bg-blue-600 shadow-xl p-5 py-8 rounded-2xl items-center flex justify-between">
              <Link to={`/${path_2}/`} className="text-white">
                <HiArrowCircleLeft size={24} />
              </Link>
              <h2 className="text-2xl text-white text-center capitalize font-semibold">
                Editar Tipo de Propiedad
              </h2>
              <div></div>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="">
            <div className=" gap-6 bg-gray-50 shadow-xl p-5 rounded-2xl">
              <div className="">
                <div className="mb-4">
                  <label
                    for="name"
                    className="block py-1 font-medium text-gray-700"
                  >
                    Título/Nombre (*)
                  </label>
                  <div className="flex items-center border-gray-400 p-2 border rounded-xl">
                    <div className="text-gray-500">
                      <HiOutlineUserCircle
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="text"
                      value={info.title}
                      id="title"
                      onChange={handleChange}
                      className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full col-span-2">
                <div className="text-center">
                  <ButtonSecondary> Cancelar</ButtonSecondary>
                  <ButtonPrimary onClick={(e) => handleClick(e)}>
                    Guardar cambios
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPropertyType;
