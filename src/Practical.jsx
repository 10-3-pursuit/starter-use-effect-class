// We Want to
// make a call to the third party api
// store that data in state
// render that data on the page

import { useEffect, useState } from "react";

const Practical = () => {
  const [users, setUsers] = useState([]);
  const [numUsers, setNumUsers] = useState("12");
  // list out a quote of the day from a 3rd party api
  const [quote, setQuote] = useState({});

  // this function declaration has been abstracted because I will use it twice
  const getData = (num) => {
    fetch(`https://randomuser.me/api/?results=${num}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setNumUsers("");
      });
  };

  const handleChange = (e) => {
    setNumUsers(e.target.value);
  };

  // this will fetch the users with the updated numUsers variable
  const handleSubmit = (e) => {
    e.preventDefault();
    getData(numUsers);
  };

  // this useEffect will run once and store the quote in state
  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => setQuote(data));
  }, []);

  // I want to get the number of users from localStorage if that number exists - this will run one time
  useEffect(() => {
    const numGetUsers = window.localStorage.getItem("userLength") || numUsers;
    getData(JSON.parse(numGetUsers));
  }, []);

  // Each time I update the number of users, I want to store that number in localStarage - this will run every time users is updated
  useEffect(() => {
    //this is storing the number of users in the variable userLength
    window.localStorage.setItem("userLength", JSON.stringify(users.length));
  }, [users]);

  // on the first render there will be no users so the page remains blank
  if (users.length === 0) return null;

  return (
    <div className="wrapper">
      <header>
        <h1>Practical Component</h1>
        <h3>
          Quote of the Moment: {quote.content} by {quote.author}
        </h3>
      </header>
      <section className="section">
        <form onSubmit={handleSubmit}>
          <label htmlFor="numUsers">
            Number of Users:
            <input
              value={numUsers}
              onChange={handleChange}
              type="number"
              name="numUsers"
              id="numUsers"
            />
          </label>
          <button>Submit</button>
        </form>
      </section>
      <ul>
        {users.map((user, id) => (
          <li key={id}>
            <img src={user.picture.large} alt={user.username} />
            <p>
              {user.name.first} {user.name.last}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Practical;
