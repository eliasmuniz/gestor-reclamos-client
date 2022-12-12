import React, { useEffect, useState } from "react";
import { HiOutlineUserCircle, HiArrowCircleLeft } from "react-icons/hi";

import ButtonPrimary from "components/buttonPrimary/ButtonPrimary";
import ButtonSecondary from "components/buttonSecondary/ButtonSecondary";
import axios from "axios";
import useFetch from "hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import UploadModal from "components/uploadModal/UploadModal";
import InfoModal from "components/infoModal/InfoModal";
import TextEditor from "components/textEditor/TextEditor";

const NewClaim = () => {
  const loc = useLocation();
  const path = loc.pathname.split("/")[2];
  const path_2 = loc.pathname.split("/")[1];
  const userLocal = JSON.parse(localStorage.getItem("user")).userId;


  const [info, setInfo] = useState({});
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);

  const [description, setDescription] = useState("");
  const [initialDescription, setInitialDescription] = useState(null);
  
  console.log(`${process.env.REACT_APP_API}/api/claims/`);

  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API}/api/claims/find/${path}/`
  );


  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    console.log(data);
    setInfo(data);
    console.log(data.description);
    setDescription(data.description);
    setInitialDescription(data.description);

  }, [data]);



  const handleClick = async (e) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    try {
      const newClaim = {
        active: true,
        ...info,
        ...description,
        createdAt: today.toISOString(),
        userId: userLocal,
      };

      setShowModalInfo(true);
      await axios.post(`${process.env.REACT_APP_API}/api/claims/add`, newClaim);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-indigo-500 px-3 md:px-8" />
      <UploadModal
        setShowModal={setShowModalUpload}
        showModal={showModalUpload}
      />
      <InfoModal
        setShowModal={setShowModalInfo}
        showModal={showModalInfo}
        info="Se ha creado de forma exitosa"
      />

      <div className="px-3 md:px-8 h-auto ">
        <div className="container mx-auto max-w-full">
          <div className="mt-10 mb-10">
            <div className="bg-blue-600 shadow-xl p-5 py-8 rounded-2xl items-center flex justify-between">
              <Link to={`/${path_2}/`} className="text-white">
                <HiArrowCircleLeft size={24} />
              </Link>
              <h2 className="text-2xl text-white text-center capitalize font-semibold">
                Editar Reclamo
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
                    Título
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
                      className="w-full p-1 ml-3 text-black outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    for="name"
                    className="block py-1 font-medium text-gray-700"
                  >
                    Descripción
                  </label>
                  <div className="flex items-center border-gray-400 p-2 border rounded-xl">
                    <TextEditor initialValue={initialDescription} setDescription={setDescription} />
                  </div>
                </div>
              </div>
              <div className="w-full col-span-2">
                <div className="text-center">
                  <ButtonSecondary> Cancelar</ButtonSecondary>
                  <ButtonPrimary onClick={(e) => handleClick(e)}>
                    Guardar Cambios
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

export default NewClaim;
