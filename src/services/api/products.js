import { api_urls } from "../../utils";
import {
	getAddressList,
	getProductDetails,
	getProducts,
	getProductsByCategory,
	getStaples,
	searchProducts,
} from "../graphql/mutations";
const ADDON_API_URL = process.env.REACT_APP_ADDON_API_URL;
const ADDON_API_KEY = process.env.REACT_APP_ADDON_API_KEY;
const CATEGORY_API_KEY = process.env.REACT_APP_CATEGORY_KEY;

export class Products {
	static getAddons = (data) => {
		let q = `{listItems`;
		if (data.search) {
			q += `(filter:{display_name: {contains:"${data.search}"},is_mealplan: {eq: true},status: {eq: "A"}})`
		}else {
			q += `(filter:{is_mealplan: {eq: false},status: {eq: "A"}})`
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
		return fetch(`${ADDON_API_URL}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'X-API-Key': `${ADDON_API_KEY}`
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
			return await fetch(api_urls.Product_REL_API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-API-KEY": `${CATEGORY_API_KEY}`,
				},
				body: JSON.stringify({
					query: params.payload.category === "Staples" ? getStaples : getProducts,
					variables: {
						category: params.payload.category || "",
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
		const getToken = await sessionStorage.getItem('token')
		return await fetch(api_urls.Product_REL_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": `${CATEGORY_API_KEY}`,
			},
			body: getProductDetails(id.payload),
		}).then((res) => res.json());
	};

	static productSearch = async (query) => {
		return await fetch(api_urls.Product_REL_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": `${ADDON_API_KEY}`,
			},
			body: searchProducts(query),
		}).then((res) => res.json());
	};

	static getAddressList = async (id) => {
		const getToken = await sessionStorage.getItem('token')
		return await fetch(
			`${api_urls.Common_API_URL}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": getToken,
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
