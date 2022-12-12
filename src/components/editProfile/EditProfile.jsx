import ButtonPrimary from "components/buttonPrimary/ButtonPrimary";
import ButtonSecondary from "components/buttonSecondary/ButtonSecondary";
import React, { useCallback, useEffect, useState } from "react";
import {
  HiAtSymbol,
  HiOutlineUserCircle,
  HiOutlineCurrencyDollar,
  HiArrowCircleLeft,
} from "react-icons/hi";

import cuid from "cuid";
import UploadModal from "components/uploadModal/UploadModal";
import InfoModal from "components/infoModal/InfoModal";
import { Link, useLocation } from "react-router-dom";
import useFetch from "hooks/useFetch";
import axios from "axios";

const EditProfile = () => {
  const loc = useLocation();
  const path = loc.pathname.split("/")[2];
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [info, setInfo] = useState({});
  const [imageFeatured, setImageFeatured] = useState([{}]);

  const { data, loading, error } = useFetch(`/api/users/${path}/`);

  const handleChange = (e) => {
    console.log(e.target.value);
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

 

  useEffect(() => {
    setInfo(data);
    setImageFeatured([{ id: cuid(), src: data.img }]);
    console.log(data);
  }, [data]);

  const handleClick = async (e) => {
    try {
      setShowModalUpload(true);
      const featured = await Promise.all(
        Object.values(imageFeatured).map(async (file) => {
          if (file.src.includes("http")) return file.src;
          const instance = axios.create();
          const data = new FormData();

          data.append("file", file.src);
          data.append("upload_preset", "y9ikr1kk");

          const uploadRes = await instance.post(
            process.env.REACT_APP_CLOUDINARY_KEY,
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const featuredImg = featured[0];

      setShowModalUpload(false);

      const updateUser = {
        ...info,
        img: featuredImg,
      };

      console.log(updateUser);

      await axios
        .put(`/api/users/${path}`, updateUser)
        .then(localStorage.setItem("user", JSON.stringify(updateUser)));

      setShowModalInfo(true);
      //await axios.post("/api/users", newProperty, { withCredentials: true });
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
        info="Se ha actualizado el usuario"
      />

      <div className="px-3 md:px-8 h-auto ">
        <div className="container mx-auto max-w-full">
          <div className="mt-10 mb-10">
            <div className="bg-blue-600 shadow-xl p-5 py-8 rounded-2xl items-center flex justify-between">
              <Link to={`/`} className="text-white">
                <HiArrowCircleLeft size={24} />
              </Link>
              <h2 className="text-2xl text-white text-center capitalize font-semibold">
                Editar Perfil
              </h2>
              <div></div>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="">
            <div className="lg:grid lg:grid-cols-2 gap-6 bg-gray-50 shadow-xl p-5 rounded-2xl">
              <div className="">
                <div className="mb-4">
                  <label
                    for="name"
                    className="block py-1 font-medium text-gray-700"
                  >
                    Nombre de usuario (*)
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
                      value={info?.username}
                      id="username"
                      onChange={handleChange}
                      className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="mb-4">
                  <label
                    for="name"
                    className="block py-1 font-medium text-gray-700"
                  >
                    Email (*)
                  </label>
                  <div className="flex items-center border-gray-400 p-2 border rounded-xl">
                    <div className="text-gray-500">
                      <HiAtSymbol className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      value={info?.email}
                      id="email"
                      onChange={handleChange}
                      className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="mb-4">
                  <label
                    for="name"
                    className="block py-1 font-medium text-gray-700"
                  >
                    País
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
                      value={info?.country}
                      id="country"
                      onChange={handleChange}
                      className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="mb-4">
                  <label
                    for="name"
                    className="block py-1 font-medium text-gray-700"
                  >
                    Ciudad
                  </label>
                  <div className="flex items-center border-gray-400 p-2 border rounded-xl">
                    <div className="text-gray-500">
                      <HiAtSymbol className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      value={info?.city}
                      id="city"
                      onChange={handleChange}
                      className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="mb-4">
                  <label
                    for="name"
                    className="block py-1 font-medium text-gray-700"
                  >
                    Teléfono
                  </label>
                  <div className="flex items-center border-gray-400 p-2 border rounded-xl">
                    <div className="text-gray-500">
                      <HiAtSymbol className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      value={info?.phone}
                      id="phone"
                      onChange={handleChange}
                      className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-6">
                <div>
                  <label
                    for="name"
                    className="block py-1 font-medium text-gray-700"
                  >
                    Foto de perfil (*)
                  </label>

                </div>
                <div className="pt-8">
                  
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

export default EditProfile;
