import Cookies from "js-cookie";

export const add_new_category = async (formData : any) => {
    
    try {
        const res = await fetch(`/api/Admin/category/add-category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in Add New Category (service) => ', error);
    }
}
