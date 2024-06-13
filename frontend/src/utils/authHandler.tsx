export const handleLogin = async (args: {
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:4000/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  const data = await res.json();
  return data;
};

export const handleSignUp = async (args: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:4000/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first: args.firstName,
      last: args.lastName,
      email: args.email,
      password: args.password,
    }),
  });
  const data = await res.json();
  console.log(data);
  return data;
};
