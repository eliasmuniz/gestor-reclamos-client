import ButtonPrimary from "components/buttonPrimary/ButtonPrimary";
import ModalAction from "components/modalAction/ModalAction";
import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const InfoModal = ({ setShowModal, showModal, info}) => {
  const handleOK = () =>{
    setShowModal(false);
    window.location.reload();
  }
  return (
    <ModalAction setShowModal={setShowModal} showModal={showModal}>
      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
        <h3 className="text-3xl font-semibold">{info}</h3>
      </div>

      <div className="relative p-6 flex-auto text-blue-700 justify-center flex">
        <HiCheckCircle size={82} />
      </div>
   
      <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
   
        <ButtonPrimary onClick={() => handleOK() }>
          Entendido
        </ButtonPrimary>
      </div>
    </ModalAction>
  );
};

export default InfoModal;
