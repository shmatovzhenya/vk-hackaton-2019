import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './panels/Home';
import Place from './panels/Place';


const FOOD_AREAS = [{
	id: 'chizhova-gallery',
	name: 'Галерея Чижова',
	items: [{
		id: 'macdac',
		name: 'MacDonalds',
		link: '/place/chizhova-gallery/mac-dac',
		description: 'Фастфуд',
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
		link: '/place/chizhova-gallery/burger-king',
		description: 'Фастфуд',
		foods: [{
			id: 'vopper',
			name: 'Воппер',
			price: 150,
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
