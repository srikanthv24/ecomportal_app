import { api_urls } from "../../utils";
import {
	getAddressList,
	getProductDetails,
	getProducts,
	getProductsByCategory,
	searchProducts,
} from "../graphql/mutations";

const API_URL = process.env.REACT_APP_API_URL;
// const API_KEY = process.env.REACT_APP_PRODUCT_API_KEY;


//ca57 - Product_REL_API_URL
export class Products {
	static getAddons = (data) => {
		let q = `{listItems`;
		if (data.search) {
			q += `(filter:{display_name: {contains:"${data.search}"}})`
		}
		q += `{
				items {
					category
					display_name
					sale_val
					id
				}
			}
		}`;
		return fetch(`${process.env.REACT_APP_ADDON_API_URL}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'X-API-Key': process.env.REACT_APP_ADDON_API_KEY
			},
			body: JSON.stringify({
				query: q
			})
		}).then((response) => {
			return response.json();
		}).then((data) => {
			return data
		})
	}

	static getProducts = async (params) => {
		try {
			console.log("PARAARARAMS==>", JSON.stringify(params.payload.category));
			// console.log("PARAMSSSS", getProductsByCategory(params));
			return await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
				},
				// body: params.payload ? getProductsByCategory(params) : getProducts(),
				body: JSON.stringify({
					query: getProducts,
					variables: {
						category: params.payload.category,
						limit: params.payload.limit,
						nextToken: params.payload.nextToken,
					},
				}),
			}).then((res) => res.json());
		} catch (error) {
			throw error;
		}
	};

	static ProductDetails = async (id) => {
		console.log("IIIIDDD", id);
		return await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
			},
			body: getProductDetails(id.payload),
		}).then((res) => res.json());
	};

	static productSearch = async (query) => {
		return await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
			},
			body: searchProducts(query),
		}).then((res) => res.json());
	};

	static getAddressList = async (id) => {
		return await fetch(
			"https://m76jgm5mv5a5ta56kwht6e6ipm.appsync-api.us-east-1.amazonaws.com/graphql",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-API-KEY": "da2-j7yxgxymtrarzavgivfwda4h5u",
				},
				body: JSON.stringify({
					query: getAddressList,
					variables: {
						customerId: id,
					},
				}),
			}
		).then((res) => res.json());
	};
}
