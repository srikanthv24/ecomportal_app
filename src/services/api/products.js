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

//https://ca57f53chjghzmmjskz3e6sptq.appsync-api.us-east-1.amazonaws.com/graphql
//"X-API-KEY": "da2-j7yxgxymtrarzavgivfwda4h5u",

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
		//const getToken = await sessionStorage.getItem('item')
		try {
			console.log("PARAARARAMS==>", JSON.stringify(params.payload.category));
			// console.log("PARAMSSSS", getProductsByCategory(params));
			return await fetch(api_urls.Product_REL_API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
				},
				// Production"X-API-KEY": "da2-xclkxhpjbbbxfcyw2vtp3zc64e",
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
		const getToken = await sessionStorage.getItem('token')
		console.log("IIIIDDD", id);
		return await fetch(api_urls.Product_REL_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
			//	"Authorization": getToken,
			},
			body: getProductDetails(id.payload),
		}).then((res) => res.json());
	};

	static productSearch = async (query) => {
		//const getToken = await sessionStorage.getItem('token')
		return await fetch(api_urls.Product_REL_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-KEY": "da2-j7yxgxymtrarzavgivfwda4h5u",
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
