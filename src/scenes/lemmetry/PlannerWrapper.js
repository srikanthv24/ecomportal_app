/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
	Button,
	FormControl,
	InputGroup,
	Spinner,
	Container,
} from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { showLogin } from "../../store/actions";
import {
	createCart,
	updateCart,
	updateCartQty,
} from "../../store/actions/cart";
import ProductDetails from "../Products/product-details";

var phantom = {
	display: "block",
	padding: "60px",
	height: "10px",
	width: "100%",
};

const PlannerWrapper = ({ handleBack, isOnboarding = false }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const mealPlanId = useSelector((state) => state.mealPlans);
	const [ExistingProduct, setExistingProduct] = useState({ qty: 0 });
	const products = useSelector((state) => state.products);
	const Cart = useSelector((state) => state.Cart);
	const userDetails = useSelector((state) => state.auth.userDetails);
	const [Calculations, setCalculations] = useState({});
	const [SubscriptionTotal, setSubscriptionTotal] = useState(0);
	const [VarItems, setVarItems] = useState({});

	const [BreakUps, setBreakUps] = useState([]);

	const methods = useForm({
		defaultValues: {
			item_id: "",
			qty: 1,
			sale_val: 0,
			subscription: [
				{
					address: {},
					addon: [],
					isDelivery: false,
					meal_type: "B",
					notes: "",
					order_dates: [],
					is_included: false,
				},
				{
					address: {},
					addon: [],
					isDelivery: false,
					meal_type: "L",
					notes: "",
					order_dates: [],
					is_included: false,
				},
				{
					address: {},
					addon: [],
					isDelivery: false,
					meal_type: "D",
					notes: "",
					order_dates: [],
					is_included: false,
				},
			],
			variants: [],
		},
	});

	const { control, handleSubmit, setValue, watch } = methods;

	const { subscription, variants } = watch();

	const handleCartSubmit = (data) => {
		let payload = { ...data };
		let filteredPayload = payload.subscription.filter((item) => {
			if (item.is_included) {
				delete item.is_included;
				return item;
			}
		});

		console.log({ ...data, subscription: filteredPayload });

		if (userDetails.sub) {
			if (Cart?.cartDetails?.items?.length && Cart?.cartDetails?.items[0]?.id) {
				dispatch(
					updateCart({
						customer_id: userDetails.sub,
						cart_id: Cart?.cartDetails?.items[0]?.id,
						item: { ...data, subscription: filteredPayload },
					})
				);
			} else {
				console.log("MYToken--", sessionStorage.getItem("token"));
				dispatch(
					createCart({
						customer_id: userDetails.sub,
						items: [{ ...data, subscription: filteredPayload }],
						accessToken: sessionStorage.getItem("token"),
					})
				);
			}
		} else {
			dispatch(showLogin());
		}
	};

	console.log("ExistingProduct", ExistingProduct);

	useEffect(() => {
		let temp = [...subscription];
		if (ExistingProduct?.subscription?.length) {
			console.log(
				"Subscription___",
				subscription,
				ExistingProduct.subscription
			);
			subscription.map((item) => {
				if (item.meal_type == "B") {
					item = {
						...item,
						sale_val: products.productDetails.meal_prices.breakfast_price,
					};
				} else if (item.meal_type == "D") {
					item = {
						...item,
						sale_val: products.productDetails.meal_prices.dinner_price,
					};
				} else if (item.meal_type == "L") {
					item = {
						...item,
						sale_val: products.productDetails.meal_prices.lunch_price,
					};
				}
				ExistingProduct.subscription.map((itm) => {
					if (itm.meal_type == item.meal_type) {
						// temp.push({ ...item, is_included: true });
						let indx = temp.findIndex(
							(subscribed) => subscribed.meal_type == itm.meal_type
						);
						temp[indx] = { ...item, is_included: true };
					}
				});
			});
		}
		setValue("subscription", [...temp]);

		if (Cart?.cartDetails?.items?.length) {
			console.log("Cart?.cartDetails", Cart?.cartDetails);
			let ifExist = Cart?.cartDetails?.items[0]?.items.filter((item) => {
				if (item) {
					return item.item_id == products.productDetails.id;
				}
			});
			if (ifExist?.length) {
				setExistingProduct(ifExist[0] || { qty: 0 });
				// reset(ifExist[0]);
				// setValue('subscription[0]', ifExist[0].subscription)
			}
		}
	}, [Cart, products.productDetails, ExistingProduct]);

	const onIncrement = () => {
		dispatch(
			updateCartQty({
				cart_item_id: ExistingProduct.cart_item_id,
				id: Cart.cartDetails.items[0].id,
				customer_id: userDetails.sub,
				item_id: ExistingProduct.item_id,
				qty: ExistingProduct.qty + 1,
			})
		);
	};

	useEffect(() => {
		console.log("products.productDetails", products.productDetails);
		console.log("Cart.cartDetails", Cart.cartDetails);
	}, [products.productDetails, Cart.cartDetails]);

	const onDecrement = () => {
		dispatch(
			updateCartQty({
				cart_item_id: ExistingProduct.cart_item_id,
				id: Cart.cartDetails.items[0].id,
				customer_id: userDetails.sub,
				item_id: ExistingProduct.item_id,
				qty: ExistingProduct.qty - 1,
			})
		);
	};

	useEffect(() => {
		console.log("subscription__", variants);
		let temp = 0;
		let tempArr = [];
		let duration = VarItems?.Duration?.duration;

		console.log("itm.sale_val in useeffect____");
		subscription.map((subscribed) => {
			console.log("itm.sale_val____1", subscribed);
			if (subscribed.is_included) {
				if (subscribed.meal_type == "B") {
					let aprice = 0;
					if (subscribed.addon && subscribed.addon.length > 0) {
						subscribed.addon.forEach(element => {
							if (element.price) {
								aprice += element.price;
							}
						});
					}
					subscribed = {
						...subscribed,
						sale_val: (products.productDetails.meal_prices.breakfast_price + aprice) * duration,
					};
				} else if (subscribed.meal_type == "D") {
					subscribed = {
						...subscribed,
						sale_val:
							products.productDetails.meal_prices.dinner_price * duration,
					};
				} else if (subscribed.meal_type == "L") {
					subscribed = {
						...subscribed,
						sale_val:
							products.productDetails.meal_prices.lunch_price * duration,
					};
				}
				console.log("itm.sale_val____11", subscribed);
				tempArr.push(subscribed);
				temp = temp + subscribed.sale_val;
			}
		});
		setBreakUps(tempArr);
		setSubscriptionTotal(temp);
	}, [subscription, subscription[0].addon, subscription[1].addon, subscription[2].addon]);

	const variantsSelected = (varItems) => {
		console.log("itm.sale_val_____", varItems);
		setVarItems(varItems);
	};
	return (
		<FormProvider {...methods}>
			<div>
				<Container fluid>
					<ProductDetails
						productId={mealPlanId.mealPlanId}
						control={control}
						variantsSelected={variantsSelected}
					/>
				</Container>

				<div style={phantom} />
				<div
					style={{
						width: "100%",
						position: "fixed",
						bottom: 0,
						left: 0,
						right: 8,
						background: "#FFF",
						zIndex: 5,
						paddingTop: 10,
						boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.75)",
					}}
				>
					{products.productDetails.is_mealplan && (
						<div className="w-100 px-3">
							<div className="d-flex justify-content-between align-items-center">
								<p className="h6">Subscription Amount :</p>
								<p className="h5">
									<BiRupee /> {parseFloat(SubscriptionTotal).toFixed(2)}
								</p>
							</div>
						</div>
					)}
					<div className="d-flex align-items-center justify-content-between w-100">
						{isOnboarding ? (
							<>
								<Button
									onClick={handleBack}
									className="w-50 m-1"
									variant="secondary"
								>
									Back
								</Button>
								{ExistingProduct.qty ? (
									<Button
										className="w-50 m-1"
										// variant="success"
										style={{ background: "#f05922", border: "none" }}
										onClick={() => history.push("/cart-summary")}
									>
										Go to Cart
									</Button>
								) : (
									<Button
										className="w-50 m-1"
										style={{
											width: "100%",
											background: "#F05922",
											borderColor: "#f05922",
										}}
										onClick={handleSubmit(handleCartSubmit)}
									>
										{Cart.cartLoading ? (
											<Spinner animation="border" role="status" />
										) : (
											"Add to Cart"
										)}
									</Button>
								)}
							</>
						) : ExistingProduct.qty ? (
							<InputGroup className="p-2 w-50">
								<Button
									variant="outline-secondary"
									style={{ borderColor: "#f05922", color: "#f05922" }}
									onClick={onDecrement}
									size="sm"
								>
									{Cart.cartLoading ? (
										<Spinner animation="border" role="status" />
									) : (
										<GrSubtract />
									)}
								</Button>
								<FormControl
									aria-label="Example text with two button addons"
									style={{ textAlign: "center", border: "none" }}
									value={ExistingProduct?.qty || ""}
									type="number"
								// onChange={(ev) => setCartItem(ev.target.value)}
								/>

								<Button
									variant="outline-secondary"
									style={{ borderColor: "#f05922", color: "#f05922" }}
									onClick={onIncrement}
									size="sm"
								>
									{Cart.cartLoading ? (
										<Spinner animation="border" role="status" />
									) : (
										<GrAdd />
									)}
								</Button>
							</InputGroup>
						) : null}

						{isOnboarding ? null : (
							<Button
								className="m-1"
								disabled={
									products.productDetails.is_mealplan
										? subscription.filter((item) => item.is_included).length
											? subscription.filter((item) => item.isDelivery).length
												? !subscription.filter(
													(item) => item.address.aline1 && item
												).length
													? true
													: false
												: false
											: true
										: false
								}
								style={{
									width: "100%",
									background: "#F05922",
									borderColor: "#f05922",
								}}
								onClick={handleSubmit(handleCartSubmit)}
							>
								<AiOutlineShoppingCart />
								{"  "}
								{Cart.cartLoading ? (
									<Spinner animation="border" role="status" />
								) : (
									"Add to cart"
								)}
							</Button>
						)}
					</div>
				</div>
			</div>
		</FormProvider>
	);
};

export default PlannerWrapper;
