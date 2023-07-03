import { createContext, useState } from "react";
import { SesionGamertec } from "../../interfaces/sesion.interface";
import { sesionGamertec } from "../../session/gamertec.session";

export interface SesionGamertecContextProps {
	sesionGamertec: SesionGamertec;
	obtenerSesion: () => void;
}

export const GamertecSesionContext = createContext<SesionGamertecContextProps>({
	sesionGamertec: sesionGamertec,
	obtenerSesion: () => {},
});

export const SesionProvider = ({ children }: any) => {
	const [sesionGamertec, setSesionGamertec] = useState<SesionGamertec>({
		usuario: {
			usuario_id: 0,
			usuario: "",
			correo: "",
			nombre: "",
			apellido: "",
			foto: "",
		},
		privilegio: {
			privilegio_id: 0,
			nombre: "",
			abreviatura: "",
		},
	});

	const obtenerSesion = () => {
		if (!sessionStorage.hasOwnProperty("sesion_gamertec")) {
			return sesionGamertec;
		}
		const sesion = sessionStorage.getItem("sesion_gamertec");

		sesionGamertec.usuario = sesion ? JSON.parse(sesion).usuario : sesionGamertec;

		sesionGamertec.privilegio = sesion
			? JSON.parse(sesion).privilegio
			: sesionGamertec;

		setSesionGamertec(sesionGamertec);
		console.log("pasa");
	};

	return (
		<GamertecSesionContext.Provider
			value={{
				sesionGamertec,
				obtenerSesion,
			}}
		>
			{children}
		</GamertecSesionContext.Provider>
	);
};
