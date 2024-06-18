const deleteFile = async (id: string, parent: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:4000/api/file/delete?parent=${parent}&id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  console.log(data);
  return data;
};

export default deleteFile;
