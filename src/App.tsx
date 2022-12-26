import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Theme } from "./components/Theme";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Theme />} />
			</Routes>
		</Router>
	);
}

export default App;
