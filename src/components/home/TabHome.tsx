import { Banner } from "./Banner";
import { Footer } from "../global/Footer";
import { Header } from "../global/Header";
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
