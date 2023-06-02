

import Cookies from "js-cookie";


export const get_all_orders = async () => {
  try {
    const res = await fetch('/api/Admin/order/get-all-order-data', {
      method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting all orders (service) =>', error)
  }
}



export const update_order_status = async (id : any) => {
  console.log(id)
  try {
    const res = await fetch(`/api/Admin/order/update-order-status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id),
    })

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in updating order status (service) =>', error)
  }
}

