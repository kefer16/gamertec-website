import { SesionGamertec } from "../interfaces/sesion.interface";

export const GuadarSession = (sesion: SesionGamertec) => {
	sessionStorage.setItem("sesion_gamertec", JSON.stringify(sesion));
};
