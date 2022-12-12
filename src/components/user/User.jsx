import useFetch from 'hooks/useFetch';
import React from 'react';

const User = ({userId}) => {
  const { data: user } = useFetch(`http://localhost:8090/api/users/find/${userId}`);

  return (
    <div>{user.name} {user.lastName}</div>
  )
}

export default User;