import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductsStart } from '../../features/Products/productsSlice';
import FormSelect from '../Forms/FormSelect';
import Product from './Product';
import './styles.scss';

const mapState = ({ productsData }) => ({ products: productsData.products });

function ProductResults() {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  const navigate = useNavigate();
  const { filters } = useParams();

  useEffect(() => {
    dispatch(fetchProductsStart({ filters }));
  }, [filters]);

  if (!Array.isArray(products)) return null;
  if (products.length < 1) {
    return (
      <div className='products'>
        <p>No search results.</p>
      </div>
    );
  }

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    navigate(`/search/${nextFilter}`);
  };

  const configFilters = {
    defaultValue: filters,
    options: [
      {
        name: 'Show all',
        value: '',
      },
      {
        name: 'Mens',
        value: 'mens',
      },
      {
        name: 'Womens',
        value: 'womens',
      },
    ],
    handleChange: handleFilter,
  };

  return (
    <div className='products'>
      <h1>Browse Products</h1>
      <FormSelect {...configFilters} />
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
