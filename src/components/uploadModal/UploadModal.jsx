import ModalAction from 'components/modalAction/ModalAction'
import React from 'react'
import UseAnimations from "react-useanimations";
import loading2 from 'react-useanimations/lib/loading2'

const UploadModal = ({setShowModal, showModal}) => {
  return (
    <ModalAction setShowModal={setShowModal} showModal={showModal}>
        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          <h3 className="text-3xl font-semibold">Subiendo imagenes</h3>
        </div>
        {/*body*/}
        <div className="relative p-6 flex-auto text-blue-700 justify-center flex">
        <UseAnimations
        animation={loading2}
        size={82}
        autoplay={true}
        loop={true}
        style={{ padding: 100 }}
      />
        </div>
        {/*footer*/}
      
      </ModalAction>
  )
}

export default UploadModal