/* eslint-disable no-extend-native */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

import {
	Accordion,
	Form,
	FloatingLabel,
	OverlayTrigger,
	Popover,
	Button,
	InputGroup,
	FormControl,
} from "react-bootstrap";
import Select from "react-select";
import { components } from "react-select";
import { Calendar } from "react-multi-date-picker";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import { GrAdd } from "react-icons/gr";
import { BiRupee } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";


import useQuery from "../../hooks/useQuery";
import { AddressModal } from "./address-modal";
import { getAddresses, showLogin, getAddons, deleteAddress, getPostalCodes } from "../../store/actions";

const getNewAddress = (customerId, userDetailsName) => ({
	aline1: "",
	aline2: "",
	community: "",
	area: "",
	landmark: "",
	city: "",
	state: "",
	postalcode: 0,
	customer_id: customerId,
	tag: "",
	customer_name: userDetailsName,
});

const sessionsOrder = ['breakfast', 'lunch', 'dinner'];

const ProductPlanner = ({ customerId, data, control, variantsSelected, updateAddresses }) => {
	let query = useQuery();
	const dispatch = useDispatch();

	const productState = useSelector((state) => state.products);
	const userDetails = useSelector((state) => state.auth.userDetails);
	const Addresses = useSelector((state) => state.Addresses.addressList);
	const postalCodes = useSelector((state) => state.Addresses.postalCodes);
	const [servicePinCodes, setServicePinCodes] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [Variants, setVariants] = useState([]);
	const [AddressList, setAddressList] = useState([]);
	const [startDate, setStartDate] = useState({
		breakfast: [],
		lunch: [],
		dinner: [],
	});
	// const [showModal, setShowModal] = useState(false);
	const [VariantValue, setVariantValue] = useState({});
	const [selectedAddress, setSelectedAddress] = useState({});
	const [addonSearch, setAddonSearch] = useState('');
	const [addons, setAddons] = useState([]);
	const [selectedAddons, setSelectedAddons] = useState([]);
	const [AddOnView, setAddOnView] = useState({
		B: [],
		L: [],
		D: [],
	});

	const [addresses, setAddresses] = useState({
		home: getNewAddress(customerId, userDetails.name),
		office: getNewAddress(customerId, userDetails.name),
		other: []
	});

	const [sessionAddress, setSessionAddress] = useState({ breakfast: 'home', lunch: 'home', dinner: 'home' });

	const [pincodes, setPincodes] = useState(['', '', '']);

	const getAddrTypeClassName = (session, addrType) => {
		return sessionAddress[session] === addrType ? 'btn-dark' : 'btn-outline-dark';
	};

	const handleAddress = (session, key, value) => {
		let newAddressesObj;
		if (typeof sessionAddress[session] === 'number') {
			const sessionAddrCopy = addresses.other;
			sessionAddrCopy[sessionAddress[session]][key] = value;
			newAddressesObj = { ...addresses, other: sessionAddrCopy };
		} else {
			const sessionAddrCopy = addresses[sessionAddress[session]];
			sessionAddrCopy[key] = value;
			newAddressesObj = { ...addresses, [sessionAddress[session]]: sessionAddrCopy };
		}
		setAddresses(newAddressesObj);
	};

	const getFieldValue = (session, fieldName) => {
		return typeof sessionAddress[session] === 'number' ? addresses.other[sessionAddress[session]][fieldName] : addresses[sessionAddress[session]][fieldName];
	};

	const handleAddrTagClick = (session, addrType) => {
		if (typeof addrType === 'number' && typeof addresses.other[addrType] !== 'object') {
			const otherAddrsCopy = [...addresses.other];
			otherAddrsCopy[addrType] = getNewAddress(customerId, userDetails.name);
			setAddresses({ ...addresses, other: otherAddrsCopy });
		}
		setSessionAddress({ ...sessionAddress, [session]: addrType });
	};

	useEffect(() => {
		updateAddresses(Object.entries(sessionAddress)
			.map(([key, value]) =>
				({ ...(typeof value === 'number' ? addresses.other[value] : addresses[value]), tag: typeof value === 'number' ? 'other' : value, postalcode: pincodes[sessionsOrder.indexOf(key)] })
			));
	}, [addresses, pincodes, sessionAddress, updateAddresses]);

	const { fields } = useFieldArray({
		control: control,
		name: "subscription",
	});

	const methods = useFormContext();
	const { watch, setValue } = methods;
	const { subscription, variants } = watch();

	// const handleClose = () => setShowModal(false);
	// const handleShow = () => setShowModal(true);

	const colourStyles = {
		menuList: styles => ({
			...styles,
			background: 'rgba(209,235,232,1)'
		}),
		option: (styles, { isFocused, isSelected }) => ({
			...styles,
			background: isFocused
				? '#F2CBBD'
				: isSelected
					? 'rgba(54,41,24,1)'
					: undefined,
			zIndex: 1
		}),
		menu: base => ({
			...base,
			zIndex: 100
		})
	}

	useEffect(() => {
		dispatch(getAddons({ search: addonSearch }))
	}, [addonSearch])

	useEffect(() => {
		if (!productState.loading && productState.addons && productState.addons.length > 0) {
			let a = JSON.parse(JSON.stringify(productState.addons)).map(add => {
				return {
					label: <div style={{ display: "flex" }}>
						<span>{add.display_name}</span>
						<span style={{ marginLeft: "auto", whiteSpace: 'nowrap' }}><BiRupee />{add.sale_val ? add.sale_val : 0}</span>
					</div>,
					value: add.id,
					price: add.sale_val,
					item_id: add.id,
					item_name: add.display_name
				}
			})
			setAddons(a)
		}
	}, [productState]);

	useEffect(() => {
		dispatch(getPostalCodes());
	}, [dispatch]);

	useEffect(() => {
		if (postalCodes?.listPostalCodes && postalCodes?.listPostalCodes?.items?.length) {
			setServicePinCodes(postalCodes?.listPostalCodes.items.map(postalCodeObj => postalCodeObj.postalcode));
		}
	}, [postalCodes?.listPostalCodes]);


	useEffect(() => {
		let temp = [];
		data &&
			data?.variants &&
			data?.variants?.map((variant) => {


				let temp1 = [];
				console.log('varItem===>', variant);



				variant?.items.map((varItem) => {
					temp1.push({
						...varItem,
						display_name: varItem?.display_name,
						label: varItem?.display_name,
						value: varItem?.display_name,
					});
					if (varItem.default) {
						setVariantValue({
							...VariantValue,
							[variant.display_name]: {
								...varItem,
								display_name: varItem?.display_name,
								label: varItem?.display_name,
								value: varItem?.display_name,
							},
						});

						let temp = [...variants];

						if (variants.length) {
							const i = temp.findIndex(
								(_item) => _item.display_name === varItem.display_name
							);
							if (i > -1)
								temp[i] = {
									display_name: variant.display_name,
									items: { display_name: varItem.display_name },
								};
							// (2)
							else
								temp.push({
									display_name: variant.display_name,
									items: { display_name: varItem.display_name },
								});
						} else {
							temp.push({
								display_name: variant.display_name,
								items: { display_name: varItem.display_name },
							});
						}

						setValue("variants", temp);
					}
				});

				temp.push({ ...variant, items: temp1 });

			});
		setVariants(temp);
	}, [data]);

	// useEffect(() => {
	// 	if (userDetails.sub) {
	// 		dispatch(getAddresses({ customerId: userDetails.sub }));
	// 	}
	// }, [userDetails.sub]);

	// useEffect(() => {
	// 	let temp = [];

	// 	if (Addresses.listAddresses) {
	// 		const items = Addresses.listAddresses.items;
	// 		items.map((address) => {
	// 			let label =
	// 				address.aline1 +
	// 				", " +
	// 				address.aline2 +
	// 				", " +
	// 				address.city +
	// 				", " +
	// 				address.state +
	// 				", " +
	// 				address.postalcode;
	// 			temp.push({ ...address, label: label, value: address.id });
	// 		});
	// 		setAddressList(temp);
	// 	}
	// }, [Addresses?.listAddresses?.items]);

	// const SelectMenuButton = (props) => {
	// 	return (
	// 		<components.MenuList {...props}>
	// 			{props.children}
	// 			<Button variant="outline-dark" className="w-100" onClick={handleShow} style={{marginTop:"20px"}}>
	// 				<GrAdd /> New address
	// 			</Button>
	// 		</components.MenuList>
	// 	);
	// };

	// const CustomOption = ({ innerRef, innerProps, data, children }) => {
	// 	return (
	// 	  <div
	// 		ref={innerRef}
	// 		{...innerProps}
	// 		style={{ display: "flex", justifyContent: "space-between", padding:"10px", background:'#ededed', marginBottom:'5px' }}
	// 	  >
	// 		<span style={{ cursor: "pointer" }}>{children}</span>
	// 		<span style={{ cursor: "pointer" }}>
	// 		  <AiFillDelete
	// 			onClick={(event) => {
	// 				console.log("deleted...!!!!", data);
	// 			  dispatch(
	// 				deleteAddress({
	// 				  addressId: data.id,
	// 				  customerName: data.customer_name,
	// 				  customerId: data.customer_id,
	// 				})
	// 			  );
	// 			  event.stopPropagation();
	// 			}}
	// 		  />
	// 		</span>
	// 	  </div>
	// 	);
	//   };

	let deliverables = [
		{ name: "Breakfast", value: "breakfast", id: "B" },
		{ name: "Lunch", value: "lunch", id: "L" },
		{ name: "Dinner", value: "dinner", id: "D" },
	];

	useEffect(() => {
		let temp = [...variants];

		for (const variant in VariantValue) {
			let tempObj;
			if (Array.isArray(VariantValue[variant])) {
				let tempArr = [];
				VariantValue[variant].map((itm) => {
					tempArr.push({ display_name: itm.display_name });
				});
				tempObj = {
					display_name: variant,
					items: tempArr,
				};
			} else {
				tempObj = {
					display_name: variant,
					items: { display_name: VariantValue[variant].display_name },
				};
			}
			let indx = temp.findIndex((item) => item.display_name == variant);

			if (indx > -1) {
				temp[indx] = tempObj;
			} else {
				temp.push(tempObj);
			}
		}
		setValue("variants", temp);
		variantsSelected(VariantValue);
	}, [VariantValue]);

	useEffect(() => {
		if(pincodes && pincodes[selectedIndex].length === 6) {
			const filter = postalCodes?.listPostalCodes?.items.find(pincode => parseInt(pincodes[selectedIndex]) === pincode.postalcode);
			if(filter) {
				handleAddress(sessionsOrder[selectedIndex], 'city', filter.city);
				handleAddress(sessionsOrder[selectedIndex], 'state', filter.state);
			}
		}
	}, [pincodes]);

	const setDeliveryPinCodes = (e, index) => {
		setPincodes(pincodes.map((x, i) => i === index ? e.target.value : x));
		setSelectedIndex(index);
	}


	const handleAddOns = (index, item, value, onChange) => {
		console.log("index-item-value", index, item, value);
		console.log("onChange", onChange)
		let temp = [...AddOnView[item]];

		console.log("xxzxzx", temp);

		onChange(temp);

		let ifNotExist = temp.filter((itmm, indx) => {
			console.log("yyyy", itmm)
			if (itmm.value === value.value) {
				return itmm;
			}
		});

		console.log("ifNotExist", ifNotExist);

		ifNotExist.map((itm, idx) => {
			if (itm.value === value.value) {
				itm.qty = itm.qty + 1;
				let tempIndex = temp.findIndex(
					(tempItem) => tempItem.value == value.value
				);
				temp[tempIndex] = itm;
				console.log("updating", {
					...AddOnView,
					[item]: temp,
				});
				setAddOnView({
					...AddOnView,
					[item]: temp,
				});
				//setValue([index, `addon_items`], temp, "subscription");
			}

		})

		if (!ifNotExist.length) {
			temp.push({ ...value, qty: 1 });
			// setValue([index, `addon_items`], temp, "subscription");
			setAddOnView({
				...AddOnView,
				[item]: temp,
			})
		}
		//setSelectedAddons(value);
		// onChange(value);
	}

	const updatedQuantity = (q, idxx, session, index) => {
		console.log("check", q, idxx, session);
		let temp = AddOnView[session].map((itm, idx) => {
			if (idx === idxx) {
				let obj = { ...itm, qty: Number(q) };
				console.log("checkMate", obj);
				return obj;
			} else {
				return itm;
			}
		});
		console.log("temppppp", temp);
		setAddOnView({ ...AddOnView, [session]: temp });
		setValue(`subscription[${index}].addon_items`, temp);
	};

	console.log("AddOnView", AddOnView);
	console.log("productState", productState);
	console.log("gloabalState_subscription", subscription);

	return (
		<div>
			{/* <AddressModal
				customerId={userDetails.sub}
				handleClose={handleClose}
				showModal={showModal}
			/> */}
			{Variants && Variants.length > 0 &&
				Variants.map((variant) => {
					if (variant.display_name === "Duration") {
						return (
							<>
								<p className="h6 text-muted mt-3 mb-2 ff-2">
									{variant.display_name}
								</p>
								<Controller
									control={control}
									name={`variants.${variant.display_name}`}
									render={({ field: { onChange, name, value, ref } }) => (
										<Select
											name={name}
											placeholder={variant.display_name}
											isMulti={variant.is_multiselect}
											options={variant.items}
											value={VariantValue[variant.display_name]}
											className="prd-planning-select-box"
											styles={colourStyles}
											onChange={(value) => {
												setVariantValue({
													...VariantValue,
													[variant.display_name]: value,
												});
											}}
										/>
									)}
								/>
							</>
						);
					}
				})}

			<Accordion defaultActiveKey="0" className="mt-4 prd-planner-acc" style={{ zIndex: 2 }}>
				{/* BreakFast */}
				{deliverables.map((deliver, index) => {
					{ console.log("dfdfdf", deliver) }
					return (
						<Accordion.Item
							eventKey={deliver.value}
							key={index}
							style={{ zIndex: 2 }}
						>
							<Accordion.Header>
								<input
									type="checkbox"
									style={{ marginRight: 5 }}
									className="acc-checkbox"
									checked={subscription[index].is_included}
									onChange={(ev) => {
										let temp = [...subscription];
										temp[index] = {
											...temp[index],
											is_included: ev.target.checked,
										};
										setValue("subscription", temp);
									}}
								/>
								{String(deliver.value).toUpperCase()}
							</Accordion.Header>
							<Accordion.Body>
								<span className="d-flex justify-content-between align-items-center">
									<span>You will be having a cyclic menu. </span>
									<OverlayTrigger
										trigger="focus"
										key="lunch"
										placement={"bottom"}
										overlay={
											<Popover id="lunch">
												<Popover.Header as="h3">Menu</Popover.Header>
												<Popover.Body>No Items in Menu Yet.</Popover.Body>
											</Popover>
										}
									>
										<Button variant="transparent">
											<BsInfoCircle />
										</Button>
									</OverlayTrigger>
								</span>
								<div>
									{/* {subscription[index].isDelivery && (
										<>
											<p className="h6 text-muted mt-3 mb-2 m-2">
												Delivery Address *
											</p>
											<Controller
												control={control}
												name={`subscription[${index}].address`}
												render={({ field: { onChange, ...rest } }) => (
													<Select
														placeholder={"Address..."}
														options={AddressList}
														components={{ 
															MenuList: SelectMenuButton,
															Option: CustomOption
														}}
														{...rest}
														value={selectedAddress[deliver.value]}
														styles={colourStyles}
														onChange={(address) => {
															let addrss = { ...address };
															delete addrss.label;
															delete addrss.value;
															onChange(addrss);
															setSelectedAddress({
																...selectedAddress,
																[deliver.value]: address,
															});
														}}
													/>
												)}
											/>
										</>
									)} */}

									<InputGroup className="my-2 dp-date">
										<InputGroup.Text>Start Date</InputGroup.Text>
										<FormControl
											type="date"
											min={moment(new Date()).format("YYYY-MM-DD")}
											// max={moment(new Date()).format("YYYY-MM-DD")}
											value={startDate[deliver.value]}
											onChange={(ev) => {
												setStartDate({
													...startDate,
													[deliver.value]: ev.target.value,
												});
												let temp = [];
												for (
													let i = 0;
													i < VariantValue?.Duration?.duration;
													i++
												) {
													temp.push(
														moment(ev.target.value)
															.add(i, "days")
															.format("YYYY/MM/DD")
													);
												}
												setValue(`subscription[${index}].order_dates`, temp);
											}}
										/>
									</InputGroup>

									{/* {startDate[deliver]?.length && ( */}
									<div style={{ width: "100%" }}>
										<div className="d-flex justify-content-between align-items-center">
											<span style={{ fontWeight: 600, fontSize: 12 }}>
												Choose dates for {deliver.value}
											</span>
											<span
												style={{
													fontWeight: 600,
													fontSize: 12,
													color: "#f05922",
												}}
											>
												{VariantValue?.Duration?.duration
													? `selected ${subscription[index].order_dates.length
													} /
                      										 ${" "}${VariantValue?.Duration?.duration || 0} days.`
													: null}
											</span>
										</div>

										<div style={{ width: "100%", overflow: "auto" }}>
											<Controller
												control={control}
												name={`subscription[${index}].order_dates`}
												render={({ field: { onChange, ...rest } }) => (
													<Calendar
														key={deliver.value}
														multiple
														numberOfMonths={2}
														minDate={
															new Date()
														}
														style={{ width: "100%" }}
														maxDate={
															new Date(
																moment(subscription[index].order_dates[0])
																	.add(
																		VariantValue?.Duration?.grace +
																		VariantValue?.Duration?.duration -
																		1 || 0,
																		"days"
																	)
																	.calendar()
															)
														}
														onChange={(dateObj) => {
															let temp = [];
															dateObj.map((date) => {
																if (temp?.length === VariantValue?.Duration?.duration) {
																	return null;
																}
																temp.push(date.format());
															});
															// handleChange("mealplan_type", {
															//   ...FormData.mealplan_type,
															//   [deliver.value]: {
															//     ...FormData.mealplan_type[deliver.value],
															//     order_dates: temp,
															//   },
															// });
															onChange(temp);
														}}
														{...rest}
													/>
												)}
											/>
										</div>
										<div className="d-flex justify-content-between align-items-center mt-3 mb-0 m-2">
											<Controller
												control={control}
												name={`subscription[${index}].isDelivery`}
												render={({ field: { onChange, ...rest } }) => (
													<div className="form-check form-switch">
														<input
															{...rest}
															className="form-check-input"
															type="checkbox"
															checked={subscription[index].isDelivery}
															id={deliver.value}
															onChange={(ev) => {
																onChange(ev.target.checked);
															}}
														/>
														<label className="form-check-label" for={deliver.value}>
															{!subscription[index].isDelivery
																? "Pick Up"
																: "Deliver"}
														</label>
													</div>
												)}
											/>
										</div>
										{
											subscription[index].isDelivery && (
												<>
													<div className="mt-3">
														<FloatingLabel
															style={{ padding: "0" }}
															label="Pin Code (6 digits)"
															className="mb-2"
															size="sm"
														>
															<Form.Control
																className="bg-transparent border border-dark"
																value={pincodes[index]}
																type="tel"
																placeholder="pinCode"
																name="postalcode"
																onChange={(e) => setDeliveryPinCodes(e, index)}
																maxLength="6"
															/>
														</FloatingLabel>
													</div>
													{
														pincodes[index].length !== 6 &&
														<div className="card text-dark text-center bg-transparent border-0">
															Enter your Pincode here to validate our services availability
														</div>
													}
													{
														pincodes[index].length === 6 && (
															(!servicePinCodes.find(pincode => parseInt(pincodes[index]) === pincode)) ? (
																<>
																	<div className="card text-dark text-center bg-transparent border-0">
																		Unfortunately our services are not available in your area, please give a call to arrange alternate delivery options
																	</div>
																	<div class="card mx-auto my-3 p-0 bg-transparent border-0">
																		<div class="card-body d-flex align-items-center p-0" style={{ whiteSpace: 'nowrap' }}>
																			<FaWhatsapp className="me-2" style={{ width: '30px', height: 'auto' }} />
																			+91 999 999 9999
																			<div className="vr mx-3" />
																			<FaPhoneAlt className="me-2" style={{ width: '20px', height: 'auto' }} />
																			+91 999 999 9999
																		</div>
																	</div>
																</>
															) : (
																<>
																	<div className="d-flex mb-2 mt-4">
																		<button onClick={() => handleAddrTagClick(sessionsOrder[index], 'home')} type="button" class={`btn me-2 ${getAddrTypeClassName(sessionsOrder[index], 'home')}`}>Home</button>
																		<button onClick={() => handleAddrTagClick(sessionsOrder[index], 'office')} type="button" class={`btn me-2 ${getAddrTypeClassName(sessionsOrder[index], 'office')}`}>Office</button>
																		<button onClick={() => handleAddrTagClick(sessionsOrder[index], index)} type="button" class={`btn me-2 ${getAddrTypeClassName(sessionsOrder[index], 'other')}`}>Other</button>
																	</div>

																	<FloatingLabel
																		//controlId="floatingInput"
																		label="House No./Door No."
																		className="mt-3 mb-2"
																	>
																		<Form.Control
																			className="bg-transparent border-dark"
																			value={getFieldValue(sessionsOrder[index], 'aline1')}
																			type="text"
																			placeholder="houseNo"
																			name="aline1"
																			onChange={(e) =>
																				handleAddress(sessionsOrder[index], e.target.name, e.target.value)
																			}
																		/>
																	</FloatingLabel>
																	<FloatingLabel
																		//controlId="floatingInput"
																		label="Apartment Name"
																		className="mb-2"
																	>
																		<Form.Control
																			className="bg-transparent border-dark"
																			value={getFieldValue(sessionsOrder[index], 'aline2')}
																			type="text"
																			placeholder="apartmentNo"
																			name="aline2"
																			onChange={(e) =>
																				handleAddress(sessionsOrder[index], e.target.name, e.target.value)
																			}
																		/>
																	</FloatingLabel>
																	<FloatingLabel
																		//controlId="floatingInput"
																		label="Street Name"
																		className="mb-2"
																	>
																		<Form.Control
																			className="bg-transparent border-dark"
																			value={getFieldValue(sessionsOrder[index], 'community')}
																			type="text"
																			placeholder="street"
																			name="community"
																			onChange={(e) =>
																				handleAddress(sessionsOrder[index], e.target.name, e.target.value)
																			}
																		/>
																	</FloatingLabel>
																	<FloatingLabel
																		//controlId="floatingInput"
																		label="Area"
																		className="mb-2"
																	>
																		<Form.Control
																			className="bg-transparent border-dark"
																			value={getFieldValue(sessionsOrder[index], 'area')}
																			type="text"
																			placeholder="area"
																			name="area"
																			onChange={(e) =>
																				handleAddress(sessionsOrder[index], e.target.name, e.target.value)
																			}
																		/>
																	</FloatingLabel>
																	<FloatingLabel
																		//controlId="floatingInput"
																		label="Landmark"
																		className="mb-2"
																	>
																		<Form.Control
																			className="bg-transparent border-dark"
																			value={getFieldValue(sessionsOrder[index], 'landmark')}
																			type="text"
																			placeholder="landmark"
																			name="landmark"
																			onChange={(e) =>
																				handleAddress(sessionsOrder[index], e.target.name, e.target.value)
																			}
																		/>
																	</FloatingLabel>
																	<FloatingLabel
																		//controlId="floatingInput"
																		label="City"
																		className="mb-2"
																	>
																		<Form.Control
																			className="bg-transparent border-dark"
																			value={getFieldValue(sessionsOrder[index], 'city')}
																			type="text"
																			placeholder="city"
																			name="city"
																			onChange={(e) =>
																				handleAddress(sessionsOrder[index], e.target.name, e.target.value)
																			}
																		/>
																	</FloatingLabel>
																	<FloatingLabel
																		//controlId="floatingInput"
																		label="State"
																		className="mb-2"
																	>
																		<Form.Control
																			className="bg-transparent border-dark"
																			value={getFieldValue(sessionsOrder[index], 'state')}
																			type="text"
																			placeholder="state"
																			name="state"
																			onChange={(e) =>
																				handleAddress(sessionsOrder[index], e.target.name, e.target.value)
																			}
																		/>
																	</FloatingLabel>
																</>
															)
														)
													}
												</>
											)
										}

										{/* <span>
													Balance days:{" "}
													{subscription[index].variants?.Duration?.duration ||
														0 - subscription[index].order_dates.length}
                    						</span> */}
									</div>
									{/* )} */}
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlTextarea1"
									>
										<Form.Label>
											<p className="h6 text-muted mt-3 mb-0 ff-2">Note: </p>
										</Form.Label>
										<Controller
											control={control}
											name={`subscription[${index}].notes`}
											render={({ field: { ...rest } }) => (
												<Form.Control
													as="textarea"
													rows={2}
													placeholder="note while delivery..."
													{...rest}
												/>
											)}
										/>
									</Form.Group>
									<div style={{ width: "100%" }}>
										{AddOnView[deliver.id]?.map((addonItem, idxx) => {
											return (
												<p style={{ display: "flex", justifyContent: "space-between" }}>
													<span>{addonItem?.item_name}</span>

													<InputGroup style={{ width: "50px", position: "relative", }}>
														<FormControl
															style={{ background: 'transparent', borderColor: 'rgba(54,41,24,0.75)' }}
															//type="number"
															value={addonItem.qty}
															onChange={(e) => {
																const q = e.target.value;
																if (q != null) {
																	updatedQuantity(
																		q,
																		idxx,
																		deliver.id,
																		index
																	);
																}
															}}
														/>
													</InputGroup>
													<span
														style={{
															position: "absolute",
															cursor: "pointer",
															right: "30px",
														}}
														onClick={() => {
															console.log(
																"index clicked",
																idxx,
																AddOnView
															);
															//   console.log("remove clicked",AddOnView)
															let newaddons = AddOnView[deliver.id].splice(idxx, 1);
															let newaddons2 = AddOnView[deliver.id].filter((item) => item !== newaddons);

															console.log("remove clicked", newaddons2);

															setAddOnView({ ...AddOnView, [deliver.id]: newaddons2 });
															setValue(`subscription[${index}].addon_items`, newaddons2);
														}}
													>
														<MdCancel style={{ marginTop: "-17px" }} />
													</span>
												</p>
											);
										})
										}
									</div>
									{addons && addons.length > 0 &&
										<>
											<p className="h6 text-muted mt-3 mb-0 ff-2">Addons: </p>
											<Controller
												control={control}
												name={`subscription[${index}].addon_items`}
												render={({ field: { onChange, ...rest } }) => (
													<Select
														name="addon_items"
														placeholder="Choose addons"
														//isMulti={true}
														isSearchable={true}
														options={addons}
														className="mb-3 text-start custom-accordion-bg"
														{...rest}
														// onChange={(value) => {
														// 	console.log("value-inside-select", value);
														// 	let temp = value.map(val => {
														// 		return {...val, qty: 1}
														// 	})
														// 	setSelectedAddons(temp);
														// 	onChange(temp);

														// }}
														styles={colourStyles}
														onChange={(value) => {
															handleAddOns(index, deliver.id, value, onChange)
														}
														}
													/>

												)}
											/>
										</>
									}
								</div>
							</Accordion.Body>
						</Accordion.Item>
					);
				})}
			</Accordion>
			{/* Meals */}
		</div >
	);
};

export default ProductPlanner;