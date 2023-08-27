import {
	ContainerBannerStyled,
	ContainerSectionStyled,
} from "../global/styles/ContainerStyled";
import { Banner } from "./Banner";
import { Presentation } from "./Presentation";

export const TabHome = () => {
	return (
		<>
			<ContainerBannerStyled>
				<Banner />
			</ContainerBannerStyled>
			<ContainerSectionStyled>
				<Presentation />
			</ContainerSectionStyled>
		</>
	);
};
