import './index.css'
import PrimeDealSection from '../../components/PrimeDealSection/PrimeDealSection'
import AllProductSection from '../../components/AllProductSection/AllProductSection'

const Product = () => {
  return (
      <div className="product-sections">
      <PrimeDealSection />
      <AllProductSection /> 
     </div>
  );
}

export default Product;
