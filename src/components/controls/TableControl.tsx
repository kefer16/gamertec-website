import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	Paper,
} from "@mui/material";
import { useState, useEffect } from "react";

interface Props<Entidad> {
	dataHeader: PropsTableHeader[];
	dataBody: Entidad[];
}

export interface PropsTableHeader {
	key: number;
	title: string;
}

export const TableControl = <Entidad extends object>({
	dataHeader,
	dataBody,
}: Props<Entidad>) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const RenderColumn = ({ columns }: any) => {
		const [array, setArray] = useState<any[]>([]);

		useEffect(() => {
			const newarray = [];
			for (const prop in columns) {
				if (columns.hasOwnProperty(prop)) {
					newarray.push(columns[prop]);
				}
			}
			setArray(newarray);
			console.log(newarray);
		}, []);

		return (
			<>
				{array.map((item: any) => {
					return <TableCell>{item}</TableCell>;
				})}
			</>
		);
	};

	return (
		<TableContainer component={Paper}>
			<Table aria-label="Todo table">
				<TableHead>
					<TableRow>
						{dataHeader.map((d: PropsTableHeader) => {
							return <TableCell>{d.title}</TableCell>;
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{dataBody.map((d: Entidad, index) => (
						<TableRow>
							<TableCell>{index + 1}</TableCell>
							<RenderColumn columns={d} />
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[10, 15, 20, { label: "All", value: -1 }]}
							count={dataBody.length}
							page={page}
							onPageChange={(event: any, newPage: number) => {
								setPage(newPage);
							}}
							rowsPerPage={rowsPerPage}
							onRowsPerPageChange={(event: any) => {
								setRowsPerPage(+event.target.value);
								setPage(0);
							}}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
};
