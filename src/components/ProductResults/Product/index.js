import Button from '../../Forms/Button';
import './styles.scss';

function Product({ productPrice, productThumbnail, productName }) {
  const configAddToCartBtn = {
    type: 'button',
  };
  return (
    <div className='product'>
      <div className='product-card'>
        <div className='thumb'>
          <img src={productThumbnail} alt={productName} />
        </div>
        <div className='details'>
          <ul>
            <li>
              <span className='product-name'>{productName}</span>
            </li>
            <li>
              <span className='product-price'>${productPrice}</span>
            </li>
            <li>
              <div className='addToCart'>
                <Button {...configAddToCartBtn}>Add to Cart</Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Product;
