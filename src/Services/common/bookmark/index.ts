
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