"use client";
import { getAxiosConfig } from "@/components/axiosConfig";
import { formToJSON } from "axios";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState<string>("");
  const handleForm = async (formData: FormData) => {
    try {
      const jsonData = formToJSON(formData);
      const res = await getAxiosConfig().post("auth/login", jsonData);
      const resData: { jwt: string } = res.data;
      console.log(resData);
      localStorage.setItem("token", resData.jwt);
       // Check user type
      const userTypeRes = await getAxiosConfig().get("http://localhost:8000/admin/type");
      const userType = userTypeRes.data[0].type; // Assuming the response is an array with a single object containing the user type
      
      if (userType === "admin") {
        router.push("/adminPages");
      } else {
        router.push("/home");
      }
    } catch (ex) {
      console.log(ex);
      setLoginStatus("Login Failed");
    }
  };
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 container mx-auto px-1 lg:px-20 md:px-10">
      <Card className="max-w-sm w-1/2">
        <form className="flex flex-col gap-4" action={handleForm}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              name="email"
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
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Submit</Button>
        </form>
        <p className="text-center">Need to create an account? </p>
        <Link className="text-center text-blue-600" href="/register">Sign Up</Link>
        
      </Card>
    </main>
  );
}
