import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TabContact } from "./components/contact/TabContact";
import { TabHome } from "./components/home/TabHome";
import { TabLogin } from "./components/login/TabLogin";
import { TabProducts } from "./components/products/TabProducs";
import { TabShoppingCart } from "./components/user/shopping_cart/TabShoppingCart";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<TabHome />} />
				<Route path="/products/" element={<TabProducts />} />
				<Route path="/contact/" element={<TabContact />} />
				<Route path="/shopping/" element={<TabShoppingCart />} />
				<Route path="/login/" element={<TabLogin />} />
			</Routes>
		</Router>
	);
}

export default App;
