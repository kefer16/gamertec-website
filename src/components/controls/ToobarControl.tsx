import { Toolbar, IconButton } from "@mui/material";
import { IonIcon } from "@ionic/react";
import {
	addOutline,
	trashOutline,
	createOutline,
	analyticsOutline,
} from "ionicons/icons";

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
	return (
		<Toolbar
			sx={{
				backgroundColor: "#99999936",

				borderTopLeftRadius: "10px",
				borderTopRightRadius: "10px",
				justifyContent: "flex-end",
			}}
		>
			<IconButton style={{ color: "#00c853" }} onClick={functionCrear}>
				<IonIcon icon={addOutline} size="30" color="#00c853" />
			</IconButton>
			<IconButton style={{ color: "#448aff" }} onClick={functionActualizar}>
				<IonIcon icon={createOutline} size="30" />
			</IconButton>
			<IconButton style={{ color: "#d50000" }} onClick={functionEliminar}>
				<IonIcon icon={trashOutline} size="30" />
			</IconButton>
			<IconButton style={{ color: "#7c4dff" }} onClick={functionHistoria}>
				<IonIcon icon={analyticsOutline} size="30" />
			</IconButton>
		</Toolbar>
	);
};
