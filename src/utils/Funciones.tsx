export const convertirFecha = (fechaString: string): string => {
	const fecha = new Date(fechaString);
	return fecha.toLocaleString("es-ES", { timeZone: "UTC" });
};
