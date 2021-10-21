import React, { useEffect, useState } from "react";
import { Button, Card, Col, Navbar, Row } from "react-bootstrap";
import { AiOutlineShoppingCart, AiOutlineSortAscending } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useHistory } from "react-router-dom";
import ProductCard from "./product-card";
import { useDispatch } from "react-redux";
import { getProductsAction } from "../../store/actions/products";

var phantom = {
	display: "block",
	padding: "20px",
	height: "70px",
	width: "100%",
};
const ProductsList = ({ list, items }) => {
	const dispatch = useDispatch();
	const [Loading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, [list]);

	function handleScroll() {
		if (
			window.innerHeight + document.documentElement.scrollTop !==
			document.documentElement.offsetHeight
		)
			return;
		console.log("Fetch more list items!", list);
		if (list.nextToken) {
			dispatch(
				getProductsAction({
					nextToken: list.nextToken,
					limit: 10,
					category: "",
				})
			);
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [list]);

	if (!list || !list.items || !list.items.length) {
		return <h3>No products found!!</h3>;
	}

	console.log("Producttyyyyyyyy", items);
	return (
		<>
			{items.length &&
				items.map((item) => {
					return item ? (
						<Col lg={4} md={4} sm={6} xs={6} key={item.id} className="m-0 p-1">
							<ProductCard product={item} />
						</Col>
					) : null;
				})}
		</>
	);
};

export default ProductsList;
