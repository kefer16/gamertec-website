import "./styles/Presentation.scss";
import img_amigo_jugando from "../../images/amigos_jugando.svg";
import img_realidad_virtual from "../../images/realidad-virtual.svg";
import img_video_juegos from "../../images/video_juegos.svg";

export const Presentation = () => {
	return (
		<>
			<div className="container">
				<div className="container-max">
					<section className="presentation">
						<div className="presentation__welcome">
							<h2 className="presentation__welcome-title">Bienvenido!</h2>
							<p className="presentation__welcome-text">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt animi
								delectus quidem rerum non ut adipisci beatae totam enim quas quibusdam
								fugit libero doloribus magnam dignissimos velit, molestiae fuga
								incidunt?
							</p>
						</div>
						<div className="presentation__servis">
							<div className="presentation__servis__content">
								<img
									className="presentation__servis__content-image"
									src={img_amigo_jugando}
									alt=""
								/>
								<div className="presentation__servis__content__text">
									<h2 className="presentation__servis__content__text-title">
										Realidad Virtual
									</h2>
									<p className="presentation__servis__content__text-description">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										Necessitatibus, eaque libero? Consectetur dignissimos expedita, modi
										accusamus et nostrum vero eaque consequatur accusantium sapiente?
										Dolore a error vitae explicabo hic laudantium! Illum ea consequuntur
										ad quae deserunt blanditiis at. Saepe eaque, laboriosam consequatur
										corrupti porro suscipit ipsam odit dignissimos maiores enim velit
										accusamus tempora voluptate, ut nobis asperiores provident ea
										voluptatibus. Itaque sunt saepe, facilis, exercitationem, debitis
										repellendus eligendi ipsam illo alias in distinctio ullam fugiat? Et
										necessitatibus amet quas illum, omnis aperiam debitis corporis
										laboriosam accusamus incidunt aspernatur optio eum. Quisquam at
										tempora aliquid magnam ipsam expedita, error quidem quis accusamus
										culpa corrupti reiciendis aliquam, illum, neque natus debitis? Minus
										laborum est obcaecati sit officiis voluptatibus ullam, quia odio
										praesentium.
									</p>
								</div>
							</div>
							<div className="presentation__servis__content">
								<div className="presentation__servis__content__text">
									<h2 className="presentation__servis__content__text-title">
										Video Juegos
									</h2>
									<p className="presentation__servis__content__text-description">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										Necessitatibus, eaque libero? Consectetur dignissimos expedita, modi
										accusamus et nostrum vero eaque consequatur accusantium sapiente?
										Dolore a error vitae explicabo hic laudantium! Illum ea consequuntur
										ad quae deserunt blanditiis at. Saepe eaque, laboriosam consequatur
										corrupti porro suscipit ipsam odit dignissimos maiores enim velit
										accusamus tempora voluptate, ut nobis asperiores provident ea
										voluptatibus. Itaque sunt saepe, facilis, exercitationem, debitis
										repellendus eligendi ipsam illo alias in distinctio ullam fugiat? Et
										necessitatibus amet quas illum, omnis aperiam debitis corporis
										laboriosam accusamus incidunt aspernatur optio eum. Quisquam at
										tempora aliquid magnam ipsam expedita, error quidem quis accusamus
										culpa corrupti reiciendis aliquam, illum, neque natus debitis? Minus
										laborum est obcaecati sit officiis voluptatibus ullam, quia odio
										praesentium.
									</p>
								</div>
								<img
									className="presentation__servis__content-image"
									src={img_realidad_virtual}
									alt=""
								/>
							</div>
							<div className="presentation__servis__content">
								<img
									className="presentation__servis__content-image"
									src={img_video_juegos}
									alt=""
								/>

								<div className="presentation__servis__content__text">
									<h2 className="presentation__servis__content__text-title">
										Comparte Experiencias
									</h2>
									<p className="presentation__servis__content__text-description">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										Necessitatibus, eaque libero? Consectetur dignissimos expedita, modi
										accusamus et nostrum vero eaque consequatur accusantium sapiente?
										Dolore a error vitae explicabo hic laudantium! Illum ea consequuntur
										ad quae deserunt blanditiis at. Saepe eaque, laboriosam consequatur
										corrupti porro suscipit ipsam odit dignissimos maiores enim velit
										accusamus tempora voluptate, ut nobis asperiores provident ea
										voluptatibus. Itaque sunt saepe, facilis, exercitationem, debitis
										repellendus eligendi ipsam illo alias in distinctio ullam fugiat? Et
										necessitatibus amet quas illum, omnis aperiam debitis corporis
										laboriosam accusamus incidunt aspernatur optio eum. Quisquam at
										tempora aliquid magnam ipsam expedita, error quidem quis accusamus
										culpa corrupti reiciendis aliquam, illum, neque natus debitis? Minus
										laborum est obcaecati sit officiis voluptatibus ullam, quia odio
										praesentium.
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};
