import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
	IconTrash,
	IconPlus,
	IconEdit,
	IconHistory,
	IconSearch,
} from "@tabler/icons-react";

interface Props {
	functionCrear?: () => void;
	functionActualizar?: () => void;
	functionEliminar?: () => void;
	functionHistoria?: () => void;
}

export const ToolbarControl = ({
	functionCrear,
	functionActualizar,
	functionEliminar,
	functionHistoria,
}: Props) => {
	const startContent = (
		<>
			<Button
				label="Nuevo"
				icon={<IconPlus className="mr-2" size={24} />}
				className="mr-2 p-button-success"
				onClick={functionCrear}
			/>
			<Button
				label="Modificar"
				icon={<IconEdit className="mr-2" size={24} />}
				className="mr-2 p-button-warning"
				onClick={functionActualizar}
			/>

			<Button
				label="Eliminar"
				icon={<IconTrash className="mr-2" size={24} />}
				className="mr-2 p-button-danger"
				onClick={functionEliminar}
			/>
			<Button
				label="Historial"
				icon={<IconHistory className="mr-2" size={24} />}
				className="mr-2"
				onClick={functionHistoria}
			/>
		</>
	);

	const endContent = (
		<>
			<div className="p-inputgroup">
				<InputText placeholder="Buscar..." />
				<Button icon={<IconSearch size={24} />} />
			</div>
		</>
	);
	return (
		<>
			<div className="card">
				<Toolbar start={startContent} end={endContent} />
			</div>
		</>
	);
};
