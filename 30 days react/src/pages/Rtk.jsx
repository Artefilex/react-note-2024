
import {
  useGetAllProductsQuery,
  useGetProductQuery,
} from "../featuers/apiCallsRtk";

function Rtk() {

  const { data: allProductsData } = useGetAllProductsQuery();
  // const {data: allProductsData ,error ,isError , isLoading} = useGetAllProductsQuery()
  const { data: singelProductData } = useGetProductQuery("iphone");

  console.log("allProductsData", allProductsData);
  console.log("singelProductData", singelProductData);
  
  
  return <div></div>;
}

export default Rtk;
