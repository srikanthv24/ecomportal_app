// CATEGORY API ENDPOINTS
// Url: https://ca57f53chjghzmmjskz3e6sptq.appsync-api.us-east-1.amazonaws.com/graphql
// Method: POST
// api key: X-API-Key
// Value: da2-orjjngnz3ffc3jjnn75bfm4roi   
// Add to: header
// Request body:
// -->Request for create Category:
//         mutation MyMutation {
//       createItemCategory(input: {display_name: "Hello", name: "Hello", status: "A", upd_by: "User", upd_on: "2021-07-16T05:17:17.854Z"}) {
//         defaultimg_url
//         description
//         display_name
//         img_url
//         id
//         name
//         status
//         upd_by
//         upd_on
//       }
//     }
//     -->Response:
//     {
//       "data": {
//         "createItemCategory": {
//           "defaultimg_url": null,
//           "description": null,
//           "display_name": "Hello",
//           "img_url": null,
//           "id": "e9c4e56b-d7b6-4c32-baaf-f92442e74de4",
//           "name": "Hello",
//           "status": "A",
//           "upd_by": "User",
//           "upd_on": "2021-07-16T05:17:17.854Z"
//         }
//       }
//     }

// -->Request for update Categoty:
//         mutation {
//       updateItemCategory(input: {name: "followups", upd_by: "user", upd_on: "2021-07-13T14:18:07.597Z", id: "58f98dca-c9f7-4a7d-821d-f488b3cfc63c"}) {
//         status
//         name
//         upd_by
//         upd_on
//         img_url
//         id
//         display_name
//         description
//         defaultimg_url
//       }
//     }
//     -->Response:
//     {
//       "data": {
//         "updateItemCategory": {
//           "status": "D",
//           "name": "followups",
//           "upd_by": "user",
//           "upd_on": "2021-07-13T14:18:07.597Z",
//           "img_url": null,
//           "id": "58f98dca-c9f7-4a7d-821d-f488b3cfc63c",
//           "display_name": "follow ups",
//           "description": null,
//           "defaultimg_url": null
//         }
//       }
//     }
    
// --> Request for delete category:
//         mutation {
//       deleteItemCategory(input: {name: "followups", id: "58f98dca-c9f7-4a7d-821d-f488b3cfc63c"}) {
//         description
//         defaultimg_url
//         display_name
//         id
//         img_url
//         name
//         status
//         upd_by
//         upd_on
//       }
//     }
//     -->Response 
//     {
//       "data": {
//         "deleteItemCategory": {
//           "description": null,
//           "defaultimg_url": null,
//           "display_name": "follow ups",
//           "id": "58f98dca-c9f7-4a7d-821d-f488b3cfc63c",
//           "img_url": null,
//           "name": "followups",
//           "status": "D",
//           "upd_by": "user",
//           "upd_on": "2021-07-13T14:18:07.597Z"
//         }
//       }
//     }
    
// -->Request for get category:
//         query {
//       getItemCategory(id: "3cd14245-f58d-4772-817d-a22bf3631f9e", name: "categories") {
//         defaultimg_url
//         display_name
//         description
//         id
//         img_url
//         name
//         status
//         upd_by
//         upd_on
//       }
//     }
//     -->Response:
//       {
//         "data": {
//           "getItemCategory": {
//             "defaultimg_url": "https://portalimg.s3.amazonaws.com/category/download.jfif",
//             "display_name": "drinks",
//             "description": null,
//             "id": "3cd14245-f58d-4772-817d-a22bf3631f9e",
//             "img_url": [
//               "https://portalimg.s3.amazonaws.com/category/photo.jfif,https://portalimg.s3.amazonaws.com/category/stripe_error.PNG"
//             ],
//             "name": "categories",
//             "status": "A",
//             "upd_by": "user",
//             "upd_on": "2021-07-21T11:06:18.241Z"
//           }
//         }
//       }
      
// -->Request for list Categories:
//         query {
//       listItemCategories {
//         items {
//           defaultimg_url
//           description
//           display_name
//           id
//           img_url
//           name
//           status
//           upd_by
//           upd_on
//         }
//       }
//     }
//     -->Response:
//     {
//       "data": {
//         "listItemCategories": {
//           "items": [
//             {
//               "defaultimg_url": "https://portalimg.s3.amazonaws.com/category/download.jfif",
//               "description": null,
//               "display_name": "drinks",
//               "id": "3cd14245-f58d-4772-817d-a22bf3631f9e",
//               "img_url": [
//                 "https://portalimg.s3.amazonaws.com/category/photo.jfif,https://portalimg.s3.amazonaws.com/category/stripe_error.PNG"
//               ],
//               "name": "categories",
//               "status": "A",
//               "upd_by": "user",
//               "upd_on": "2021-07-21T11:06:18.241Z"
//             },
//             {
//               "defaultimg_url": null,
//               "description": null,
//               "display_name": "DRINKS",
//               "id": "5988a94b-0af9-452d-a8ae-1959c07bbd58",
//               "img_url": null,
//               "name": "DRINKS",
//               "status": "A",
//               "upd_by": "satya goli",
//               "upd_on": "2021-07-01T14:40:00.000Z"
//             }
//           ]
//         }
//       }
//     }

//     {
//         listItems {
//           items {
//             amount
//             category
//             defaultimg_url
//             description
//             display_name
//             id
//             img_url
//             name
//             status
//             upd_by
//             upd_on
//           }
//         }
//       }