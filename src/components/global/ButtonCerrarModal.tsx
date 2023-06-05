import { ButtonCerrarModalStyled } from "./styles/ButtonCerrarModalStyled";

interface Props {
	funcionCerrarModal: () => void;
}

export const ButtonCerrarModal = ({ funcionCerrarModal }: Props) => {
	return <ButtonCerrarModalStyled onClick={funcionCerrarModal} />;
};
