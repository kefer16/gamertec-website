import "../../styles/products/products.scss";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import img_card from "../../images/galaxy_a22.jpg";

export const Products = () => {
	const [filter, setFilter] = useState(false);

	function openFilter() {
		const open = !filter;
		console.log(open);

		setFilter(open);
	}

	return (
		<>
			<div className="container">
				<div className="container-max">
					<div className="products">
						<form action="" className="products__form">
							<nav className="products__form__filter">
								<p onClick={openFilter} className="products__form__filter-title">
									Categorias
									<ArrowDropDownIcon
										className={`products__form__filter__icon ${
											filter ? "products__form__filter__icon-rotate" : ""
										}`.trim()}
									/>
								</p>
								<ul
									className={`products__form__filter__list ${
										filter ? "products__form__filter__list-open" : ""
									}`.trim()}
								>
									<a href="##" className="products__form__filter__list__item">
										TODO
									</a>
									<a href="##" className="products__form__filter__list__item">
										Lorem, ipsum.
									</a>
									<a href="##" className="products__form__filter__list__item">
										Lorem, ipsum.
									</a>
									<a href="##" className="products__form__filter__list__item">
										Lorem, ipsum.
									</a>
									<a href="##" className="products__form__filter__list__item">
										Lorem, ipsum.
									</a>
								</ul>
							</nav>

							<div className="products__form__search">
								<input
									className="products__form__search-input"
									type="search"
									placeholder="Busca Productos"
								/>
								<button className="products__form__search-button" type="submit">
									<SearchIcon />
								</button>
							</div>
						</form>

						<div className="products__list">
							<p className="products__list__notfound">
								Tu búsqueda no coincide con ningun resultado, ingrese otro producto
							</p>

							<div className="products__list__content">
								<a href="##" className="products__list__content__card">
									<img
										className="products__list__content__card-image"
										src={img_card}
										alt="img_card"
									/>

									<div className="products__list__content__card__text">
										<p className="products__list__content__card__text-brand"> SAMSUNG</p>
										<p className="products__list__content__card__text-title">
											Galaxy A22 128GB Negro
										</p>
										<span className="products__list__content__card__text-price">
											S/. 699
										</span>
									</div>
								</a>
								<a href="##" className="products__list__content__card">
									<img
										className="products__list__content__card-image"
										src={img_card}
										alt="img_card"
									/>

									<div className="products__list__content__card__text">
										<p className="products__list__content__card__text-brand"> SAMSUNG</p>
										<p className="products__list__content__card__text-title">
											Galaxy A22 128GB Negro
										</p>
										<span className="products__list__content__card__text-price">
											S/. 699
										</span>
									</div>
								</a>
								<a href="##" className="products__list__content__card">
									<img
										className="products__list__content__card-image"
										src={img_card}
										alt="img_card"
									/>

									<div className="products__list__content__card__text">
										<p className="products__list__content__card__text-brand"> SAMSUNG</p>
										<p className="products__list__content__card__text-title">
											Galaxy A22 128GB Negro
										</p>
										<span className="products__list__content__card__text-price">
											S/. 699
										</span>
									</div>
								</a>
								<a href="##" className="products__list__content__card">
									<img
										className="products__list__content__card-image"
										src={img_card}
										alt="img_card"
									/>

									<div className="products__list__content__card__text">
										<p className="products__list__content__card__text-brand"> SAMSUNG</p>
										<p className="products__list__content__card__text-title">
											Galaxy A22 128GB Negro
										</p>
										<span className="products__list__content__card__text-price">
											S/. 699
										</span>
									</div>
								</a>
								<a href="##" className="products__list__content__card">
									<img
										className="products__list__content__card-image"
										src={img_card}
										alt="img_card"
									/>

									<div className="products__list__content__card__text">
										<p className="products__list__content__card__text-brand"> SAMSUNG</p>
										<p className="products__list__content__card__text-title">
											Galaxy A22 128GB Negro
										</p>
										<span className="products__list__content__card__text-price">
											S/. 699
										</span>
									</div>
								</a>
								<a href="##" className="products__list__content__card">
									<img
										className="products__list__content__card-image"
										src={img_card}
										alt="img_card"
									/>

									<div className="products__list__content__card__text">
										<p className="products__list__content__card__text-brand"> SAMSUNG</p>
										<p className="products__list__content__card__text-title">
											Galaxy A22 128GB Negro
										</p>
										<span className="products__list__content__card__text-price">
											S/. 699
										</span>
									</div>
								</a>
								<a href="##" className="products__list__content__card">
									<img
										className="products__list__content__card-image"
										src={img_card}
										alt="img_card"
									/>

									<div className="products__list__content__card__text">
										<p className="products__list__content__card__text-brand"> SAMSUNG</p>
										<p className="products__list__content__card__text-title">
											Galaxy A22 128GB Negro
										</p>
										<span className="products__list__content__card__text-price">
											S/. 699
										</span>
									</div>
								</a>
								<a href="##" className="products__list__content__card">
									<img
										className="products__list__content__card-image"
										src={img_card}
										alt="img_card"
									/>

									<div className="products__list__content__card__text">
										<p className="products__list__content__card__text-brand"> SAMSUNG</p>
										<p className="products__list__content__card__text-title">
											Galaxy A22 128GB Negro
										</p>
										<span className="products__list__content__card__text-price">
											S/. 699
										</span>
									</div>
								</a>
								<a href="##" className="products__list__content__card">
									<img
										className="products__list__content__card-image"
										src={img_card}
										alt="img_card"
									/>

									<div className="products__list__content__card__text">
										<p className="products__list__content__card__text-brand"> SAMSUNG</p>
										<p className="products__list__content__card__text-title">
											Galaxy A22 128GB Negro
										</p>
										<span className="products__list__content__card__text-price">
											S/. 699
										</span>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
