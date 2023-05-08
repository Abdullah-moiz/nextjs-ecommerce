

import Cookies from "js-cookie";


export const get_all_categories = async () => {
  try {
    const res = await fetch('/api/Admin/category/getCategory', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    console.log(res)
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting all Categories (service) =>', error)
  }
}



export const delete_a_category = async (id:string) => {
  try {
    const res = await fetch(`/api/Admin/category/delete-category?id=${id}`, {
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


export const update_a_category = async (formData : any) => {
  try {
    const res = await fetch(`/api/Admin/category/update-category`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in deleting Categories (service) =>', error)
  }
}



