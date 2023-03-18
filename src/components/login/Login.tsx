import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";
import img_realidad_virtual from "../../images/chico_realidad_virtual.svg";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import "./styles/Login.scss";
import { InputControl } from "../controls/InputControl";
import { ButtonControl } from "../controls/ButtonControl";
import { useState } from "react";

export const Login = () => {
	const [credencial, setCredencial] = useState({ user: "", password: "" });
	const { user, password } = credencial;
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

							<InputControl
								icon={<AccountCircleRoundedIcon />}
								name="usuario"
								placeholder="Usuario"
								type="text"
								value={user}
								onChange={(e) => {}}
							/>

							<InputControl
								icon={<LockRoundedIcon />}
								placeholder="Contraseña"
								type="password"
								name="constrasenia"
								value={password}
								onChange={(e) => {}}
							/>

							<ButtonControl
								icon={<LoginRoundedIcon />}
								type="submit"
								text="Ingresar"
							/>

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
