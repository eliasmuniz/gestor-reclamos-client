import User from "components/user/User";
import useFetch from "hooks/useFetch";
import React, { useEffect, useState } from "react";

const Replies = ({ claimId }) => {
  const userLocal = JSON.parse(localStorage.getItem("user")).userId;

  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API}/api/replies/findByClaimId/${claimId}/`
  );
  const [user, setUser] = useState({});

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (userLocal) {
      setUser(userLocal);
    }
  }, []);


  return !loading ? data.map((reply) => (
    <div className="mb-4">
      
      <div className={`${reply.userId !== user.userId ? "bg-blue-100" : "bg-blue-300 "} rounded-2xl p-4`}>
        <label
          for="name"
          className="flex justify-between py-1 font-medium text-gray-700"
        >
            <User userId={reply.userId} />
          {reply.dateReply}
        </label>
        <div className="flex items-center  rounded-2xl bg-white p-4">
          {<div dangerouslySetInnerHTML={{ __html: reply.description }} />}
        </div>
      </div>
    </div>
  )) : "Cargando respuestas";
};

export default Replies;
