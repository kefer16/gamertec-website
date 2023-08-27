import "./styles/Banner.scss";
import banneImg from "../../images/banner.jpg";
import { Link } from "react-router-dom";
export const Banner = () => {
	return (
		<div className="banner">
			<img src={banneImg} alt="banner" className="banner-img" />
			<div className="banner__text">
				<p className="banner__text-slogan">Tus productos gamer a un clic</p>
				<Link to="/products/" className="banner__text-button">
					Productos
				</Link>
			</div>
		</div>
	);
};
