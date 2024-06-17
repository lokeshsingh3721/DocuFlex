const createFolder = async (name: string, parent: string | null) => {
  try {
    const token = localStorage.getItem("token");
    let res;
    if (parent) {
      res = await fetch("http://localhost:4000/api/directory/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          parent,
        }),
      });
    } else
      res = await fetch("http://localhost:4000/api/directory/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
        }),
      });
    const data = await res.json();
    console.log(data);
    return data.success;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
};

export default createFolder;
