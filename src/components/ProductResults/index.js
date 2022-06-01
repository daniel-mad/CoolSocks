import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart } from '../../features/Products/productsSlice';
import Product from './Product';
import './styles.scss';

const mapState = ({ productsData }) => ({ products: productsData.products });

function ProductResults() {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  if (!Array.isArray(products)) return null;
  if (products.length < 1) {
    return (
      <div className='products'>
        <p>No search results.</p>
      </div>
    );
  }

  return (
    <div className='products'>
      <h1>Browse Products</h1>
      <div className='products-container'>
        {products.map((product, index) => {
          const { productPrice, productThumbnail, productName } = product;
          if (
            !productName ||
            !productThumbnail ||
            typeof productPrice === 'undefined'
          )
            return null;

          const productConfig = { productPrice, productThumbnail, productName };

          return <Product key={index} {...productConfig} />;
        })}
      </div>
    </div>
  );
}

export default ProductResults;
