'use client';
import axios from "axios";
import { useState } from "react";
export default function Register(){
    const [state, setState] = useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange = (e:any) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]:value
        });
    }

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        const userData={
            name:state.name,
            email:state.email,
            password:state.password
        };
        axios.post("http://localhost:8000/auth/register", userData)
        .then((response) => {
            console.log(response.status, response.data);
        })
        .catch((error) => {
            console.error("Error registering user:", error);
        });
    } 
    
    return(
    <main className="flex min-h-screen flex-col justify-between p-24 container mx-auto px-1 lg:px-20 md:px-10">
        <h1>Registration:</h1><hr />
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={state.name} onChange={handleChange}/>
            <input type="email" name="email" value={state.email} onChange={handleChange}/>
            <input type="password" name="password" value={state.password} onChange={handleChange}/>
            <button type="submit">Register</button>
        </form>
    </main>
    )
}