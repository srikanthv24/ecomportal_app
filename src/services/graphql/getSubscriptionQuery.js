export const GET_SUBSCRIPTION = `query($cart_id: ID!, $cartitem_id: ID!, $sub_id:Int!){
    getSubscriptionDetails(cart_id: $cart_id, cartitem_id: $cartitem_id, sub_id: $sub_id) {
    id
    customer_id
    customer_name
    subscription_id
    status
    customer_mobile
    ciid
    item {
    category
    defaultimg_url
    delivery_charge
    is_mealplan
    item_id
    item_name
    qty
    tax_methods
    uom_name
    sub_total
    invoice_amount
    tax_amount
    discount_amount
    delivery_charge
    discount
    variants {
    display_name
    items {
    display_name
    grace_period
    }
    }
    subscription {
    isDelivery
    meal_type
    addon_items {
    item_id
    item_name
    qty
    }
    order_dates {
    date
    status
    }
    address {
    aline1
    aline2
    city
    community
    customer_id
    customer_name
    tag
    state
    postalcode
    landmark
    id
    }
    meals_consumed
    meals_ordered
    meals_remaining
    meals_pausedORcancelled
    }
    }
    }
    }
    `;
