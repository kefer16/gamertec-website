import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TabContact } from "./components/contact/TabContact";
import { TabHome } from "./components/home/TabHome";
import { TabLogin } from "./components/login/TabLogin";
import { TabProducts } from "./components/products/TabProducs";
import { TabRegister } from "./components/register/TabRegister";
import { TabShoppingCart } from "./components/shopping_cart/TabShoppingCart";
import { TabAdmin } from "./components/admin/TabAdmin";
import { TabCategory } from "./components/admin/categoria/TabCategoria";
import { TabPrivilege } from "./components/admin/privilegio/TabPrivilegio";
import { TabUsuario } from "./components/admin/usuario/TabUsuario";
import { TabMarca } from "./components/admin/marca/TabMarca";
import { TabModelo } from "./components/admin/modelo/TabModelo";
import { TabProducto } from "./components/admin/producto/TabProducto";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<TabHome />} />
				<Route path="/products/" element={<TabProducts />} />
				<Route path="/contact/" element={<TabContact />} />
				<Route path="/shopping/" element={<TabShoppingCart />} />
				<Route path="/login/" element={<TabLogin />} />
				<Route path="/register/" element={<TabRegister />} />
				<Route path="/admin/" element={<TabAdmin />} />
				<Route path="/admin/category/" element={<TabCategory />} />
				<Route path="/admin/privilege/" element={<TabPrivilege />} />
				<Route path="/admin/user/" element={<TabUsuario />} />
				<Route path="/admin/brand/" element={<TabMarca />} />
				<Route path="/admin/model/" element={<TabModelo />} />
				<Route path="/admin/product/" element={<TabProducto />} />
			</Routes>
		</Router>
	);
}

export default App;
