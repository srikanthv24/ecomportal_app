export const getProducts = `query ($limit: Int!, $nextToken: String) {
    listItems (limit: $limit, nextToken: $nextToken) {
      items {
        saleprice
        category
        defaultimg_url
        description
        display_name
        uom_name
        id
        img_url
        name
        tax_methods
        status
        upd_by
        upd_on
      }, 
      nextToken
    } 
  }`
  

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
      )}}}) {
        items {
          saleprice
          category
          defaultimg_url
          description
          display_name
          id 
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

export const getProductDetails = (id) =>
  JSON.stringify({
    query: `{
    getItem(id: ${JSON.stringify(id)}) {
        saleprice
        category
        defaultimg_url
        description
        display_name
        img_url
        tax_methods
        id
        name
        uom_name
        status
        upd_by
        upd_on
        }
        }`,
  });
