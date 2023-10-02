import { AccionNombreFuncion } from "../Accion";

export const plantillaAccion = ({ titulo }: AccionNombreFuncion) => {
	return (
		<div className="cajas-form">
			<form action="" method="POST">
				<div className="texto">
					<p>{`${titulo} actual`}</p>
				</div>
				<div className="inputs">
					<label> {`Ingrese el nuevo ${titulo}:`}</label>
					<input type="email" placeholder="Nombre" />
				</div>

				<div className="boton">
					<input type="submit" value="Actualizar" />
				</div>

			</form>
		</div>
	);
};