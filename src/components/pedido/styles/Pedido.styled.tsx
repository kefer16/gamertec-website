import styled from "styled-components";

export const PedidoStyled = styled.div`
	max-width: 1260px;

	flex-direction: column;
	min-height: calc(100vh - 60px);
	margin: 0 auto;
	display: flex;
	justify-content: center;
	background-color: #fff;
	.check,
	.mensaje,
	.link {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: 400px;
			animation: normal;
		}
		h2 {
			margin: 10px 0;
			color: $activo;
			animation: demorar 2s ease-in;
		}
		.links {
			text-decoration: none;
			&.est1 {
				color: #555;
				transition: 0.3s all;
				&:hover {
					text-decoration: underline;
				}
			}
			&.est2 {
				margin-left: 20px;
				@include botonEnviar;
			}
		}
	}
	.link {
		margin-top: 20px;
		animation: demorar 2s ease-in;
	}

	@keyframes demorar {
		from {
			opacity: 0;
			// transform: translateY(100px);
		}
		to {
			opacity: 1;
			// transform: translateY(0);
		}
	}

	@keyframes detener {
		from {
			animation: true;
		}
		to {
			animation: false;
		}
	}

	.success-checkmark {
		width: 80px;
		height: 115px;
		margin: 0 auto;

		.check-icon {
			width: 80px;
			height: 80px;
			position: relative;
			border-radius: 50%;
			box-sizing: content-box;
			border: 4px solid #4caf50;

			&::before {
				top: 3px;
				left: -2px;
				width: 30px;
				transform-origin: 100% 50%;
				border-radius: 100px 0 0 100px;
			}

			&::after {
				top: 0;
				left: 30px;
				width: 60px;
				transform-origin: 0 50%;
				border-radius: 0 100px 100px 0;
				animation: rotate-circle 4.25s ease-in;
			}

			&::before,
			&::after {
				content: "";
				height: 100px;
				position: absolute;
				background: #ffffff;
				transform: rotate(-45deg);
			}

			.icon-line {
				height: 5px;
				background-color: #4caf50;
				display: block;
				border-radius: 2px;
				position: absolute;
				z-index: 10;

				&.line-tip {
					top: 46px;
					left: 14px;
					width: 25px;
					transform: rotate(45deg);
					animation: icon-line-tip 1s;
				}

				&.line-long {
					top: 38px;
					right: 8px;
					width: 47px;
					transform: rotate(-45deg);
					animation: icon-line-long 1s;
				}
			}

			.icon-circle {
				top: -4px;
				left: -4px;
				z-index: 10;
				width: 80px;
				height: 80px;
				border-radius: 50%;
				position: absolute;
				box-sizing: content-box;
				border: 4px solid rgba(76, 175, 80, 0.5);
			}

			.icon-fix {
				top: 8px;
				width: 5px;
				left: 26px;
				z-index: 1;
				height: 85px;
				position: absolute;
				transform: rotate(-45deg);
				background-color: #ffffff;
			}
		}
	}
	@keyframes rotate-circle {
		0% {
			transform: rotate(-45deg);
		}
		5% {
			transform: rotate(-45deg);
		}
		12% {
			transform: rotate(-405deg);
		}
		100% {
			transform: rotate(-405deg);
		}
	}

	@keyframes icon-line-tip {
		0% {
			width: 0;
			left: 1px;
			top: 19px;
		}
		54% {
			width: 0;
			left: 1px;
			top: 19px;
		}
		70% {
			width: 50px;
			left: -8px;
			top: 37px;
		}
		84% {
			width: 17px;
			left: 21px;
			top: 48px;
		}
		100% {
			width: 25px;
			left: 14px;
			top: 45px;
		}
	}

	@keyframes icon-line-long {
		0% {
			width: 0;
			right: 46px;
			top: 54px;
		}
		65% {
			width: 0;
			right: 46px;
			top: 54px;
		}
		84% {
			width: 55px;
			right: 0px;
			top: 35px;
		}
		100% {
			width: 47px;
			right: 8px;
			top: 38px;
		}
	}
`;
