import { createContext, useState } from "react";
import { SesionGamertec } from "../../interfaces/sesion.interface";
import { CarritoService } from "../../services/carrito.service";
import { RespuestaEntity } from "../../entities/respuesta.entity";
import { CarritoCantidadUsuario } from "../../interfaces/carrito.interface";


export interface SesionGamertecContextProps {
	sesionGamertec: SesionGamertec;
	cantidadCarrito: number;
	obtenerSesion: () => void;
	obtenerCantidadCarrito: () => void;
}

export const GamertecSesionContext = createContext<SesionGamertecContextProps>({} as SesionGamertecContextProps);

export const SesionProvider = ({ children }: any) => {
	const [sesionGamertec, setSesionGamertec] = useState<SesionGamertec>({
		usuario: {
			usuario_id: 0,
			usuario: "",
			correo: "",
			nombre: "",
			apellido: "",
			foto: "",
			direccion: "",
			telefono: "",
		},
		privilegio: {
			privilegio_id: 0,
			nombre: "",
			abreviatura: "",
		},
	});
	const [cantidadCarrito, setCantidadCarrito] = useState<number>(0);

	const obtenerSesion = () => {

		if (!Object.prototype.hasOwnProperty.call(sessionStorage, "sesion_gamertec")) {
			return sesionGamertec;
		}

		const sesion = sessionStorage.getItem("sesion_gamertec");

		sesionGamertec.usuario = sesion ? JSON.parse(sesion).usuario : sesionGamertec;

		sesionGamertec.privilegio = sesion
			? JSON.parse(sesion).privilegio
			: sesionGamertec;

		setSesionGamertec(sesionGamertec);
	};

	const obtenerCantidadCarrito = async () => {
		const servCarrito = new CarritoService();

		await servCarrito.obtenerCantidadCarrito(sesionGamertec.usuario.usuario_id).then((resp: RespuestaEntity<CarritoCantidadUsuario[]>) => {
				
			if (resp.data){
				setCantidadCarrito(resp.data[0].cantidad);
			}
		});
	};

	return (
		<GamertecSesionContext.Provider
			value={{
				sesionGamertec,
				cantidadCarrito,
				obtenerSesion,
				obtenerCantidadCarrito
			}}
		>
			{children}
		</GamertecSesionContext.Provider>
	);
};
