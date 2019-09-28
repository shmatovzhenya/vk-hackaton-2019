import React, { useMemo } from 'react';
import { withRouter, Link } from 'react-router-dom';
import accounting from 'accounting';

import './place.css';


const Basket = ({ match: { params: { areaId, itemId }}, foodAreas, order }) => {
  const area = foodAreas.filter(area => area.id === areaId)[0];
  const item = area.items.filter(item => item.id === itemId)[0];

  const [ price, products ] = useMemo(() => {
    const foodIds = new Set((item.foods || []).map(item => item.id));

    const products = Object.values(order)
      .filter((value) => {
        const { item: { id }} = value;

        return foodIds.has(id);
      })

    const result = products.reduce((result, value) => {
        const { count, item } = value;

        return result + parseInt(item.price) * parseInt(count);
      }, 0);

    return [ accounting.formatNumber(result, 0, ' '), products ];
  }, [ order, item ]);
  console.log({ price, products });

  return (
    <div className="Place">
      <header className="Place__header">
        <aside className="Place__trz">
          <h1 className="Place__head">
            <Link to="/" className="Place__logo">
              {area.name}
            </Link>
          </h1>
          <Link to="/edit" className="Place__change-tz">
            Ch
          </Link>
        </aside>
      </header>
      <aside className="Place__restoraunt">
        <img
          className="Place__restoraunt-logo"
          alt="Fastfood logo"
          src={item.image}
        />
        <h2
          className="Place__restoraunt-name"
        >
          {item.name}
        </h2>
        <p className="Place__restoraunt-type">
          {item.description}
        </p>
      </aside>
      <ul className="Place__products">
        {products.map(({ item, count }) => (
          <li
            className="Place__product"
            key={item.id}
          >
            <img
              className="Place__product-logo"
              alt="Ordered product logo"
              src={item.image}
            />
            <h3
              className="Place__product-name"
            >
              {item.name}
            </h3>
            <p
              className="Place__product-price"
            >
              Цена: {item.price}
            </p>
            <p
              className="Place__product-count"
            >
              x{count}
            </p>
          </li>
        ))}
      </ul>
      <footer className="Place__footer">
        <Link to={`/basket/${area.id}/${item.id}`} className="Place__order">
          Оформить заказ ({price})
        </Link>
      </footer>
    </div>
  );
};

export default withRouter(Basket);
