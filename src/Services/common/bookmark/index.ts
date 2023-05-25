
import Cookies from "js-cookie";

export const bookmark_product = async (formData: any) => {
  try {
    const res = await fetch(`/api/common/bookmark/bookmark-product`, {
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
    console.log('Error in Add product to bookmark (service) =>', error);
  }
}



export const get_all_bookmark_items = async (id: any) => {
  try {
    const res = await fetch(`/api/common/bookmark/get-bookmark-product?id=${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in getting all bookmark Item for specific User (service) =>', error)
  }
}


export const delete_a_bookmark_item = async (id: string) => {
  try {
    const res = await fetch(`/api/common/bookmark/remove-bookmark-product?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
    })

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error in deleting Bookmark Item (service) =>', error)
  }
}
