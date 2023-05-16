import { useState } from "react";

import {
	DataGrid,
	GridRowsProp,
	GridColDef,
	GridValidRowModel,
	GridColumnVisibilityModel,
} from "@mui/x-data-grid";

interface Props {
	rows: GridRowsProp;
	columns: GridColDef<GridValidRowModel>[];
	filaSeleccionada: number | null;
	funcionClickFila: (params: any) => void;
	funcionCheckFila: (params: any) => void;
}

export const TableControl = ({
	rows,
	columns,
	filaSeleccionada,
	funcionClickFila,
	funcionCheckFila,
}: Props) => {
	const [columnVisibilityModel, setColumnVisibilityModel] =
		useState<GridColumnVisibilityModel>({
			id: false,
			estado: false,
		});

	return (
		<div style={{ height: 400, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10]}
				checkboxSelection
				onRowClick={funcionClickFila}
				rowSelectionModel={filaSeleccionada !== null ? [filaSeleccionada] : []}
				onRowSelectionModelChange={funcionCheckFila}
				columnVisibilityModel={columnVisibilityModel}
			/>
		</div>
	);
};
