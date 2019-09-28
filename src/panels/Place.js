import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './place.css';


const Place = ({ item, order, onIncrementPosition, onDecrementPosition, area }) => {
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
      </header>
      <ul className="Place__foods">
        {item.foods.map((food => (
          <li
            className="Place__food"
            key={food.id}
          >
            <div className="Place__food-logo-wrapper">
              <img
                alt="food logo"
                className="Place__food-logo"
                src={food.image}
              />
            </div>
            <h3 className="Place__food-name">
              {food.name}
            </h3>
            <p className="Place__food-composition">
              {food.composition}
            </p>
            <div className="Place__food-price">
              <span>Цена: {food.price}&nbsp;&nbsp;&nbsp;</span>
              <button
                className="Place__foot-button"
                onClick={() => {
                  onDecrementPosition({ id: food.id });
                }}
              >
                -
              </button>
              <span>&nbsp;{food.id in order ? order[food.id].count : 0}&nbsp;</span>
              <button
                className="Place__foot-button"
                onClick={() => {
                  onIncrementPosition({ id: food.id });
                }}
              >
                +
              </button>
            </div>
          </li>
        )))}
      </ul>
    </div>
  );
};

Place.defaultProps = {
  item: {},
  onIncrementPosition: () => {},
  onDecrementPosition: () => {},
};

export default Place;
