import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TabContact } from "./components/contact/TabContact";
import { TabHome } from "./components/home/TabHome";
import { TabLogin } from "./components/login/TabLogin";
import { TabProducts } from "./components/products/TabProducs";
import { TabRegister } from "./components/register/TabRegister";
import { TabShoppingCart } from "./components/shopping_cart/TabShoppingCart";
import { TabAdmin } from "./components/admin/TabAdmin";
import { TabCategory } from "./components/admin/category/TabCategory";

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
				<Route path="/category/" element={<TabCategory />} />
			</Routes>
		</Router>
	);
}

export default App;
