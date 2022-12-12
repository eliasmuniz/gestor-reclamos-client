import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import ButtonPrimary from "./buttonPrimary/ButtonPrimary.jsx";
import ButtonSecondary from "./buttonSecondary/ButtonSecondary.jsx";
import ModalAction from "./modalAction/ModalAction.jsx";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import axios from "axios";
import { HiTrash, HiEye, HiPencil } from "react-icons/hi";
import { AuthContext } from "context/AuthContext.js";

export default function Claim({ columns }) {
  // We need the path to make the links to add, delete or update
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [user, setUser] = useState({});
  const userLocal = JSON.parse(localStorage.getItem("user")).userId;
  console.log(userLocal);

  const [showModal, setShowModal] = useState(false);
  const [currentClaim, setCurrentClaim] = useState("");

  // List to manage the items
  const PRODUCT_LIMIT = 5;
  const [list, setList] = useState();
  const [offsetProducts, setOffsetProducts] = useState(0);
  const [totalProp, setTotalProp] = useState(0);

  const { data, loading, error } = useFetch(
    `http://localhost:8090/api/${path}/findByUserId/${userLocal}?limit=${PRODUCT_LIMIT}&offset=${offsetProducts}`
  );

  useEffect(() => {
    setList(data);
    data.map((row) => {
      console.log(Object.values(row));
      Object.values(row).map((ele) => {
        console.log(ele);
      });
    });
  }, [data]);

  const handleModalDelete = async (id, title) => {
    setShowModal(true);
    setCurrentClaim({ id, title });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/claims/delete/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
    setShowModal(false);
  };

  return (
    <>
      <div className="px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <ModalAction setShowModal={setShowModal} showModal={showModal}>
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Eliminar reclamo</h3>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    ¿Estás seguro que deseas eliminar el reclamo: {currentClaim.title}?
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                <ButtonSecondary onClick={() => setShowModal(false)}>
                  Cancelar
                </ButtonSecondary>

                <ButtonPrimary onClick={() => handleDelete(currentClaim.id)}>
                  Eliminar
                </ButtonPrimary>
              </div>
            </ModalAction>

            <div className="mt-10 mb-10">
              <div className="bg-blue-600 shadow-xl p-5 py-8 rounded-2xl">
                <h2 className="text-2xl text-white text-center capitalize font-semibold">
                 Reclamos
                </h2>
              </div>
            </div>

            <Card>
              <CardBody>
                <div className="flex justify-between w-full mb-8 px-2 items-center ">
                  <h2 className="text-gray-700 text-2xl">Lista </h2>
                  <Link to={`/${path}/new`} className="link">
                    <ButtonPrimary>Agregar Reclamo</ButtonPrimary>
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead className="bg-slate-200">
                      <tr>
                        {columns?.map((column, index) => (
                          index === 1 ? null :
                          <th className="px-2 text-slate-900 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-medium text-center">
                            {column.headerName}
                          </th>
                        ))}
                        <th className="px-2 text-slate-900 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-medium text-center">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {list?.map((row) => (
                        <tr>
                          <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-center">
                            {row.claimId}
                          </th>
                         
                          <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-center">
                            {row.active === true ? (
                              <div className="bg-emerald-500 rounded-3xl font-semibold text-white px-2 ">
                                ACTIVO
                              </div>
                            ) : (
                              <div className="bg-gray-500 rounded-3xl font-semibold text-white px-2 ">
                                CERRADO
                              </div>
                            )}
                          </th>
                          <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-center">
                            {row.title}
                          </th>
                          <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-center">
                            {row.createdAt}
                          </th>

                          <th className="border-b border-gray-200 align-middle  text-sm whitespace-nowrap px-2 py-4 text-left">
                            <div className="cellAction flex flex-row text-gray-700 hover:text-gray-900">
                              <Link
                                to={`/${path}/${row.claimId}`}
                                style={{ textDecoration: "none" }}
                              >
                                <div className="deleteButton cursor-pointer ml-6 text-gray-700 hover:text-gray-900 transition">
                                  <HiPencil size={24} />
                                </div>
                              </Link>

                              <Link
                                to={`/${path}/view/${row.claimId}`}
                                style={{ textDecoration: "none" }}
                              >
                                <div className="deleteButton cursor-pointer ml-6 text-gray-700 hover:text-gray-900 transition">
                                  <HiEye size={24} />
                                </div>
                              </Link>
                              <div
                                className="deleteButton cursor-pointer ml-6 text-red-400 hover:text-red-600 transition"
                                onClick={() =>
                                  handleModalDelete(row.claimId, row.title)
                                }
                              >
                                <HiTrash size={24} />
                              </div>
                            </div>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
