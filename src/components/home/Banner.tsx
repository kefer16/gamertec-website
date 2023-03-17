import "../../styles/Banner.scss";
import banneImg from "../../images/banner.jpg";
export const Banner = () => {
	return (
		<>
			<div className="banner">
				<img src={banneImg} alt="banner" className="banner-img" />
				<div className="banner__text">
					<p className="banner__text-slogan">Tus productos gamer a un clic</p>
					<a href="##" className="banner__text-button">
						Productos
					</a>
				</div>
			</div>
		</>
	);
};
