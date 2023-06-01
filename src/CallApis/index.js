const host = "http://localhost:5000";
const getProducts = async () => {
  const response = await fetch(`${host}/api/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const prods = await response.json();
  return prods;
}
const getCategories = async () => {
  const response = await fetch(`${host}/api/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const cats = await response.json();
  return cats;
}
const getProductsofCategory = async (cat_id) => {

  const response = await fetch(`${host}/api/products/byCategory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cat_id: cat_id })
  });
  const prods = await response.json();
  return prods;
}

const deleteProduct = async (cat_id,prod_id) =>{
  const response = await fetch(`${host}/api/products/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cat_id: cat_id, prod_id:prod_id })
  });
  const deletedProduct = await response.json();
  return deletedProduct; 
}

const deleteCategory = async (cat_id) =>{
  const response = await fetch(`${host}/api/categories/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cat_id: cat_id })
  });
  const deletedProduct = await response.json();
  return deletedProduct; 
}

export { getProducts, getCategories, getProductsofCategory, deleteProduct, deleteCategory };