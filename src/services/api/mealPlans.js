const API_URL = process.env.REACT_APP_API_URL;


export class mealPlans {
    static getMealPlans = async () => {
      return await fetch("https://ca57f53chjghzmmjskz3e6sptq.appsync-api.us-east-1.amazonaws.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
        },
        body: JSON.stringify({
            query: `{
              listItems(filter: {is_mealplan: {eq: true}}, limit: 10000) {
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
            }`
          })
      }).then((res) => res.json());
    };

    static mealPlanDetails = async (id) => {
      return await fetch("https://ca57f53chjghzmmjskz3e6sptq.appsync-api.us-east-1.amazonaws.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "da2-qp52v6iixvh6bdgd2qjdqa3dyq",
        },
        body: JSON.stringify({
          query: `{
          getItem(id: ${JSON.stringify(id)}) {
            category
            defaultimg_url
            description
            display_name
            duration
            id
            img_url
            is_mealplan
            is_recommended
            meal_prices {
              breakfast_price
              dinner_price
              lunch_price
            }
            mealtype
            name
            saleprice
            status
            tags
            tax_methods
            tenure
            uom_name
            variants {
              display_name
              is_exclusive
              is_multiselect
              name
              variant_items {
                saleprice
                image
                name
                display_name
                description
              }
            }
          }
              }`})
      }).then((res) => res.json());
    };
  
}