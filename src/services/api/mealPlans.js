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
        listItems(filter: { is_mealplan: { eq: true } }, limit: 1000) {
          items {
            category
            defaultimg_url
            description
            display_name
            duration
            id
            img_url
            is_mealplan
            meal_prices {
              breakfast_price
              lunch_price
              dinner_price
            }
            mealtype
            name
            saleprice
            status
            tags
            tax_methods
            tenure
            uom_name
            upd_by
            upd_on
            variants {
              display_name
              is_exclusive
              name
              variant_items {
                description
                display_name
                image
                name
                saleprice
              }
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