import styled from "styled-components";

export const PreCompraStyled = styled.div`
	.titulo,
	.orden-despacho {
		display: flex;
		margin: auto;
		max-width: 1260px;
		width: 100%;
		background-color: white;
	}
	.titulo {
		flex-direction: column;
		padding: 0 30px;
	}
	.titulo h2 {
		line-height: 1.7;
		color: gray;
	}
	.titulo hr {
		background-color: gray;
	}
	.despacho,
	.despacho-select,
	.despacho-titulo,
	.orden-productos {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.despacho-select {
		margin-top: 10px;
	}
	.despacho-select select,
	.despacho input {
		padding: 10px;
	}
	.despacho-select select,
	.despacho-select input {
		margin-bottom: 10px;
	}
	.despacho-select label {
		line-height: 1.7;
	}
	.despacho,
	.orden {
		width: 50%;
		padding: 30px;
	}

	.orden-titulo h3 {
		color: $colorApp;
	}
	.orden-cantidad {
		margin-top: 20px;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.content-producto,
	.monto {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}
	.producto-foto {
		width: 30%;
	}
	.producto-detalles {
		width: 50%;
	}
	.producto-cantidad {
		width: 20%;
		text-align: right;
	}
	.producto-foto img {
		width: 100px;
	}

	.volver {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 20px 0;
	}
`;
