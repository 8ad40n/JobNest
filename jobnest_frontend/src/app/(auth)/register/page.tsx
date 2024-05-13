"use client";
import axios from "axios";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Register() {
    const router = useRouter();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      name: state.name,
      email: state.email,
      password: state.password,
    };
    axios
      .post("http://localhost:8000/auth/register", userData)
      .then((response) => {
        console.log(response.status, response.data);
        router.push("/login");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    // <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
    //     <h1>Registration:</h1><hr />
    //     <form onSubmit={handleSubmit}>
    //         <input type="text" name="name" value={state.name} onChange={handleChange}/>
    //         <input type="email" name="email" value={state.email} onChange={handleChange}/>
    //         <input type="password" name="password" value={state.password} onChange={handleChange}/>
    //         <button type="submit">Register</button>
    //     </form>
    // </main>

    <main className="flex min-h-screen flex-col justify-center items-center p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <Card className="max-w-sm w-1/2">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text1" value="Your name" />
            </div>
            <TextInput
              id="name1"
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
              placeholder="name"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              placeholder="password"
              required
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </main>
  );
}
