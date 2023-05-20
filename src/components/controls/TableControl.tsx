import { useEffect, useState } from "react";

import {
	DataGrid,
	GridRowsProp,
	GridColDef,
	GridValidRowModel,
	GridColumnVisibilityModel,
} from "@mui/x-data-grid";
import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
	rows: GridRowsProp;
	columns: GridColDef<GridValidRowModel>[];
	filaSeleccionada: number | null;
	funcionClickFila: (params: any) => void;
	funcionCheckFila: (params: any) => void;
	columnsVisivility: GridColumnVisibilityModel;
}

export const TableControl = ({
	rows,
	columns,
	filaSeleccionada,
	funcionClickFila,
	funcionCheckFila,
	columnsVisivility,
}: Props) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	return (
		<div style={{ height: 650, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				pageSizeOptions={[10, 15, 20]}
				checkboxSelection
				onRowClick={funcionClickFila}
				rowSelectionModel={filaSeleccionada !== null ? [filaSeleccionada] : []}
				onRowSelectionModelChange={funcionCheckFila}
				columnVisibilityModel={columnsVisivility}
				loading={isLoading}
			/>
		</div>
	);
};
