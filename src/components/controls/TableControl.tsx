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
}

export const TableControl = ({ rows, columns }: Props) => {
	const [selectedRow, setSelectedRow] = useState<number | null>(null);

	const [columnVisibilityModel, setColumnVisibilityModel] =
		useState<GridColumnVisibilityModel>({
			id: false,
			brokerId: false,
			status: false,
		});
	const handleRowClick = (params: any) => {
		setSelectedRow(params.id === selectedRow ? null : params.id);
	};

	const handleRowCheck = (params: any) => {
		const item = params[params.length - 1];
		setSelectedRow(item === undefined ? null : item);
	};

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
				onRowClick={handleRowClick}
				rowSelectionModel={selectedRow !== null ? [selectedRow] : []}
				onRowSelectionModelChange={handleRowCheck}
				columnVisibilityModel={columnVisibilityModel}
			/>
		</div>
	);
};
