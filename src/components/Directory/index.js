import React from 'react';
import ShopMen from '../../assets/shopMen.jpeg';
import ShopWomen from '../../assets/shopWomen.jpg';
import './styles.scss';
function Directory() {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${ShopWomen})` }}>
          <a>Shop Womens</a>
        </div>
        <div className="item" style={{ backgroundImage: `url(${ShopMen})` }}>
          <a>Shop Mens</a>
        </div>
      </div>
    </div>
  );
}

export default Directory;
