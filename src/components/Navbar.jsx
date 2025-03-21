import React, { useContext, useState } from 'react';
import './nav.css';
import { IoIosHeartEmpty } from 'react-icons/io';
import { BsCart3 } from 'react-icons/bs';
import { UserContext } from '../context/UserContext';
import { GoPerson } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';
import { LuShoppingBag } from 'react-icons/lu';
import { MdOutlineCancel } from 'react-icons/md';
import { FaRegStar } from 'react-icons/fa6';
import { TbLogout2 } from 'react-icons/tb';
import axios from 'axios';

function Navbar() {
  const { currentUser, logOut } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const count = currentUser?.cart?.reduce((acc, item) => acc + item.quantity, 0);
  const fav = currentUser?.wishlist?.length;
  const location = useLocation();
  const currentPath = location.pathname;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
      setSearchResults(response.data.products);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <nav className="navbar navbar-expand-lg py-4">
        <div className="container">
          <a className="navbar-brand fw-bold">Exclusive</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <Link
                  className={`${
                    currentPath === '/home' ? 'active border-2 border-bottom' : ''
                  } nav-link  pb-0`}
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className={`${
                    currentPath === '/contact' ? 'active border-2 border-bottom' : ''
                  } nav-link  pb-0`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className={`${
                    currentPath === '/about' ? 'active border-2 border-bottom' : ''
                  } nav-link  pb-0`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className={`${
                    currentPath === '/register' ? 'active border-2 border-bottom' : ''
                  } nav-link  pb-0`}
                  to="/register"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <form className="search-nav me-4">
                <input
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <i className="fa-solid fa-magnifying-glass"></i>
                {searchResults.length > 0 && (
                  <ul className="search-dropdown">
                    {searchResults.map((product) => (
                      <Link to={`/product-details/${product.id}`} key={product.id}>
                        <li>{product.title}</li>
                      </Link>
                    ))}
                  </ul>
                )}
              </form>
              <div className="nav-icons">
                {currentUser && (
                  <div className="position-relative">
                    {fav === 0 || fav === undefined ? (
                      ''
                    ) : (
                      <span className="nav-count-items">{fav}</span>
                    )}
                    <Link to="/wishlist">
                      <IoIosHeartEmpty className="fs-4 text-black" />
                    </Link>
                  </div>
                )}
                {currentUser && (
                  <div className="position-relative">
                    {count === 0 || count === undefined ? (
                      ''
                    ) : (
                      <span className="nav-count-items">{count}</span>
                    )}
                    <Link to="/cart">
                      <BsCart3 className="fs-4 text-black" />
                    </Link>
                  </div>
                )}
                {currentUser && (
                  <div className="dropdown-container">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                      <GoPerson className="fs-4 text-black" />
                    </button>
                    <div className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
                      <Link to="/account" className="dropdown-item" onClick={toggleDropdown}>
                        <GoPerson className="fs-4 me-2" /> Manage My Account
                      </Link>
                      <Link to="/cart" className="dropdown-item" onClick={toggleDropdown}>
                        <LuShoppingBag className="fs-4 me-2" /> My Order
                      </Link>
                      <a href="#/action-3" className="dropdown-item" onClick={toggleDropdown}>
                        <MdOutlineCancel className="fs-4 me-2" /> My Cancellations
                      </a>
                      <a href="#/action-2" className="dropdown-item" onClick={toggleDropdown}>
                        <FaRegStar className="fs-4 me-2" /> My Reviews
                      </a>
                      <a className="dropdown-item" onClick={logOut} >
                        <TbLogout2 className="fs-4 me-2" /> Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
