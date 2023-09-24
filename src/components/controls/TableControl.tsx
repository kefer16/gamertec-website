/* eslint-disable indent */
import { useEffect, useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CSSProperties } from "styled-components";
import { Tag } from "primereact/tag";
import {
	fechaVisualDateToString,
	formatoMonedaPerunana,
} from "../../utils/funciones.utils";

export enum TypeColumn {

	TEXT = "text",
	STATUS = "status",
	IMAGE = "image",
	DATE = "date",
	MONEY = "money",
	NUMBER = "number",
}
export interface ColumnProps {
	type: TypeColumn;
	field: string;
	header: string;
	style: CSSProperties;
}
interface Props<T> {
	ancho: CSSProperties;
	columnas: ColumnProps[];
	filas: T[];
	filaSeleccionada: T;
	funcionFilaSeleccionada: (param: T) => void;
}
export interface ImagenProps {
	img: string;
	alt: string;
}

export interface EstadoProps {
	valor: boolean;
	estado: string;
}

export const TableControl = <T extends object>({
	ancho,
	columnas,
	filas,
	filaSeleccionada,
	funcionFilaSeleccionada,
}: Props<T>) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	return (
		<>
			<div className="card">
				<DataTable
					value={filas}
					paginator
					rows={10}
					rowsPerPageOptions={[10, 20, 30]}
					tableStyle={ancho}
					selection={filaSeleccionada}
					onSelectionChange={(e) => {
						funcionFilaSeleccionada(e.value);
					}}
					dataKey="id"
					loading={isLoading}
					showGridlines
				>
					<Column selectionMode="single" headerStyle={{ width: "1%" }}></Column>
					{!columnas ? (
						<></>
					) : (
						columnas.map((item: ColumnProps) => {
							switch (item.type) {
								case TypeColumn.TEXT: {
									return (
										<Column
											key={item.field}
											field={item.field}
											header={item.header}
											style={item.style}
											sortable
										/>
									);
								}
								case TypeColumn.STATUS: {
									const body = (fila: any) => {
										const estado: EstadoProps = fila[`${item.field}`];
										return (
											<Tag
												value={estado.estado}
												severity={estado.valor ? "success" : "danger"}
											/>
										);
									};
									return (
										<Column
											key={item.field}
											field={item.field}
											header={item.header}
											style={item.style}
											body={body}
											sortable
										/>
									);
								}
								case TypeColumn.IMAGE: {
									const body = (fila: any) => {
										const imagen: ImagenProps = fila[`${item.field}`];

										return (
											<img
												src={imagen.img}
												alt={imagen.alt}
												className="w-4rem shadow-2 border-round"
											/>
										);
									};

									return (
										<Column
											key={item.field}
											field={item.field}
											header={item.header}
											style={item.style}
											body={body}
										/>
									);
								}
								case TypeColumn.DATE: {
									const body = (fila: any) => {
										const fecha: Date = fila[`${item.field}`];
										return fechaVisualDateToString(fecha);
									};

									return (
										<Column
											key={item.field}
											field={item.field}
											header={item.header}
											style={item.style}
											dataType="date"
											body={body}
											sortable
										/>
									);
								}
								case TypeColumn.MONEY: {
									const body = (fila: any) => {
										const money: number = fila[`${item.field}`];
										return formatoMonedaPerunana(money);
									};

									return (
										<Column
											key={item.field}
											field={item.field}
											header={item.header}
											style={item.style}
											dataType="number"
											className="text-right"
											body={body}
											sortable
										/>
									);
								}
								case TypeColumn.NUMBER: {
									return (
										<Column
											key={item.field}
											dataType="number"
											field={item.field}
											header={item.header}
											style={item.style}
											className="text-right"
											sortable
										/>
									);
								}
								default: {
									return <></>;
								}
							}
						})
					)}
				</DataTable>
			</div>
		</>
	);
};
