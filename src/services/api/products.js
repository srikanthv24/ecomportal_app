import { api_urls } from "../../utils";
import { RefreshToken } from "../../helpers/refreshSession";
import {
	getAddressList,
	getProductDetails,
	getProducts,
	getProductsByCategory,
	getStaples,
	searchProducts,
} from "../graphql/mutations";

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
		return fetch(`${api_urls.Product_REL_API_URL}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'X-API-Key': `${api_urls.Product_REL_API_KEY}`
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
					'X-API-Key': `${api_urls.Product_REL_API_KEY}`
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
		const getToken = await RefreshToken.getRefreshedToken()
		return await fetch(api_urls.Product_REL_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				'X-API-Key': `${api_urls.Product_REL_API_KEY}`
			},
			body: getProductDetails(id.payload),
		}).then((res) => res.json());
	};

	static productSearch = async (query) => {
		return await fetch(api_urls.Product_REL_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				'X-API-Key': `${api_urls.Product_REL_API_KEY}`
			},
			body: searchProducts(query),
		}).then((res) => res.json());
	};

	static getAddressList = async (id) => {
		const getToken = await RefreshToken.getRefreshedToken()
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
