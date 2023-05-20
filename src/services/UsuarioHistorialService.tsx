import axios, { AxiosResponse } from "axios";
import { UsuarioService } from "./UsuarioService";

const API_URL = process.env.REACT_APP_API_URL;

export class UsuarioHistorialService extends UsuarioService {
	constructor(
		public fecha_inicial: string = "",
		public fecha_final: string = ""
	) {
		super();
	}

	public index: number = 0;
}
