import "./styles/Footer.scss";

export const Footer = () => {
	return (
		<>
			<div className="container-footer">
				<div className="container-max">
					<div className="footer">
						<div className="footer__info">
							<div className="footer__info__section">
								<h4 className="footer__info__section-title">Comunicate con nosotros</h4>
								<p className="footer__info__section-text">
									Central Telefónico: 874 788 784
								</p>
								<p className="footer__info__section-text">
									Correo electrónico: atencionalcliente@gamertec.com
								</p>
								<p className="footer__info__section-text">
									Horario de atención: De lunes a viernes de 10:00am a 7:00pm
								</p>
							</div>
							<div className="footer__info__section">
								<h4 className="footer__info__section-title">Nosotros</h4>

								<a className="footer__info__section-link" href="##">
									Nuestras Tiendas
								</a>
								<a className="footer__info__section-link" href="##">
									Sobre Nosotros
								</a>
							</div>
							<div className="footer__info__section">
								<h4 className="footer__info__section-title">Servicio al Cliente</h4>
								<a className="footer__info__section-link" href="##">
									FAQ
								</a>
								<a className="footer__info__section-link" href="##">
									Garantía
								</a>
								<a className="footer__info__section-link" href="##">
									Términos y condiciones
								</a>
								<a className="footer__info__section-link" href="##">
									Privacidad
								</a>
								<a className="footer__info__section-link" href="##">
									{" "}
									Política de cambio y devolución
								</a>
								<a className="footer__info__section-link" href="##">
									Libro de reclamaciones
								</a>
							</div>
							<div className="footer__info__section">
								<h4 className="footer__info__section-title">Categorias</h4>

								<a className="footer__info__section-link" href="##">
									Hola
								</a>
							</div>
						</div>
						<p className="footer__creator">
							Copyright © 2020 Kefer | Todos los derechos reservados
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
