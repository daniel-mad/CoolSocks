import React, { useState, useEffect } from 'react';
import Modal from './../../components/Modal';
import FormInput from './../../components/Forms/FormInput';
import FormSelect from './../../components/Forms/FormSelect';
import Button from './../../components/Forms/Button';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductStart,
  deleteProductStart,
  fetchProductsStart,
} from '../../features/Products/productsSlice';

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Admin = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();

  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('mens');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  const resetForm = () => {
    setProductCategory('mens');
    setProductName('');
    setProductThumbnail('');
    setProductPrice(0);
    setHideModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
      })
    );
    resetForm();
  };

  return (
    <div className='admin'>
      <div className='callToActions'>
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add new product</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className='addNewProductForm'>
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>

            <FormSelect
              label='Category'
              options={[
                {
                  value: 'mens',
                  name: 'Mens',
                },
                {
                  value: 'womens',
                  name: 'Womens',
                },
              ]}
              onChange={(e) => setProductCategory(e.target.value)}
            />

            <FormInput
              label='Name'
              type='text'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <FormInput
              label='Main image URL'
              type='url'
              value={productThumbnail}
              onChange={(e) => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label='Price'
              type='number'
              min='0.00'
              max='10000.00'
              step='0.01'
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />

            <Button type='submit'>Add product</Button>
          </form>
        </div>
      </Modal>

      <div className='manageProducts'>
        <table border='0' cellPadding='10' cellSpacing='10'>
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className='results'
                  border='0'
                  cellPadding='10'
                  cellSpacing='0'
                >
                  <tbody>
                    {products.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        documentID,
                      } = product;
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              className='thumb'
                              src={productThumbnail}
                              alt={productName}
                            />
                          </td>
                          <td>{productName}</td>
                          <td>${productPrice}</td>
                          <td>
                            <Button
                              onClick={() =>
                                dispatch(deleteProductStart({ documentID }))
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
