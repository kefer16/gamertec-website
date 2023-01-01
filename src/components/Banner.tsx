import "../styles/Banner.scss";
import banneImg from "../images/banner.jpg";
export const Banner = () => {
	return (
		<>
			<div className="banner">
				<img src={banneImg} alt="banner" className="banner-img" />
				<div className="banner__text">
					<p className="banner__text__slogan">tus productos gamer a un clic</p>
					<button className="banner__text__button">Productos</button>
				</div>
			</div>
		</>
	);
};
