import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import refresh from '../img/refresh-button.svg';
import './orders.css';


const Orders = ({ order, orderStatuses, foodAreas, onChangeOrderStatus, onRepeatPreviousOrder }) => {
  const activeOrders = useMemo(() => {
    const activeOrdersList = Object.keys(orderStatuses)
      .filter(shopId => orderStatuses[shopId] === 'ACTIVE')
      .map(shopId => shopId);

    const result = [];
    const activeOrdersSet = new Set(activeOrdersList);

    foodAreas.forEach((area) => {
      area.items.forEach(item => {
        if (activeOrdersSet.has(item.id)) {
          const data = {
            placeName: area.name,
            shopName: item.name,
            price: item.foods.reduce((result, food) => {
              if (food.id in order) {
                const { item: { price }, count } = order[food.id];

                return result + parseInt(price) * parseInt(count);
              }

              return result;
            }, 0),
            link: `/order/${area.id}/${item.id}`,
          };

          result.push(data);
        }
      });
    });

    return result;
  }, [ order, orderStatuses ]);

  const finishedOrders = useMemo(() => {
    const activeOrdersList = Object.keys(orderStatuses)
      .filter(shopId => orderStatuses[shopId] !== 'ACTIVE')
      .map(shopId => shopId);

    const result = [];
    const activeOrdersSet = new Set(activeOrdersList);

    foodAreas.forEach((area) => {
      area.items.forEach(item => {
        if (activeOrdersSet.has(item.id)) {
          const data = {
            placeName: area.name,
            shopName: item.name,
            price: item.foods.reduce((result, food) => {
              if (food.id in order) {
                const { item: { price }, count } = order[food.id];

                return result + parseInt(price) * parseInt(count);
              }

              return result;
            }, 0),
            link: `/order/${area.id}/${item.id}`,
          };

          result.push(data);
        }
      });
    });

    return result;
  }, [ order, orderStatuses ]);

  console.log({ order, orderStatuses, foodAreas, activeOrders });
  return (
    <div className="Orders">
      <ul className="Orders__active-orders">
        {activeOrders.map(order => (
          <li
            className="Orders__active-order"
            key={order.link}
          >
            <div>
              <h3>{order.placeName}</h3>
              <p>{order.shopName}</p>
              <p>Сумма {order.price} - Оплачено</p>
            </div>
            <div>
              ~ 15 М
            </div>
          </li>
        ))}
      </ul>
      <ul className="Orders__finished-orders">
        {finishedOrders.map(order => (
          <li
            className="Orders__finished-order"
            key={order.link}
          >
            <div>
              <h3>{order.placeName}</h3>
              <p>{order.shopName}</p>
              <p>Сумма {order.price} - Оплачено</p>
            </div>
            <button>
              <img
                alt="repeat order"
                src={refresh}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Orders.defaultProps = {
  changeOrderStatus: () => {},
  onRepeatPreviousOrder: () => {},
};

export default Orders;
