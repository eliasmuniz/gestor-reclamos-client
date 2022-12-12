export const userColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "username",
      headerName: "Nombre de usuario",
      width: 230,
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "country",
      headerName: "Country",
      width: 100,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
    },
  ];
  


  export const claimColumns = [
    {
      field: "claimId",
      headerName: "Id Reclamo",
      width: 150,
    },
    {
      field: "userId",
      headerName: "Id Usuario",
      width: 100,
    },
    {
      field: "active",
      headerName: "Estado",
      width: 100,
    },
    {
      field: "title",
      headerName: "Título",
      width: 230,
    },
  {
      field: "createdAt",
      headerName: "Fecha de Creación",
      width: 230,
    },
  ];

  
  export const propertyTypesColumns = [
    {
      field: "title",
      headerName: "Nombre",
      width: 150,
    },
  ];
    
  export const cityColumns = [
    {
      field: "title",
      headerName: "Nombre",
      width: 150,
    },
  ];
  
  
  export const roomColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "title",
      headerName: "Title",
      width: 230,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "maxPeople",
      headerName: "Max People",
      width: 100,
    },
  ];
  