import { Toolbar, IconButton } from "@mui/material";
import { IonIcon } from "@ionic/react";
import {
	addOutline,
	trashOutline,
	createOutline,
	analyticsOutline,
} from "ionicons/icons";

interface Props {
	functionNew?: () => void;
	functionUpdate?: () => void;
	functionDelete?: () => void;
	functionHistory?: () => void;
}

export const ToolbarControl = ({
	functionNew,
	functionUpdate,
	functionDelete,
	functionHistory,
}: Props) => {
	return (
		<Toolbar
			style={{
				justifyContent: "flex-end",
			}}
		>
			<IconButton style={{ color: "#00c853" }} onClick={functionNew}>
				<IonIcon icon={addOutline} size="30" color="#00c853" />
			</IconButton>
			<IconButton style={{ color: "#448aff" }} onClick={functionUpdate}>
				<IonIcon icon={createOutline} size="30" />
			</IconButton>
			<IconButton style={{ color: "#d50000" }} onClick={functionDelete}>
				<IonIcon icon={trashOutline} size="30" />
			</IconButton>
			<IconButton style={{ color: "#7c4dff" }} onClick={functionHistory}>
				<IonIcon icon={analyticsOutline} size="30" />
			</IconButton>
		</Toolbar>
	);
};
