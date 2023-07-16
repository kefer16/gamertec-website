export class RespuestaEntity<T> {
	constructor(
		public correcto: boolean = false,
		public tipo: "error" | "success" | "warning" = "error",
		public mensaje: string = "",
		public data: T | null = null
	) {}
}
