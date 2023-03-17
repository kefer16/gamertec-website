import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";
import img_realidad_virtual from "../../images/chico_realidad_virtual.svg";
import "../../styles/login/Login.scss";
import InputControl from "../controls/InputControl";

export const Login = () => {
	return (
		<>
			<div className="constainer">
				<div className="container-max">
					<div className="login">
						<img className="login__img" src={img_realidad_virtual} alt="" />

						<div className="login__form">
							<div className="login__form__titles">
								<h2 className="login__form__titles-welcome">Hola Bienvenido!</h2>
								<p className="login__form__titles-subtitle">Ingresa tus datos</p>
							</div>
							<div className="login__form__message"></div>

							<div className="login__form__inputs">
								<InputControl
									icon={<AccountCircleRoundedIcon />}
									placeholder="Usuario"
									type="text"
								/>
							</div>
							<div className="login__form-inputs">
								<LockRoundedIcon />

								<input
									className="login__form__inputs-input"
									type="password"
									name="contrasenia"
									placeholder="Contraseña"
								/>
							</div>
							<input type="submit" value="Ingresar" />

							<div className="login__register">
								<span className="login__register-question">¿No tienes cuenta?</span>
								<Link className="login__register-link" to={`/register`}>
									Registrate
								</Link>
							</div>
							<div className="login__social">
								<p className="login__social-title">Contacte al administrador:</p>
								<FacebookRoundedIcon className="login__social-facebook" />
								<InstagramIcon className="login__social-instragram" />
								<YouTubeIcon className="login__social-youtube" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
