import { Rating, RatingChangeEvent } from "primereact/rating";

import { IconStarFilled, IconStar } from "@tabler/icons-react";
import { Nullable } from "primereact/ts-helpers";
import { CSSProperties } from "styled-components";

interface RatingProps {
	style?: CSSProperties;
	valoracion: Nullable<number>;
	funcionValoracion?: (param: Nullable<number>) => void;
	readonly: boolean;
}

export const RatingPrimeUI = ({
	valoracion,
	funcionValoracion,
	readonly,
	style
}: RatingProps) => {
	return (
		<Rating
			style={style ? style : {}}
			onIcon={
				<IconStarFilled
					strokeWidth={1}
					size={20}
					style={{ color: "#faaf00", outline: "none" }}
				/>
			}
			offIcon={<IconStar size={20} strokeWidth={1} style={{ outline: "none" }} />}
			stars={5}
			onChange={(e: RatingChangeEvent) =>
				funcionValoracion ? funcionValoracion(e.value) : <></>
			}
			value={valoracion ?? 0}
			cancel={false}
			readOnly={readonly}
		/>
	);
};
