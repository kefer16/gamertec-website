export const convertirFecha = (fechaString: string): string => {
   const fecha = new Date(fechaString);
   return fecha.toLocaleString("es-ES", { timeZone: "UTC" });
};

export function convertirFechaVisual(fecha: string | undefined): string {
   // 2023-04-12T00:25:06.657Z
   if (fecha) {
      const dia = fecha.substring(8, 10);
      const mes = fecha.substring(5, 7);
      const anio = fecha.substring(0, 4);
      const hora = fecha.substring(11, 13);
      const minutos = fecha.substring(14, 16);
      const segundos = fecha.substring(17, 19);
      return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos} ${
         parseInt(hora) >= 0 && parseInt(hora) <= 11 ? "AM" : "PM"
      }`;
   }
   return "";
}

export function fechaVisualDateToString(fecha: Date): string {
   // 2023-04-12T00:25:06.657Z
   const fechaString = fecha.toString();
   if (fechaString) {
      const dia = fechaString.substring(8, 10);
      const mes = fechaString.substring(5, 7);
      const anio = fechaString.substring(0, 4);
      const hora = fechaString.substring(11, 13);
      const minutos = fechaString.substring(14, 16);
      const segundos = fechaString.substring(17, 19);
      return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos} ${
         parseInt(hora) >= 0 && parseInt(hora) <= 11 ? "AM" : "PM"
      }`;
   }
   return "";
}

export function convertirFechaSQL(fecha: string): string {
   // 2023-04-12T00:25:06.657Z
   const dia = fecha.substring(8, 10);
   const mes = fecha.substring(5, 7);
   const anio = fecha.substring(0, 4);
   const hora = fecha.substring(11, 13);
   const minutos = fecha.substring(14, 16);
   const segundos = fecha.substring(17, 19);

   return `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
}

export function crearFechaISO(): string {
   const fecha: Date = new Date(new Date().setHours(new Date().getHours() - 5)); //restamos 5 horas a fecha actual
   const fecha_ISO: string = fecha.toISOString(); //le añade 5 horas
   return fecha_ISO;
}

export function fechaActualISO(): string {
   return new Date(
      new Date().setHours(new Date().getHours() - 5)
   ).toISOString(); //restamos 5 horas a fecha actual
}

export function fechaVisualizarCalendario(fecha: string): Date {
   return new Date(new Date(fecha).setHours(new Date(fecha).getHours() + 5)); //agregamos 5horas a la fecha actual
}
export function convertirFormatoMoneda(moneda: number | undefined): string {
   const formatter = new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
   });
   if (moneda) {
      return formatter.format(moneda);
   } else {
      return "S/. 0.00";
   }
}

export function formatoCalificacion(decimal: number): string {
   const roundedNumber = Math.round(decimal * 10) / 10;
   return roundedNumber.toFixed(1);
}

export const formatoMonedaPerunana = (value: number) => {
   return value.toLocaleString("es-PE", { style: "currency", currency: "PEN" });
};
