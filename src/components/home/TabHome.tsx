import { Banner } from "./Banner";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Presentation } from "./Presentation";

export const TabHome = () => {
	return (
		<>
			<Header />
			<Banner />
			<Presentation />
			<Footer />
		</>
	);
};
