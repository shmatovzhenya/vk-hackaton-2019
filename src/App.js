import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './panels/Home';
import Place from './panels/Place';

import './panels/App.css';
import kfc from './img/kfc.png';
import burger from './img/burger.png';
import mcdac from './img/mcdac.png';
import sub from './img/sub.png';
import OneTowar from './img/1.png';
import TwoTowar from './img/2.png';
import ThreeTowar from './img/3.png';
import FourTowar from './img/4.png';


const FOOD_AREAS = [{
	id: 'pizikiva-gallery',
	name: 'ТРЦ "Им.Пыжикова"',
	items: [{
		id: 'kfc',
		name: 'KFC',
		link: '/place/pizikiva-gallery/kfc',
		description: 'Сеть ресторанов быстрого питания',
		image: kfc,
		foods: [{
			id: 'hamburger',
			name: 'Гамбургер',
			price: 50,
		}, {
			id: 'bigmac',
			name: 'Биг мак',
			price: 200,
		}],
	}, {
		id: 'burger-king',
		name: 'Burger King',
		link: '/place/pizikiva-gallery/burger-king',
		description: 'Сеть ресторанов быстрого питания',
		image: burger,
		foods: [{
			id: 'OneTowar',
			name: 'Товар № 1',
			composition: 'Состав: по ГОСТу',
			price: 630,
			image: OneTowar,
		}],
	}, {
		id: 'macdac',
		name: 'McDonal\'s',
		link: '/place/pizikiva-gallery/macdac',
		description: 'Сеть ресторанов быстрого питания',
		image: mcdac,
		foods: [{
			id: 'hamburger',
			name: 'Гамбургер',
			price: 50,
		}, {
			id: 'bigmac',
			name: 'Биг мак',
			price: 200,
		}],
	}, {
		id: 'subway',
		name: 'SubWay',
		link: '/place/pizikiva-gallery/subway',
		image: sub,
		description: 'Сеть ресторанов быстрого питания',
		foods: [{
		}],
	}],
}];

const placesMap = FOOD_AREAS.reduce((result, area) => {
	area.items.forEach(item => {
		result[item.link] = item;
	});

	return result;
}, {});

const foodsMap = FOOD_AREAS.reduce((result, area) => {
	area.items.forEach(item => {
		item.foods.forEach(food => {
			result[food.id] = food;
		});
	});

	return result;
}, {});

const App = () => {
	const [ order, setOrder ] = useState({});

	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Home foodAreas={FOOD_AREAS} />
				</Route>
				<Route 
					path="/place/:area/:place"
					render={routeProps => {
						return (
							<Place
								{...routeProps}
								item={placesMap[routeProps.location.pathname]}
								area={FOOD_AREAS[0]}
								order={order}
								onIncrementPosition={({ id }) => {
									const updatedOrder = {...order};

									if (id in updatedOrder) {
										updatedOrder[id].count++;
									} else {
										updatedOrder[id] = {
											item: foodsMap[id],
											count: 1,
										};
									}

									setOrder(updatedOrder);
								}}
								onDecrementPosition={({ id }) => {
									const updatedOrder = {...order};

									if (id in updatedOrder) {
										if (updatedOrder[id].count === 1) {
											delete updatedOrder[id];
										} else {
											updatedOrder[id].count--;
										}
									}

									setOrder(updatedOrder);
								}}
							/>
						);
					}}
				/>
			</Switch>
		</Router>
	);
}

export default App;
