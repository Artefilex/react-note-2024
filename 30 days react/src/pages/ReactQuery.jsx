// https://dummyjson.com/
import { useQuery, useMutation } from "@tanstack/react-query";
function ReactQuery() {
   const fetchProducts = async () =>{
    const response = await fetch("https://dummyjson.com/products")
    return response.json() 
   } 
  
    const { data, status, error ,isLoading } = useQuery( 
    {
     queryKey: ["products"],
    queryFn: fetchProducts,
    refetchInterval : 5000,
}
    );

  const {mutate} = useMutation({mutationFn:(newProduct) => fetch("https://dummyjson.com/products", {
    method:"POST",
    body: JSON.stringify(newProduct),
    headers: {"Content-type" : "application/json"}
  }).then((res)=> res.json() )
})

  console.log(data, status, error ,isLoading);
  return (
  <div>
      <div>
      {status ==="success" &&
        data?.products.map((product) => <div key={product.id}> {product.title} </div>)}
    </div>
    <button onClick={() =>   mutate({
        "id": 31,
        "title": "iPhone 9",
        "description": "An apple mobile which is nothing like apple",
        "price": 549,
        "discountPercentage": 12.96,
        "rating": 4.69,
        "stock": 94,
        "brand": "Apple",
        "category": "smartphones",
        "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
        "images": [
        "https://cdn.dummyjson.com/product-images/1/1.jpg",
        "https://cdn.dummyjson.com/product-images/1/2.jpg",
        "https://cdn.dummyjson.com/product-images/1/3.jpg",
        "https://cdn.dummyjson.com/product-images/1/4.jpg",
        "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
        ]

    })}>
         add new data 
    </button>
  </div>
  );
}

export default ReactQuery;
