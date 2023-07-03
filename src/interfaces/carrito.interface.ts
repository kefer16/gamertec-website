import { CarritoEntity } from "../entities/carrito.entities";
import { MarcaService } from "../entities/marca.entities";
import { ModeloService } from "../entities/modelo.entities";

export interface CarritoCaracteristicasProps {
	marca: MarcaService;
	modelo: ModeloService;
	carrito: CarritoEntity;
}
