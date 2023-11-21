export interface ComboboxProps {
   name: string;
   code: string;
}
export interface ComboboxAnidadoProps {
   name: string;
   code: string;
   codeAnidado: string;
}

export const arrayEstadoCombobox: ComboboxProps[] = [
   {
      code: "1",
      name: "Activo",
   },
   {
      code: "0",
      name: "Inactivo",
   },
];
