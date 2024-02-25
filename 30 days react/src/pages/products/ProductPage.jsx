import { Link } from "react-router-dom";
import { productData } from "../../mock/ProductsData";
function ProductPage() {
  return <div>
    {
        productData.map((product)=>(
            <Link key={product.id}  to={`/products/${product.url}`} > {product.title} </Link> 
        ))
    }
  </div>;
}

export default ProductPage;
