import "./styles/contact.scss";

export const Contact = () => {
	return (
		<>
			<div className="container">
				<div className="container-max">
					<div className="contact">
						<div className="contact__message">
							<h2 className="contact__message-title">Contacto</h2>
							<p className="contact__message-description">
								Hablemos 👋 No dudes en ponerte en contacto con nosotros mediante la
								información de contacto a continuación, o envíanos un mensaje mediante
								el formulario.
							</p>
						</div>
						<div className="contact__group">
							<div className="contact__group__info">
								<h3 className="contact__group__info-title">Ponte en contacto</h3>
								<p className="contact__group__info-parraf">
									Nueva Florencia Sector III Lote 15
								</p>
								<p className="contact__group__info-parraf">Trujillo, La Libertad</p>
								<p className="contact__group__info-parraf">Perú</p>
								<p className="contact__group__info-parraf">morafi.1999.19@gmail.com</p>
								<p className="contact__group__info-parraf">
									Teléfono (+51) 910 372 728
								</p>
							</div>
							<div className="contact__group__form">
								<h3 className="contact__group__form-title">Envíanos un mensaje</h3>
								<p className="contact__group__form-parraf">Nombre (obligatorio)</p>
								<input
									className="contact__group__form-input"
									type="text"
									placeholder="Nombre"
								/>
								<p className="contact__group__form-parraf">Email (obligatorio)</p>
								<input
									className="contact__group__form-input"
									type="text"
									placeholder="Correo"
								/>
								<p className="contact__group__form-parraf">Mensaje (obligatorio)</p>
								<input
									className="contact__group__form-input"
									type="area"
									placeholder="Mensaje"
								/>
								<input
									className="contact__group__form-input-send"
									type="submit"
									value="enviar"
								/>
							</div>
						</div>
						<div className="contact__maps">
							<h3 className="contact__maps-title">Ubicación</h3>
							<iframe
								title="mapa"
								className="contact__maps-map"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63197.59930288774!2d-79.02007239999999!3d-8.116755649999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d7fe3fae92d%3A0xd3bc7d125d4e8508!2sTrujillo!5e0!3m2!1ses-419!2spe!4v1675395176450!5m2!1ses-419!2spe"
								width="600"
								height="450"
								// style="border:0;"
								// allowfullscreen=""
								loading="lazy"
								// referrerpolicy="no-referrer-when-downgrade"
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
