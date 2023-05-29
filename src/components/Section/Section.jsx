import React, { useState, useEffect } from "react";
import "./Section.css";

const App = () => {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://randomuser.me/api?results=50");
      const { results } = await res.json();
      setUserList(results);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  const filteredList = userList.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`;
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={darkMode ? "container dark-mode" : "container"}>
      <header className="header">
        <h4 className="title">Search by name and/or location</h4>
        <input
          type="text"
          id="filter"
          placeholder="Search"
          onChange={handleSearch}
        />
      </header>

      <ul className="user-list">
        {filteredList.length > 0 ? (
          filteredList.map((user, index) => (
            <li key={index}>
              <img src={user.picture.large} alt={user.name.first} />
              <div className="user-info">
                <h4>{`${user.name.first} ${user.name.last}`}</h4>
                <p>{`${user.location.city}, ${user.location.country}`}</p>
              </div>
            </li>
          ))
        ) : (
          <li>
            <h3>Loading...</h3>
          </li>
        )}
      </ul>

      <div className="toggler-container">
        <input type="checkbox" id="switch" onChange={handleToggle} />
        <label htmlFor="switch"></label>
      </div>
    </div>
  );
};

export default App;