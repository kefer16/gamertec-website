import DeleteIcon from "@mui/icons-material/Delete";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import "./styles/shoppingcart.scss";
export const ShoppingCart = () => {
	return (
		<>
			<div className="container">
				<div className="container-max">
					<div className="shoppingcart">
						{/* <h2 className="shoppingcart-title">Carrito de Compras</h2> */}
						<div className="shoppingcart__content">
							<div className="shoppingcart__content__item">
								<div className="shoppingcart__content__item__details">
									<img
										className="shoppingcart__content__item__details__image"
										src="https://via.placeholder.com/150"
										alt=""
									/>

									<div className="shoppingcart__content__item__details__text">
										<p className="shoppingcart__content__item__details__text-brand">
											Marca
										</p>
										<p className="shoppingcart__content__item__details__text-name">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
											error!
										</p>
										<p className="shoppingcart__content__item__details__text-model">
											Modelo: Modelo
										</p>
									</div>
									<div className="shoppingcart__content__item__details__sending">
										<p className="shoppingcart__content__item__details__sending-price">
											S/ 300
										</p>
										<p className="shoppingcart__content__item__details__sending-text">
											Envio a Domicilio
										</p>
										<p className="shoppingcart__content__item__details__sending-stock">
											3 Un. disponibles
										</p>
									</div>
									<div className="shoppingcart__content__item__details__quantity">
										<button className="shoppingcart__content__item__details__quantity-button">
											-
										</button>
										<input
											className="shoppingcart__content__item__details__quantity-number"
											type="number"
											value="3"
										/>
										<button className="shoppingcart__content__item__details__quantity-button">
											+
										</button>
									</div>
								</div>
								<div className="shoppingcart__content__item__buttons">
									<a
										className="shoppingcart__content__item__buttons-later shoppingcart__content__item__buttons__button"
										href="##"
									>
										<WatchLaterIcon className="shoppingcart__content__item__buttons__button-icon" />
										Guardar para depués
									</a>

									<a
										className="shoppingcart__content__item__buttons-delete shoppingcart__content__item__buttons__button"
										href="##"
									>
										<DeleteIcon className="shoppingcart__content__item__buttons__button-icon" />
										Eliminar
									</a>
								</div>
							</div>
							<div className="shoppingcart__content__item">
								<div className="shoppingcart__content__item__details">
									<img
										className="shoppingcart__content__item__details__image"
										src="https://via.placeholder.com/150"
										alt=""
									/>

									<div className="shoppingcart__content__item__details__text">
										<p className="shoppingcart__content__item__details__text-brand">
											Marca
										</p>
										<p className="shoppingcart__content__item__details__text-name">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
											error!
										</p>
										<p className="shoppingcart__content__item__details__text-model">
											Modelo: Modelo
										</p>
									</div>
									<div className="shoppingcart__content__item__details__sending">
										<p className="shoppingcart__content__item__details__sending-price">
											S/ 300
										</p>
										<p className="shoppingcart__content__item__details__sending-text">
											Envio a Domicilio
										</p>
										<p className="shoppingcart__content__item__details__sending-stock">
											3 Un. disponibles
										</p>
									</div>
									<div className="shoppingcart__content__item__details__quantity">
										<button className="shoppingcart__content__item__details__quantity-button">
											-
										</button>
										<input
											className="shoppingcart__content__item__details__quantity-number"
											type="number"
											value="3"
										/>
										<button className="shoppingcart__content__item__details__quantity-button">
											+
										</button>
									</div>
								</div>
								<div className="shoppingcart__content__item__buttons">
									<a
										className="shoppingcart__content__item__buttons-later shoppingcart__content__item__buttons__button"
										href="##"
									>
										<WatchLaterIcon className="shoppingcart__content__item__buttons__button-icon" />
										Guardar para depués
									</a>

									<a
										className="shoppingcart__content__item__buttons-delete shoppingcart__content__item__buttons__button"
										href="##"
									>
										<DeleteIcon className="shoppingcart__content__item__buttons__button-icon" />
										Eliminar
									</a>
								</div>
							</div>
							<div className="shoppingcart__content__item">
								<div className="shoppingcart__content__item__details">
									<img
										className="shoppingcart__content__item__details__image"
										src="https://via.placeholder.com/150"
										alt=""
									/>

									<div className="shoppingcart__content__item__details__text">
										<p className="shoppingcart__content__item__details__text-brand">
											Marca
										</p>
										<p className="shoppingcart__content__item__details__text-name">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
											error!
										</p>
										<p className="shoppingcart__content__item__details__text-model">
											Modelo: Modelo
										</p>
									</div>
									<div className="shoppingcart__content__item__details__sending">
										<p className="shoppingcart__content__item__details__sending-price">
											S/ 300
										</p>
										<p className="shoppingcart__content__item__details__sending-text">
											Envio a Domicilio
										</p>
										<p className="shoppingcart__content__item__details__sending-stock">
											3 Un. disponibles
										</p>
									</div>
									<div className="shoppingcart__content__item__details__quantity">
										<button className="shoppingcart__content__item__details__quantity-button">
											-
										</button>
										<input
											className="shoppingcart__content__item__details__quantity-number"
											type="number"
											value="3"
										/>
										<button className="shoppingcart__content__item__details__quantity-button">
											+
										</button>
									</div>
								</div>
								<div className="shoppingcart__content__item__buttons">
									<a
										className="shoppingcart__content__item__buttons-later shoppingcart__content__item__buttons__button"
										href="##"
									>
										<WatchLaterIcon className="shoppingcart__content__item__buttons__button-icon" />
										Guardar para depués
									</a>

									<a
										className="shoppingcart__content__item__buttons-delete shoppingcart__content__item__buttons__button"
										href="##"
									>
										<DeleteIcon className="shoppingcart__content__item__buttons__button-icon" />
										Eliminar
									</a>
								</div>
							</div>
							<div className="shoppingcart__content__item">
								<div className="shoppingcart__content__item__details">
									<img
										className="shoppingcart__content__item__details__image"
										src="https://via.placeholder.com/150"
										alt=""
									/>

									<div className="shoppingcart__content__item__details__text">
										<p className="shoppingcart__content__item__details__text-brand">
											Marca
										</p>
										<p className="shoppingcart__content__item__details__text-name">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
											error!
										</p>
										<p className="shoppingcart__content__item__details__text-model">
											Modelo: Modelo
										</p>
									</div>
									<div className="shoppingcart__content__item__details__sending">
										<p className="shoppingcart__content__item__details__sending-price">
											S/ 300
										</p>
										<p className="shoppingcart__content__item__details__sending-text">
											Envio a Domicilio
										</p>
										<p className="shoppingcart__content__item__details__sending-stock">
											3 Un. disponibles
										</p>
									</div>
									<div className="shoppingcart__content__item__details__quantity">
										<button className="shoppingcart__content__item__details__quantity-button">
											-
										</button>
										<input
											className="shoppingcart__content__item__details__quantity-number"
											type="number"
											value="3"
										/>
										<button className="shoppingcart__content__item__details__quantity-button">
											+
										</button>
									</div>
								</div>
								<div className="shoppingcart__content__item__buttons">
									<a
										className="shoppingcart__content__item__buttons-later shoppingcart__content__item__buttons__button"
										href="##"
									>
										<WatchLaterIcon className="shoppingcart__content__item__buttons__button-icon" />
										Guardar para depués
									</a>

									<a
										className="shoppingcart__content__item__buttons-delete shoppingcart__content__item__buttons__button"
										href="##"
									>
										<DeleteIcon className="shoppingcart__content__item__buttons__button-icon" />
										Eliminar
									</a>
								</div>
							</div>
							<div className="shoppingcart__content__item">
								<div className="shoppingcart__content__item__details">
									<img
										className="shoppingcart__content__item__details__image"
										src="https://via.placeholder.com/150"
										alt=""
									/>

									<div className="shoppingcart__content__item__details__text">
										<p className="shoppingcart__content__item__details__text-brand">
											Marca
										</p>
										<p className="shoppingcart__content__item__details__text-name">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
											error!
										</p>
										<p className="shoppingcart__content__item__details__text-model">
											Modelo: Modelo
										</p>
									</div>
									<div className="shoppingcart__content__item__details__sending">
										<p className="shoppingcart__content__item__details__sending-price">
											S/ 300
										</p>
										<p className="shoppingcart__content__item__details__sending-text">
											Envio a Domicilio
										</p>
										<p className="shoppingcart__content__item__details__sending-stock">
											3 Un. disponibles
										</p>
									</div>
									<div className="shoppingcart__content__item__details__quantity">
										<button className="shoppingcart__content__item__details__quantity-button">
											-
										</button>
										<input
											className="shoppingcart__content__item__details__quantity-number"
											type="number"
											value="3"
										/>
										<button className="shoppingcart__content__item__details__quantity-button">
											+
										</button>
									</div>
								</div>
								<div className="shoppingcart__content__item__buttons">
									<a
										className="shoppingcart__content__item__buttons-later shoppingcart__content__item__buttons__button"
										href="##"
									>
										<WatchLaterIcon className="shoppingcart__content__item__buttons__button-icon" />
										Guardar para depués
									</a>

									<a
										className="shoppingcart__content__item__buttons-delete shoppingcart__content__item__buttons__button"
										href="##"
									>
										<DeleteIcon className="shoppingcart__content__item__buttons__button-icon" />
										Eliminar
									</a>
								</div>
							</div>
							<div className="shoppingcart__content__item">
								<div className="shoppingcart__content__item__details">
									<img
										className="shoppingcart__content__item__details__image"
										src="https://via.placeholder.com/150"
										alt=""
									/>

									<div className="shoppingcart__content__item__details__text">
										<p className="shoppingcart__content__item__details__text-brand">
											Marca
										</p>
										<p className="shoppingcart__content__item__details__text-name">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
											error!
										</p>
										<p className="shoppingcart__content__item__details__text-model">
											Modelo: Modelo
										</p>
									</div>
									<div className="shoppingcart__content__item__details__sending">
										<p className="shoppingcart__content__item__details__sending-price">
											S/ 300
										</p>
										<p className="shoppingcart__content__item__details__sending-text">
											Envio a Domicilio
										</p>
										<p className="shoppingcart__content__item__details__sending-stock">
											3 Un. disponibles
										</p>
									</div>
									<div className="shoppingcart__content__item__details__quantity">
										<button className="shoppingcart__content__item__details__quantity-button">
											-
										</button>
										<input
											className="shoppingcart__content__item__details__quantity-number"
											type="number"
											value="3"
										/>
										<button className="shoppingcart__content__item__details__quantity-button">
											+
										</button>
									</div>
								</div>
								<div className="shoppingcart__content__item__buttons">
									<a
										className="shoppingcart__content__item__buttons-later shoppingcart__content__item__buttons__button"
										href="##"
									>
										<WatchLaterIcon className="shoppingcart__content__item__buttons__button-icon" />
										Guardar para depués
									</a>

									<a
										className="shoppingcart__content__item__buttons-delete shoppingcart__content__item__buttons__button"
										href="##"
									>
										<DeleteIcon className="shoppingcart__content__item__buttons__button-icon" />
										Eliminar
									</a>
								</div>
							</div>
							<div className="shoppingcart__content__item">
								<div className="shoppingcart__content__item__details">
									<img
										className="shoppingcart__content__item__details__image"
										src="https://via.placeholder.com/150"
										alt=""
									/>

									<div className="shoppingcart__content__item__details__text">
										<p className="shoppingcart__content__item__details__text-brand">
											Marca
										</p>
										<p className="shoppingcart__content__item__details__text-name">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
											error!
										</p>
										<p className="shoppingcart__content__item__details__text-model">
											Modelo: Modelo
										</p>
									</div>
									<div className="shoppingcart__content__item__details__sending">
										<p className="shoppingcart__content__item__details__sending-price">
											S/ 300
										</p>
										<p className="shoppingcart__content__item__details__sending-text">
											Envio a Domicilio
										</p>
										<p className="shoppingcart__content__item__details__sending-stock">
											3 Un. disponibles
										</p>
									</div>
									<div className="shoppingcart__content__item__details__quantity">
										<button className="shoppingcart__content__item__details__quantity-button">
											-
										</button>
										<input
											className="shoppingcart__content__item__details__quantity-number"
											type="number"
											value="3"
										/>
										<button className="shoppingcart__content__item__details__quantity-button">
											+
										</button>
									</div>
								</div>
								<div className="shoppingcart__content__item__buttons">
									<a
										className="shoppingcart__content__item__buttons-later shoppingcart__content__item__buttons__button"
										href="##"
									>
										<WatchLaterIcon className="shoppingcart__content__item__buttons__button-icon" />
										Guardar para depués
									</a>

									<a
										className="shoppingcart__content__item__buttons-delete shoppingcart__content__item__buttons__button"
										href="##"
									>
										<DeleteIcon className="shoppingcart__content__item__buttons__button-icon" />
										Eliminar
									</a>
								</div>
							</div>
							<div className="shoppingcart__content__item">
								<div className="shoppingcart__content__item__details">
									<img
										className="shoppingcart__content__item__details__image"
										src="https://via.placeholder.com/150"
										alt=""
									/>

									<div className="shoppingcart__content__item__details__text">
										<p className="shoppingcart__content__item__details__text-brand">
											Marca
										</p>
										<p className="shoppingcart__content__item__details__text-name">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
											error!
										</p>
										<p className="shoppingcart__content__item__details__text-model">
											Modelo: Modelo
										</p>
									</div>
									<div className="shoppingcart__content__item__details__sending">
										<p className="shoppingcart__content__item__details__sending-price">
											S/ 300
										</p>
										<p className="shoppingcart__content__item__details__sending-text">
											Envio a Domicilio
										</p>
										<p className="shoppingcart__content__item__details__sending-stock">
											3 Un. disponibles
										</p>
									</div>
									<div className="shoppingcart__content__item__details__quantity">
										<button className="shoppingcart__content__item__details__quantity-button">
											-
										</button>
										<input
											className="shoppingcart__content__item__details__quantity-number"
											type="number"
											value="3"
										/>
										<button className="shoppingcart__content__item__details__quantity-button">
											+
										</button>
									</div>
								</div>
								<div className="shoppingcart__content__item__buttons">
									<a
										className="shoppingcart__content__item__buttons-later shoppingcart__content__item__buttons__button"
										href="##"
									>
										<WatchLaterIcon className="shoppingcart__content__item__buttons__button-icon" />
										Guardar para depués
									</a>

									<a
										className="shoppingcart__content__item__buttons-delete shoppingcart__content__item__buttons__button"
										href="##"
									>
										<DeleteIcon className="shoppingcart__content__item__buttons__button-icon" />
										Eliminar
									</a>
								</div>
							</div>
							<div className="shoppingcart__content__item">
								<div className="shoppingcart__content__item__details">
									<img
										className="shoppingcart__content__item__details__image"
										src="https://via.placeholder.com/150"
										alt=""
									/>

									<div className="shoppingcart__content__item__details__text">
										<p className="shoppingcart__content__item__details__text-brand">
											Marca
										</p>
										<p className="shoppingcart__content__item__details__text-name">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
											error!
										</p>
										<p className="shoppingcart__content__item__details__text-model">
											Modelo: Modelo
										</p>
									</div>
									<div className="shoppingcart__content__item__details__sending">
										<p className="shoppingcart__content__item__details__sending-price">
											S/ 300
										</p>
										<p className="shoppingcart__content__item__details__sending-text">
											Envio a Domicilio
										</p>
										<p className="shoppingcart__content__item__details__sending-stock">
											3 Un. disponibles
										</p>
									</div>
									<div className="shoppingcart__content__item__details__quantity">
										<button className="shoppingcart__content__item__details__quantity-button">
											-
										</button>
										<input
											className="shoppingcart__content__item__details__quantity-number"
											type="number"
											value="3"
										/>
										<button className="shoppingcart__content__item__details__quantity-button">
											+
										</button>
									</div>
								</div>
								<div className="shoppingcart__content__item__buttons">
									<a
										className="shoppingcart__content__item__buttons-later shoppingcart__content__item__buttons__button"
										href="##"
									>
										<WatchLaterIcon className="shoppingcart__content__item__buttons__button-icon" />
										Guardar para depués
									</a>

									<a
										className="shoppingcart__content__item__buttons-delete shoppingcart__content__item__buttons__button"
										href="##"
									>
										<DeleteIcon className="shoppingcart__content__item__buttons__button-icon" />
										Eliminar
									</a>
								</div>
							</div>
							<div className="shoppingcart__content__item">
								<div className="shoppingcart__content__item__details">
									<img
										className="shoppingcart__content__item__details__image"
										src="https://via.placeholder.com/150"
										alt=""
									/>

									<div className="shoppingcart__content__item__details__text">
										<p className="shoppingcart__content__item__details__text-brand">
											Marca
										</p>
										<p className="shoppingcart__content__item__details__text-name">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
											error!
										</p>
										<p className="shoppingcart__content__item__details__text-model">
											Modelo: Modelo
										</p>
									</div>
									<div className="shoppingcart__content__item__details__sending">
										<p className="shoppingcart__content__item__details__sending-price">
											S/ 300
										</p>
										<p className="shoppingcart__content__item__details__sending-text">
											Envio a Domicilio
										</p>
										<p className="shoppingcart__content__item__details__sending-stock">
											3 Un. disponibles
										</p>
									</div>
									<div className="shoppingcart__content__item__details__quantity">
										<button className="shoppingcart__content__item__details__quantity-button">
											-
										</button>
										<input
											className="shoppingcart__content__item__details__quantity-number"
											type="number"
											value="3"
										/>
										<button className="shoppingcart__content__item__details__quantity-button">
											+
										</button>
									</div>
								</div>
								<div className="shoppingcart__content__item__buttons">
									<a
										className="shoppingcart__content__item__buttons-later shoppingcart__content__item__buttons__button"
										href="##"
									>
										<WatchLaterIcon className="shoppingcart__content__item__buttons__button-icon" />
										Guardar para depués
									</a>

									<a
										className="shoppingcart__content__item__buttons-delete shoppingcart__content__item__buttons__button"
										href="##"
									>
										<DeleteIcon className="shoppingcart__content__item__buttons__button-icon" />
										Eliminar
									</a>
								</div>
							</div>
						</div>

						<div className="shoppingcart__resume">
							<h3 className="shoppingcart__resume-title">RESUMEN DE TU ORDEN</h3>
							<p className="shoppingcart__resume-text">
								Sub-total productos<span></span>
							</p>
							<p className="shoppingcart__resume-text">
								Envío<span>S/ 0</span>
							</p>
							<p className="shoppingcart__resume-text">
								Total<span>S/ 0</span>
							</p>
							<a className="shoppingcart__resume-button" href="##">
								Procesar Compra
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
