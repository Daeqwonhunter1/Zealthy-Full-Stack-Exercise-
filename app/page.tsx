"use client";


import { useState} from "react"
import type { SubmitEvent } from "react";
import axios from "axios" 
import { LoginResponse } from "@/types";


export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponse>("/api/login", {
        email,
        password,
      });
      console.log("LOGIN SUCCESS:", response.data);

    }catch (error) {
      console.error("LOGIN ERROR:", error)
    }

  }

  return (
     <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
