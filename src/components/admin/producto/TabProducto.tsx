import { Footer } from "../../global/Footer";
import { Header } from "../../global/Header";
import { Producto } from "./Producto";

export const TabProducto = () => {
	return (
		<>
			<Header />
			<Producto nombreFormulario="Producto" />
			<Footer />
		</>
	);
};
