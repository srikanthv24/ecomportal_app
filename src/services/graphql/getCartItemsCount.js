export const GET_CART_ITEMS_COUNT = `query($customer_id: string!){
    getCartItemsCount(filter: {customer_id: {eq: customer_id}}) {
        count
        }
    }`;
