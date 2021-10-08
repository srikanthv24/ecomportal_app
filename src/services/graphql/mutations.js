export const getProducts = `query ($limit: Int, $nextToken: String) {
  listItems (limit: $limit, nextToken: $nextToken){
    items {
      id
      is_mealplan
      is_recommended
      category
      defaultimg_url
      description
      display_name
      img_url
      meal_prices {
        breakfast_price
        dinner_price
        lunch_price
      }
      mealtype
      name
      sale_val
      status
      tags
      tax_inclusive
      tax_methods
      uom_name
      upd_by
      upd_on
      variants {
        is_sale_value_absolute
        is_multiselect
        input_type
        display_name
        items {
          default
          description
          display_name
          sale_val
          name
          image
          grace
          duration
        }
        name
        sale_val
      }
    }
    nextToken
  }
}`;

export const getProductsByCategory = (params) => {
  console.log("PAPAPA", params.payload);
  return JSON.stringify({
    query: `{
    listItems (filter: {category: {eq: ${JSON.stringify(
      params.payload.filter.category.eq
    )}}}) {
      items {
        saleprice
        category
        defaultimg_url
        description
        display_name
        tax_methods
        id
        uom_name
        img_url
        name
        status
        upd_by
        upd_on
      }
    } 
  }`,
  });
};

export const searchProducts = (searchQuery) => {
  return JSON.stringify({
    query: `{
      listItems (filter: {display_name: {contains: ${JSON.stringify(
        searchQuery.payload
      )}}}, limit: 1000) {
        items {
          id
          is_mealplan
          is_recommended
          category
          defaultimg_url
          description
          display_name
          img_url
          meal_prices {
            breakfast_price
            dinner_price
            lunch_price
          }
          mealtype
      name
      sale_val
      status
      tags
      tax_inclusive
      tax_methods
      uom_name
      upd_by
      upd_on
      variants {
        is_sale_value_absolute
        is_multiselect
        input_type
        display_name
        items {
          default
          description
          display_name
          sale_val
          name
          image
          grace
          duration
        }
        name
        sale_val
      }
    }
  }
}`,
  });
};

export const getProductDetails = (id) =>
  JSON.stringify({
    query: `{​​​​​​​
      getItem(id: ${JSON.stringify(id)}) {​​​​​​​
        id
        category
        defaultimg_url
        description
        display_name
        img_url
        is_mealplan
        is_recommended
        mealtype
        name
        sale_val
        status
        tags
        meal_prices {
          breakfast_price
          dinner_price
          lunch_price
        }
        tax_inclusive
        tax_methods
        uom_name
        upd_by
        upd_on
        variants {
          display_name
          sale_val
          name
          is_sale_value_absolute
          is_multiselect
          input_type
          items {
            default
            description
            display_name
            duration
            grace
            image
            sale_val
            name
          }​​​​​​​
        }​​​​​​​
      }​​​​​​​
    }​​​​​​​`,
  });

export const getAddressList = `query ($customerId: String!) {
    listAddresses (filter: {customer_name: {eq: $customerId}}) {
    items {
    customer_name
    aline1
    aline2
    city
    customer_name
    community
    landmark
    state
    tag
    id
    postalcode
    }
    }
    }`;

export const getCategories = `query($limit: Int, $nextToken: String) {
  listItemCategories (limit: $limit, nextToken: $nextToken){
      items {
        defaultimg_url
        description
        display_name
        id
        img_url
        name
        upd_by
        status
        upd_on
      }
  nextToken
}}`;

export const getCart = `query ($customer_id: ID!){
  queryCartsByCustomerIndex(customer_id: $customer_id) {
    items {
      customer_id
      pay_status
      id
      items {
        defaultimg_url
        item_name
        tax_methods
        uom_name
        category
        item_id
        qty
        sale_val
        subscription {
          address {
              aline1
          }
          isDelivery
          meal_type
          notes
          order_dates
          sale_val
        }
        variants {
          display_name
          items {
            display_name
          }
        }
      }
    }
  }
}`;

export const CartSummary = `query ($customer_id: ID!){
  queryCartsByCustomerIndex(customer_id: $customer_id) {
    items {
      customer_id
      customer_mobile
      customer_name
      id
      grand_total
      pay_status
      items {
        defaultimg_url
        item_name
        tax_methods
        sub_total
        tax_amount
        uom_name
        category
        item_id
        qty
        sale_val
        subscription {
          address {
              aline1
          }
          isDelivery
          meal_type
          notes
          order_dates
          sale_val
        }
        variants {
          display_name
          items {
            display_name
          }
        }
      }
    }
  }
}`;

export const createCart = (params) => {
  console.log("PARQAMS", params);
  return `mutation {
  createCart(input: ${params.payload}) {
    id
  }
}`;
};

export const updateCart = `mutation ($cart_id: ID!, $qty: Int!) {
  updateCart(input: {cart_id: $cart_id, qty: $qty}) {
    customer
    id
    qty
    upd_by
    upd_on
  }
}`;

export const getCartItemSchema = `query ($cartId: ID) {
  listCartItems (filter: {cart_id: {eq: $cartId}}, limit: 100000){
    items {
      cart_id
      id
      defaultimage_url
      sale_val
      uom_name
      tax_methods
      qty
      subscription {
        img
        customer_id
        customer_name
        is_mealplan
        item_id
        item_name
        qty
        sale_val
        mealplan {
          address {
            aline1
            aline2
            city
            community
            customer_id
            customer_name
            landmark
            postalcode
            state
            tag
          }
          isDelivery
          meal_type
          notes
          order_dates
          sale_val
          variants {
            items {
              description
              display_name
              image
              sale_val
            }
            name
            sale_val
          }
        }
      }
    }
  }
}`;

export const createCartItem = (
  data
) => `mutation ($item: ID!, $cart: ID!, $qty: Int!, $Subscription_data: SubscriptionData) {
  createCartItem(input: {item_id: $item, cart_id: $cart, qty: $qty, subscription_data: $Subscription_data}) {
    id
    cart_id
    item_id
    qty
    
  }
}`;

export const updateCartItem = (params) => `mutation {
  updateCart(input: {id: "c93e8494-f712-439f-bd7c-08b51e1c8ad8", customer_id: "", item: {item_id: "20", qty: 50, sale_val: 1.5, subscription: {address: {aline2: "banjarahills", community: "", city: "Hyderabad", aline1: "lroad no. 12", customer_id: "", customer_name: "mobi", landmark: "beside almondhouse", postalcode: "500081", state: "Telengana", tag: "Office"}, isDelivery: true, meal_type: "B", notes: "Please Call", order_dates: "28-09-2021", sale_val: 1.5}, variants: {display_name: "Duration", items: {display_name: "7 days"}}}}) {
    id
    customer_id
  }
}`;

export const deleteCartItem = `mutation($ID: ID!){
  deleteCartItem(input:{
    id:$ID
  })
  {
    id
  }
}`;

export const updateCartQty = `mutation ($item_id: ID!, $qty: Int!, $cart_id: ID!) { UpdateCartItemQty(input: {qty: $qty, cart_id: $cart_id, item_id: $item_id}) {
  id
  customer_id
  customer_mobile
  customer_name
  items {
  defaultimg_url
  category
  qty
  item_id
  sale_val
  sub_total
  item_name
  is_mealplan
  }
  pay_status
  grand_total
  upd_by
  upd_on
  }
  }`;

export const Orders = `query ($cutomer_mobile: String){
  listSubscriptions(filter: {customer_mobile: {eq: $cutomer_mobile}}) {
    id
    customer {
      mobile
      display_name
    }
    B_balance
    D_balance
    L_balance
    start_date
    product {
      display_name
      category
    }
    finish_date
  }
}`;
