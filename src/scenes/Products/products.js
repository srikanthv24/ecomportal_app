/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Offcanvas, Row } from "react-bootstrap";
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
			<Container fluid>
				<Row style={{ overflow: "auto" }}>
					<div style={{ ...phantom }} />
					<Card.Header
						style={{
							position: "fixed",
							top: 118,
							zIndex: 999,
							background: "#f5f5f5",
						}}
					>
						<div className="d-flex justify-content-between align-items-center">
							<div>
								<p className="h5 m-0 p-0"> Products</p>
								<small className="text-muted">
									{Products.length} products found
								</small>
							</div>
							<div>
								<Button variant="outline-light" active size="lg">
									<AiOutlineSortAscending />
								</Button>
								<Button variant="outline-light" active size="lg">
									<VscSettings />
								</Button>
							</div>
						</div>
					</Card.Header>
					<Col xs={12} lg={9} style={{ overflow: "auto" }}>
						<Row>
							{products.loading ? (
								dummyList.map(() => {
									return (
										<Col lg={4} md={4} sm={6} xs={6} className="m-0 p-1">
											<div className="card" aria-hidden="true">
												<div
													style={{
														// backgroundImage: `url(${"https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"})`,
														backgroundSize: "cover",
														backgroundRepeat: "no-repeat",
														backgroundPosition: "center",
														height: "120px",
														width: "100%",
													}}
												/>
												<div className="card-body">
													<h5 className="card-title placeholder-glow">
														<span className="placeholder col-6"></span>
													</h5>
													<p className="card-text placeholder-glow">
														<span className="placeholder col-7"></span>
														<span className="placeholder col-4"></span>
														<span className="placeholder col-4"></span>
														<span className="placeholder col-6"></span>
														<span className="placeholder col-8"></span>
													</p>
													<a
														href="#"
														tabindex="-1"
														className="btn btn-primary disabled placeholder col-6"
													></a>
												</div>
											</div>
										</Col>
									);
								})
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