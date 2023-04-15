export const convertirFecha = (fechaString: string): string => {
	const fecha = new Date(fechaString);
	const dia = fecha.getDate().toString().padStart(2, "0");
	const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
	const anio = fecha.getFullYear().toString();
	return `${dia}/${mes}/${anio}`;
};
