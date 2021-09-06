export const getProducts = () => {
  return JSON.stringify({
    query: `{
    listItems {
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

export const getProductsByCategory = (params) => {
  console.log("PAPAPA", params);
  return JSON.stringify({
    query: `{
    listItems (filter: {category: {eq: "Vegetables"}}) {
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

export const searchProducts = (searchQuery) => {
  return JSON.stringify({
    query: `{
      listItems (filter: {display_name: {contains: "Dri"}}) {
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
        id
        name
        uom_name
        status
        upd_by
        upd_on
        }
        }`,
  });
