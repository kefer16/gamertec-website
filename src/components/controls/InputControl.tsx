import React, { ReactNode } from "react";
import "./styles/InputControl.scss";

interface InterfaceInputControl {
	icon?: ReactNode | null;
	type?: "text" | "password" | "email";
	name: string;
	value: string;
	placeholder?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputControl: React.FC<InterfaceInputControl> = ({
	icon,
	type,
	name,
	value,
	placeholder,
	onChange,
}) => {
	return (
		<div className="inputcontrol">
			<div className="inputcontrol-icon">{icon}</div>
			<input
				className="inputcontrol-input"
				name={name}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	);
};
