import React, { ReactNode } from "react";
import "./styles/ButtonControl.scss";

interface InterfaceButtonControl {
	icon: ReactNode | null;
	type: "submit";
	text: string;
}

export const ButtonControl: React.FC<InterfaceButtonControl> = ({
	text,
	type,
	icon,
}) => {
	return (
		<button type={type} className="buttoncontrol">
			{icon} <span className="buttoncontrol-text"> {text}</span>
		</button>
	);
};
