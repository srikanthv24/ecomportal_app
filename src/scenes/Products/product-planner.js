/* eslint-disable no-extend-native */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
	Accordion,
	Form,
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
import { getAddresses, showLogin, getAddons, deleteAddress } from "../../store/actions";


const ProductPlanner = ({ customerId, data, control, variantsSelected }) => {
	let query = useQuery();
	const dispatch = useDispatch();

	const productState = useSelector((state) => state.products);
	const userDetails = useSelector((state) => state.auth.userDetails);
	const Addresses = useSelector((state) => state.Addresses.addressList);

	const [Variants, setVariants] = useState([]);
	const [AddressList, setAddressList] = useState([]);
	const [startDate, setStartDate] = useState({
		breakfast: [],
		lunch: [],
		dinner: [],
	});
	const [showModal, setShowModal] = useState(false);
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

	const { fields } = useFieldArray({
		control: control,
		name: "subscription",
	});

	const methods = useFormContext();
	const { watch, setValue } = methods;
	const { subscription, variants } = watch();

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const colourStyles = {
		menuList: styles => ({
			...styles,
			background: 'rgba(209,235,232,1)'
		}),
		option: (styles, {isFocused, isSelected}) => ({
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
						<span style={{ marginLeft: "auto", whiteSpace:'nowrap' }}><BiRupee />{add.sale_val ? add.sale_val : 0}</span>
					</div>,
					value: add.id,
					price: add.sale_val,
					item_id: add.id,
					item_name:add.display_name
				}
			})
			setAddons(a)
		}
	}, [productState])

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

	useEffect(() => {
		if (userDetails.sub) {
			dispatch(getAddresses({ customerId: userDetails.sub }));
		}
	}, [userDetails.sub]);

	useEffect(() => {
		let temp = [];

		if (Addresses.listAddresses) {
			const items = Addresses.listAddresses.items;
			items.map((address) => {
				let label =
					address.aline1 +
					", " +
					address.aline2 +
					", " +
					address.city +
					", " +
					address.state +
					", " +
					address.postalcode;
				temp.push({ ...address, label: label, value: address.id });
			});
			setAddressList(temp);
		}
	}, [Addresses?.listAddresses?.items]);

	const SelectMenuButton = (props) => {
		return (
			<components.MenuList {...props}>
				{props.children}
				<Button variant="outline-dark" className="w-100" onClick={handleShow} style={{marginTop:"20px"}}>
					<GrAdd /> New address
				</Button>
			</components.MenuList>
		);
	};

	const CustomOption = ({ innerRef, innerProps, data, children }) => {
		return (
		  <div
			ref={innerRef}
			{...innerProps}
			style={{ display: "flex", justifyContent: "space-between", padding:"10px", background:'#ededed', marginBottom:'5px' }}
		  >
			<span style={{ cursor: "pointer" }}>{children}</span>
			<span style={{ cursor: "pointer" }}>
			  <AiFillDelete
				onClick={(event) => {
					console.log("deleted...!!!!", data);
				  dispatch(
					deleteAddress({
					  addressId: data.id,
					  customerName: data.customer_name,
					  customerId: data.customer_id,
					})
				  );
				  event.stopPropagation();
				}}
			  />
			</span>
		  </div>
		);
	  };

	let deliverables = [
		{ name: "Breakfast", value: "breakfast",id: "B" },
		{ name: "Lunch", value: "lunch", id:"L" },
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


	const handleAddOns = (index, item, value, onChange) => {
		console.log("index-item-value", index, item,value);
		console.log("onChange", onChange)
		let temp = [...AddOnView[item]];

		console.log("xxzxzx", temp);

		onChange(temp);

		let ifNotExist = temp.filter((itmm, indx) => {
			console.log("yyyy",itmm)
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

		if(!ifNotExist.length) {
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
		setValue(`subscription[${index}].addon_items`,temp);
	  };

	console.log("AddOnView",AddOnView);
	console.log("productState", productState);
	console.log("gloabalState_subscription",subscription );

	return (
		<div>
			<AddressModal
				customerId={userDetails.sub}
				handleClose={handleClose}
				handleShow={handleShow}
				showModal={showModal}
			/>
			{Variants && Variants.length > 0 && 
				Variants.map((variant) => {
					if(variant.display_name === "Duration") {
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
					{console.log("dfdfdf",deliver)}
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
										trigger="hover"
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
														if (userDetails.sub) {
															onChange(ev.target.checked);
														} else {
															dispatch(showLogin());
														}
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
								<div>
									{subscription[index].isDelivery && (
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
									)}

									<InputGroup className="my-2">
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
									<div style={{width:"100%"}}>
										{AddOnView[deliver.id]?.map((addonItem, idxx) => {
											return (
											<p style={{display:"flex", justifyContent:"space-between"}}> 
												<span>{addonItem?.item_name}</span>

											<InputGroup style={{width:"50px",  position: "relative",}}>
												<FormControl
												style={{background:'transparent',borderColor:'rgba(54,41,24,0.75)'}}
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
			   
												   setAddOnView({...AddOnView,[deliver.id]: newaddons2});
												   setValue(`subscription[${index}].addon_items`,newaddons2);
												 }}
											>
												<MdCancel style={{marginTop:"-17px"}}/>
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
		</div>
	);
};

export default ProductPlanner;