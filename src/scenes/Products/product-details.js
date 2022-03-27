import React, { useEffect, useState } from "react";
import { Col, Row ,Spinner} from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearProducts } from "../../store/actions/products";
import { useParams } from "react-router-dom";
import ProductPlanner from "./product-planner";
import { FormProvider, useFormContext } from "react-hook-form";

const ProductDetails = ({
	control,
	productId,
	isOnboarding = false,
	myRef = null,
	variantsSelected,
	updateAddresses
}) => {
	let productID = "";
	const { id } = useParams();
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const userDetails = useSelector((state) => state.auth.userDetails);

	const [ProductDetails, setProductDetails] = useState({});
	const [isLoading, setLoading] = useState(true);

	const methods = useFormContext();
	const { setValue } = methods;

	const [FormData, setFormData] = useState({
		cart_id: "",
		item_id: "",
		qty: 0,
		subscription_data: {
			customer_id: userDetails.sub,
			customer_name: "",
			is_mealplan: false,
			item_id: "",
			item_name: "",
			mealplan: [
				{
					address: {},
					isDelivery: false,
					meal_type: "B",
					notes: "",
					order_dates: [],
					price: 0,
					variants: {
						name: "",
						sale_val: 0,
						items: [],
					},
					addon_items: []
				},
				{
					address: {},
					isDelivery: false,
					meal_type: "L",
					notes: "",
					order_dates: [],
					price: 0,
					variants: {
						name: "",
						sale_val: 0,
						items: [],
					},
					addon_items: []
				},
				{
					address: {},
					isDelivery: false,
					meal_type: "D",
					notes: "",
					order_dates: [],
					price: 0,
					variants: {
						name: "",
						sale_val: 0,
						items: [],
					},
					addon_items: []
				},
			],
			qty: 0,
			sale_val: 0,
		},
	});

	useEffect(() => {
		return () => {
			dispatch(clearProducts())
		}
	}, [])

	useEffect(() => {
		if (id) {
			productID = id;
		} else {
			productID = productId;
		}
		setValue("item_id", productID);
		setValue("qty", 1);

		dispatch(getProductDetails(productID));
	}, [id, productId]);

	useEffect(() => {
		setProductDetails(products.productDetails);
		if (Object.keys(products.productDetails).length) {
			setLoading(false);
		}
	}, [products.productDetails]);

	const handleChange = (key, value) => {
		console.log("key, value", key, value);
		if (key == "variants") {
			setFormData({ ...FormData, variant: { ...FormData.variant, ...value } });
		} else {
			setFormData({ ...FormData, [key]: value });
		}
	};

	console.log("rrrr", products.loading);

	return (
		<FormProvider {...methods}>{isLoading && <div className="fullscreen-loader"> <Spinner animation="grow" /></div>}
				<div className="bg-1">
					{!(products.productDetails?.is_mealplan)  ? 
					<>
				{    
					products.loading ? 
					(<Spinner animation="border" variant="primary" />)
					:
				<Row>
					<Col sm={12} lg={6}>
						<p className="h4 mt-3 ff-2">{ProductDetails?.display_name}</p>
						<p className=" h6 text-muted ff-3">{ProductDetails?.category}</p>

						<div
							style={{
								backgroundImage: `url(${ProductDetails?.defaultimg_url ||
									"https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
									})`,
								backgroundSize: "cover",
								backgroundRepeat: "no-repeat",
								backgroundPosition: "center",
								width: "100%",
								height: "250px",
								borderRadius:"10px"
							}}
						/>
					</Col>
					<Col sm={12} lg={6}>
						<p className="mt-3 ff-4">{ProductDetails?.description}</p>
						<h1>
						<small className="text-muted col-12 h6">
						Including{" "}
						{String(ProductDetails.tax_methods)
							.replace("Output", "")
							.replace("-", "")}
						</small>
						<br />
						<BiRupee /> {ProductDetails.sale_val} / {ProductDetails.uom_name}
					</h1>
					</Col>
				</Row>
                    }
					</>
					:
					<>
						<Row>
							<Col sm={12} lg={6}>
								<p className="h4 mt-3 ff-2">{ProductDetails?.display_name}</p>
								<p className=" h6 text-muted ff-3">{ProductDetails?.category}</p>

								<div
									style={{
										backgroundImage: `url(${ProductDetails?.defaultimg_url ||
											"https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
											})`,
										backgroundSize: "cover",
										backgroundRepeat: "no-repeat",
										backgroundPosition: "center",
										width: "100%",
										height: "250px",
										borderRadius:"10px"
									}}
								/>
							</Col>
							<Col sm={12} lg={6}>
								{/* <h1>
						<small className="text-muted col-12 h6">
						Including{" "}
						{String(ProductDetails.tax_methods)
							.replace("Output", "")
							.replace("-", "")}
						</small>
						<br />
						<BiRupee /> {ProductDetails.sale_val} / {ProductDetails.uom_name}
					</h1> */}
							</Col>
						</Row>
						<Row>
							<Col>
								{products.productDetails?.is_mealplan && (
									<ProductPlanner
										productId={""}
										data={products.productDetails}
										FormData={FormData}
										handleChange={handleChange}
										control={control}
										variantsSelected={variantsSelected}
										updateAddresses={updateAddresses}
									/>
								)}
							</Col>
						</Row>
					</>
					}
					<div style={{ display: "block", height: 20 }} />
				</div>
			
		</FormProvider>
	);
};

export default ProductDetails;