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
            key={food.id}
          >
            <h3>{food.name}</h3>
            {food.id in order ? (
              <React.Fragment>
                <button
                  onClick={() => {
                    onDecrementPosition({ id: food.id });
                  }}
                >
                  -
                </button>
                <span>{order[food.id].count}</span>
              </React.Fragment>
            ) : (
              <span>0</span>
            )}
            <button
              onClick={() => {
                onIncrementPosition({ id: food.id });
              }}
            >
              +
            </button>
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
