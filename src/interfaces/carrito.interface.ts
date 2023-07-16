import { CarritoEntity } from "../entities/carrito.entities";
import { MarcaService } from "../entities/marca.entities";
import { ModeloEntity } from "../entities/modelo.entity";

export interface CarritoCaracteristicasProps {
	marca: MarcaService;
	modelo: ModeloEntity;
	carrito: CarritoEntity;
}
