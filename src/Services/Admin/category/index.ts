import Cookies from "js-cookie";

export const add_new_category = async (formData: any) => {
  try {
    const res = await fetch(`/api/Admin/category/add-category`, {
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
    console.log('Error in Add New Category (service) =>', error);
  }
}

export const get_all_categories = async () => {
  try {
    const res = await fetch(`/api/Admin/category/getCategory`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    })

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