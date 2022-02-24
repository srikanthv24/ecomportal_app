/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Offcanvas, Spinner,Row } from "react-bootstrap";
import { AiOutlineSortAscending } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../hooks/useQuery";
import { getProductsAction } from "../../store/actions/products";
import ProductsList from "./products-list";

var phantom = {
	display: "block",
	padding: "20px",
	height: "70px",
	width: "100%",
};

const Products = () => {
	let query = useQuery();
	let catId = query.get("category");
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);

	const [Products, setProducts] = useState([]);
	useEffect(async () => {
		console.log("catId", catId);
		let filter = { category: { eq: catId } };
		dispatch(
			getProductsAction({
				category: catId,
				nextToken: "",
				limit: 10,
			})
		);
	}, [catId]);

	useEffect(() => {
		if (products.productList && products.productList.items) {
			setProducts(products.productList.items);
		}
	}, [products.productList]);

	// eslint-disable-next-line no-array-constructor
	let dummyList = new Array(10, {});

	// console.log("Producty", products.productList.items, Products);

	return (
		<>
			<Container fluid style={{background:"#F2CBBD", minHeight:"calc(100vh - 0px)"}}>
				<Row style={{ overflow: "auto" }}>
					<div style={{ ...phantom }} />
					<Card.Header className="products-header">
						<div className="d-flex justify-content-between align-items-center">
							<div>
								<p className="content-title"> Products</p>
								<small className="text-muted value-txt">
									{Products.length} products found
								</small>
							</div>
							<div>
								<Button variant="outline-light" active size="lg" style={{background:"#F2CBBD", borderColor:"#f0ead6 !important"}}>
									<AiOutlineSortAscending />
								</Button>
								<Button variant="outline-light" active size="lg" style={{background:"#F2CBBD", borderColor:"#f0ead6 !important"}}>
									<VscSettings />
								</Button>
							</div>
						</div>
					</Card.Header>
					<Col xs={12} lg={9} style={{ overflow: "auto" }}>
						<Row>
							{products.loading ? (
								// dummyList.map(() => {
								// 	return (
								// 		<Col lg={4} md={4} sm={6} xs={6} className="m-0 p-1">
								// 			<div className="card" aria-hidden="true">
								// 				<div
								// 					style={{
								// 						// backgroundImage: `url(${"https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"})`,
								// 						backgroundSize: "cover",
								// 						backgroundRepeat: "no-repeat",
								// 						backgroundPosition: "center",
								// 						height: "150px",
								// 						width: "100%",
								// 					}}
								// 				/>
								// 				<div className="card-body">
								// 					<h5 className="card-title placeholder-glow">
								// 						<span className="placeholder col-6"></span>
								// 					</h5>
								// 					<p className="card-text placeholder-glow">
								// 						<span className="placeholder col-7"></span>
								// 						<span className="placeholder col-4"></span>
								// 						<span className="placeholder col-4"></span>
								// 						<span className="placeholder col-6"></span>
								// 						<span className="placeholder col-8"></span>
								// 					</p>
								// 					<a
								// 						href="#"
								// 						tabIndex="-1"
								// 						className="btn btn-primary disabled placeholder col-6"
								// 					></a>
								// 				</div>
								// 			</div>
								// 		</Col>
								// 	);
								// })
								<Spinner  style={{ position : "absolute" ,top : "50%" , left : "50%" ,color :"#f05922 "}} animation="border" variant="primary" />
							) : (
								<ProductsList list={products.productList} items={Products} />
							)}
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Products;