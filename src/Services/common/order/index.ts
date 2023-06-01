
import Cookies from "js-cookie";

export const create_a_new_order = async (formData: any) => {
  try {
    const res = await fetch(`/api/common/order/create-order`, {
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
    console.log('Error in creating Order (service) =>', error);
  }
}



export const get_all_orders_of_user = async (id: any) => {
  try {
    const res = await fetch(`/api/common/order/view-order?id=${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting all orders Item for specific User (service) =>', error)
  }
}