import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import data from '../data.json';

class Navbar extends Component {
	componentDidMount () {
		this.hamburgerMenu();
	};
	hamburgerMenu() {
		// Get all "navbar-burger" elements
		var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
		
		// Check if there are any navbar burgers
		if ($navbarBurgers.length > 0) {
		
			// Add a click event on each of them
			$navbarBurgers.forEach(function ($el) {
				$el.addEventListener('click', () => {
			
					// Get the target from the "data-target" attribute
					var target = $el.dataset.target;
					var $target = document.getElementById(target);
			
					// Toggle the class on both the "navbar-burger" and the "navbar-menu"
					$el.classList.toggle('is-active');
					$target.classList.toggle('is-active');
			
				});
			});
		}
	};
	render() {
		return (
			<nav className="navbar is-fixed-top">
				<div className="navbar-brand">
					<Link to='/' className='navbar-item'>{data.site.title}</Link>
					<div className="navbar-burger burger" data-target="navbar-content">
					<span></span>
					<span></span>
					<span></span>
					</div>
				</div>
				<div id="navbar-content" className="navbar-menu">
					<div className="navbar-start">
						<Link to='/about' className="navbar-item">About</Link>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
