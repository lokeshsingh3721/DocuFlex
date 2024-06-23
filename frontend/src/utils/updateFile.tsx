const updateFile = async (name: string, fileId: string) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:4000/api/file/update?name=${name}&fileId=${fileId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return data.success;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
};

export default updateFile;
