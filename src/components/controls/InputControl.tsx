import React, { ReactNode } from "react";

interface Input {
	icon?: ReactNode;
	placeholder?: string;
	type?: "text" | "password";
}

const InputControl: React.FC<Input> = ({
	icon,
	placeholder,
	type = "button",
}) => {
	return (
		<div className="input__control">
			<div className="input__control-icon">{icon}</div>
			<input
				className="input__control-input"
				type={type}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default InputControl;
