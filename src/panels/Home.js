import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Home = ({ foodAreas }) => (
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
