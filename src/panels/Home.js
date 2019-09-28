import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Home.css';


const Home = ({ foodAreas }) => (
	<React.Fragment>
		<header className="Home__header">
			<h1 className="Home__head">ТРЦ "Им.Пыжикова"</h1>
			<Link to="/edit" className="Home__change-tz">
				Ch
			</Link>
		</header>
		<ul className="Home__tabs">
			<li className="Home__tab Home__tab_active">
				Еда
			</li>
			<li className="Home__tab Home__tab_disabled">
				Развлечения
			</li>
			<li className="Home__tab Home__tab_disabled">
				Здоровье
			</li>
		</ul>
		<ul>
			{foodAreas.map((area) => (
				<li
					key={area.id}
				>
					<h2>{area.name}</h2>
					<ul>
						{area.items.map(item => (
							<li 
								key={item.id}
							>
								<Link
									to={item.link}
								>
									<h3>{item.name}</h3>
								</Link>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	</React.Fragment>
);

Home.propTypes = {
	foodAreas: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		items: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			description: PropTypes.string,
			url: PropTypes.string,
		})),
	})),
};

Home.defaultProps = {
	foodAreas: [],
};

export default Home;
