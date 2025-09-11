"use client";
import { useGetLoginUserMutation } from "@/services/users/userDataApi";
import { useEffect } from "react";

export default function Page() {
  const [loginUser] = useGetLoginUserMutation();

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const res = await loginUser({
          username: "negrnf",
          password: "12345",
        }).unwrap();
        console.log(res);
      } catch (err) {
        console.error("Login error:", err);
      }
    };

    fetchLogin();
  }, []);
}
