import React from 'react';
// import PropTypes from 'prop-types';


const Place = ({ item, order, onIncrementPosition, onDecrementPosition }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <ul>
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
