const host = "http://localhost:5000";
const getProducts=async ()=>{
    fetch(`${host}/api/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response)=>response.json()).
      then((json)=>{
        console.log(json)
        return json
      });
}

export {getProducts};