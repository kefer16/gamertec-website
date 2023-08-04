import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TabContact } from "./components/contact/TabContact";
import { TabHome } from "./components/home/TabHome";
import { TabLogin } from "./components/login/TabLogin";
import { TabProducts } from "./components/products/TabProducs";
import { TabRegister } from "./components/register/TabRegister";
import { TabAdmin } from "./components/admin/TabAdmin";
import { TabCategory } from "./components/admin/categoria/TabCategoria";
import { TabPrivilege } from "./components/admin/privilegio/TabPrivilegio";
import { TabUsuario } from "./components/admin/usuario/TabUsuario";
import { TabMarca } from "./components/admin/marca/TabMarca";
import { TabModelo } from "./components/admin/modelo/TabModelo";
import { TabProducto } from "./components/admin/producto/TabProducto";
import { TabDescripcion } from "./components/descripcion/TabDescripcion";
import { TabCarrito } from "./components/carrito/TabCarrito";
import { Header } from "./components/global/Header";
import { Footer } from "./components/global/Footer";
import { TabPreCompra } from "./components/pre_compra/TabPreCompra";
import { TabCompra } from "./components/compra/TabCompra";
import { IndexComprobante } from "./components/comprobante/IndexComprobante.component";
import { SesionProvider } from "./components/sesion/Sesion.component";
import { IndexPedidoExitoso } from "./components/pedido_exitoso/IndexPedidoExitoso.component";
import { IndexPedido } from "./components/admin/pedido/IndexPedido.component";
import { IndexPedidoDetalle } from "./components/admin/pedido/IndexPedidoDetalle.component";

function App() {
	return (
		<Router>
			<SesionProvider>
				<Header />
				<Routes>
					<Route path="/" element={<TabHome />} />
					<Route path="/products/" element={<TabProducts />} />
					<Route path="/contact/" element={<TabContact />} />

					<Route path="/login/" element={<TabLogin />} />
					<Route path="/register/" element={<TabRegister />} />
					<Route path="/admin/" element={<TabAdmin />} />
					<Route path="/admin/category/" element={<TabCategory />} />
					<Route path="/admin/privilege/" element={<TabPrivilege />} />
					<Route path="/admin/user/" element={<TabUsuario />} />
					<Route path="/admin/brand/" element={<TabMarca />} />
					<Route path="/admin/model/" element={<TabModelo />} />
					<Route path="/admin/product/" element={<TabProducto />} />
					<Route path="/admin/order/" element={<IndexPedido />} />
					<Route
						path="/admin/order/detail/:pedido_id"
						element={<IndexPedidoDetalle />}
					/>
					<Route
						path="/product/description/:modelo_id"
						element={<TabDescripcion />}
					/>
					<Route path="/shoping_cart/" element={<TabCarrito />} />
					<Route path="/before_purchase/" element={<TabPreCompra />} />
					<Route path="/voucher/" element={<IndexComprobante />} />
					<Route path="/order_successful/" element={<IndexPedidoExitoso />} />

					<Route path="/buy/" element={<TabCompra />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</SesionProvider>
		</Router>
	);
}

const NotFound = () => {
	return <>Ha llegado a una página que no existe</>;
};

export default App;
