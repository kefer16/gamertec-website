export interface InterfaceAlertControl {
	active: boolean;
	type: "error" | "warning" | "info" | "success";
	text: string;
}

export const AlerControl: React.FC<InterfaceAlertControl> = ({
	active,
	type,
	text,
}) => {
	return <>{active ? <p className={`alert-${type}`}>{text}</p> : ""}</>;
};
