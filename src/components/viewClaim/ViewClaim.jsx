import React, { useEffect, useState } from "react";
import {
  HiOutlineUserCircle,
  HiArrowCircleLeft,
  HiCheck,
} from "react-icons/hi";

import ButtonPrimary from "components/buttonPrimary/ButtonPrimary";
import ButtonSecondary from "components/buttonSecondary/ButtonSecondary";
import axios from "axios";
import useFetch from "hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import UploadModal from "components/uploadModal/UploadModal";
import InfoModal from "components/infoModal/InfoModal";
import TextEditor from "components/textEditor/TextEditor";
import Replies from "components/replies/Replies";
import ModalAction from "components/modalAction/ModalAction";

const ViewClaim = () => {
  const loc = useLocation();
  const path = loc.pathname.split("/")[3];
  const path_2 = loc.pathname.split("/")[1];
  const userLocal = JSON.parse(localStorage.getItem("user")).userId;
  const roleLocal = JSON.parse(localStorage.getItem("user")).roleId;

  const [info, setInfo] = useState({});
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showAddReply, setShowAddReply] = useState(false);
  const [showCloseClaim, setShowCloseClaim] = useState(false);

  const [description, setDescription] = useState("");
  const [initialDescription, setInitialDescription] = useState(null);

  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API}/api/claims/find/${path}/`
  );

  const { data: user } = useFetch(
    `http://localhost:8090/api/users/find/${data.userId}`
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
      const newReply = {
        active: true,
        ...description,
        dateReply: today.toISOString(),
        userId: userLocal,
        claimId: path,
      };

      // "active" : true,
      // "title" : "Nuevo reclamo 31",
      // "description" : "Descripción del reclamo",
      // "dateReply" :"2022-01-01T17:30:00",
      // "userId" : 3,
      // "claimId":1

      setShowAddReply(false);
      setShowModalInfo(true);
      console.log(newReply);
      await axios.post(
        `${process.env.REACT_APP_API}/api/replies/add`,
        newReply
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = async (e) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    try {
      const closeClaim = {
        claimId: path,
        active: false,
        title: info.title,
        description: info.description,
        createdAt: today.toISOString(),
        userId: userLocal,
      };

      setShowAddReply(false);
      setShowModalInfo(true);
      await axios.post(
        `${process.env.REACT_APP_API}/api/claims/add`,
        closeClaim
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-indigo-500 px-3 md:px-8" />

      <ModalAction setShowModal={setShowAddReply} showModal={showAddReply}>
        <>
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h2 className="text-2xl font-semibold">Agregar Respuesta</h2>
          </div>
          {/*body*/}
          <div className="relative p-5 flex-auto justify-center flex">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="gap-6 rounded-2xl">
                <div>
                  <div className="mb-4">
                    <label
                      for="name"
                      className="block py-1 font-medium text-gray-700"
                    >
                      Descripción
                    </label>
                    <div className="flex items-center border-gray-400 p-2 border rounded-xl">
                      <TextEditor setDescription={setDescription} />
                    </div>
                  </div>
                </div>
                <div className="w-full col-span-2">
                  <div className="text-center flex justify-between">
                    <ButtonSecondary onClick={(e) => setShowAddReply(false)}>
                      {" "}
                      Cancelar
                    </ButtonSecondary>
                    <ButtonPrimary onClick={(e) => handleClick(e)}>
                      Guardar
                    </ButtonPrimary>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/*footer*/}
        </>
      </ModalAction>
      <ModalAction setShowModal={setShowCloseClaim} showModal={showCloseClaim}>
        <>
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h2 className="text-2xl font-semibold">
              ¿Estás seguro de cerrar la solicitud?
            </h2>
          </div>
          {/*body*/}
          <div className="relative p-5 flex-auto justify-center flex">
            <p>
              Recuerda comprobar que el cliente haya podido solucionar sus
              problemas.
            </p>
          </div>
          <div className="w-full p-5">
            <div className="flex justify-center">
              <div className="flex align-middle">
                <ButtonSecondary onClick={(e) => setShowAddReply(false)}>
                  Cancelar
                </ButtonSecondary>
                <ButtonPrimary onClick={(e) => handleClose(e)}>
                  Guardar
                </ButtonPrimary>
              </div>
            </div>
          </div>
          {/*footer*/}
        </>
      </ModalAction>

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
                Ver Reclamo
              </h2>
              <div></div>
            </div>
          </div>
          <div className=" gap-6 bg-gray-50 shadow-xl p-5 rounded-2xl">
            <div className="">
              <div className="mb-4">
                <label
                  for="name"
                  className="block py-1 font-medium text-gray-700"
                ></label>
                <div className="flex justify-between  rounded-xl">
                  <h3 className="text-2xl font-medium">{info.title}</h3>
                  <h3 className="text-2xl font-medium">
                    {user.name} {user.lastName}
                  </h3>
                </div>
              </div>

              <div className="mb-4">
                <label
                  for="name"
                  className="block py-1 font-medium text-gray-700"
                >
                  Descripción del reclamo
                </label>
                <div className=" ">
                  <div className="  rounded-2xl bg-gray-200   p-4">
                    <div
                      dangerouslySetInnerHTML={{ __html: initialDescription }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 gap-6 bg-gray-50 shadow-xl p-5 rounded-2xl">
            <div className="">
              <div className="mb-4">
                <label
                  for="name"
                  className="block py-1 font-medium text-gray-700"
                ></label>
                <div className="flex items-center  rounded-xl">
                  <h3 className="text-2xl font-medium">Respuestas</h3>
                </div>
              </div>

              <Replies claimId={path} />

              <div className="flex justify-between">
                {info.active ? (
                  <>
                    <ButtonPrimary onClick={() => setShowAddReply(true)}>
                      Agregar Respuesta
                    </ButtonPrimary>
                    {roleLocal !== 1 ? null : (
                      <ButtonPrimary
                        styles="bg-teal-600"
                        onClick={() => setShowCloseClaim(true)}
                      >
                        <HiCheck size={22} className="mr-2" /> Cerrar Solicitud
                      </ButtonPrimary>
                    )}
                  </>
                ) : (
                  "Cerrado"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewClaim;
