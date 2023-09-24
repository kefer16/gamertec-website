import { Params, useParams } from "react-router-dom";
import { Accion, AccionNombreEnum } from "./Accion";

export const AcccionIndex = () => {
	const { action_name }: Readonly<Params<AccionNombreEnum | string>> = useParams();
	return (
		<>
			<Accion nombre={action_name ?? AccionNombreEnum.UNDEFINED} />
		</>
	);
};