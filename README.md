
 - Admin Dashboard is only accessible to you if you clone it you can't Signup for Admin Account.
#### multi User Login System
- SignIn / SignUp ✔
- Forget Password ✔
- JWT validation on each Authorized Request ✔
- Authorization validation for Admin Access and Customer Access ✔

# ADMIN PANEL
 - Add a product ✔
 - view Product ✔
 - Delete a Product ✔
 - update product ✔
 - Add a Category ✔
 - view Category (Data tables) ✔
 - update Category  ✔
 - Delete category ✔
 - search category By name ✔
 - search product by category Name ✔
 - Handle Order Delivery  ✔
 - Pending Order  List ✔
 - Completed Order List ✔

# Customer
- View Product & Category ✔
- view product related to specific category ✔
- view dynamic pages detail with breadcamp ✔
- Add product to cart ✔
- Remove Product from cart ✔
- Increase Decrease cart Item  Quantity ✔ (IF product Instock Quantity is less then your cart quantity then you are unable to  increase that product Quantity)
- Alert if InStock Quantity isn't Available ✔
- Bookmark favourite Product ✔
- remove product from bookmark ✔
- Order a Product ✔
- After Creating an Order Product Exists in Cart for current User will be Cleared ✔
- track Order Status ✔
- View Order Detail ✔

#### Note 
More Functionality will be added with time



## Tech
- Nextjs 13
- Typescript
- tailwind css
- Redux toolkit
- joi validation
- mongoDB
- SWR hooks for fetching API 

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URI` = Your mongoDB URL

`JWT_SECREAT` = Your custom JWT_SECREAT key

`NEXT_PUBLIC_API_BASE_URL` =  Base URL for localhost  => http://localhost:3000


## Installation


```bash
  npm install
  npm run dev (for development server)
  npm run build (for Production)
  npm run preview (To View Production Server )
```

