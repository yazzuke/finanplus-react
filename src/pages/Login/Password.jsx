import React, { useState, useEffect } from "react";
import { Input, user } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { useAuth } from "../../context/AuthContext.jsx"; // Importa el hook useAuth
import { GoogleIcon } from "../../assets/GoogleIcon.jsx"; // Importa el componente GoogleIcon
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { json, useNavigate } from "react-router-dom";
import { useUser } from "../../context/FinalContex.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image } from "@nextui-org/react";

function Password() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[980px] h-[460px] dark px-20 py-6 shadow-xl ring-1 ring-gray-900/5 rounded-3xl sm:px-24 bg-[#1C1C1C]">
        <ToastContainer />

        <div
          className="text-center "
          style={{ position: "relative", left: "-240px", top: "135px" }}
        >
          <h1 className="text-3xl font-semibold  text-white whitespace-nowrap">
            Recupera tu contraseña
          </h1>
          <p className="mt-2 text-sm text-white">
            Ingresa tu Correo <br></br> Enviaremos un correo para que recuperes
            tu contraseña
          </p>
        </div>
        <div
          className="flex w-6/12 flex-wrap md:flex-nowrap gap-4 mx-6 "
          style={{ position: "relative", top: "60px", left: "420px" }}
        >
          <Input type="email" label="Email" />
        </div>

        <div
          className="mt-20"
          style={{ position: "relative", top: "40px", left: "555px" }}
        >
          <Button color="primary" variant="flat" type="submit">
            {" "}
            Recuperar contraseña{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Password;
