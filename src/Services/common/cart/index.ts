

import Cookies from "js-cookie";

export const add_to_cart = async (formData: any) => {
  try {
    const res = await fetch(`/api/common/cart/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in Add product to cart (service) =>', error);
  }
}

export const get_all_cart_Items = async (id: any) => {
  try {
    const res = await fetch(`/api/common/cart/get-cart-items?id=${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting all cart Item for specific User (service) =>', error)
  }
}


export const delete_a_cart_item = async (id: string) => {
  try {
    const res = await fetch(`/api/common/cart/remove-from-cart?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    })

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in deleting Categories (service) =>', error)
  }
}
