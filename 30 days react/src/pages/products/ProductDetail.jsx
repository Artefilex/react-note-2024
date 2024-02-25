import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../../mock/ProductsData";
function ProductDetail() {
const {productId} = useParams()
const [product , setProduct] = useState({})

useEffect(()=>{
  const detailData =  productData.find((singelProduct) => singelProduct.url === productId )
  setProduct(detailData)
  
  console.log(productId)
}, [productId])

console.log(product)
  return <div>{product.description}</div>;
}

export default ProductDetail;
