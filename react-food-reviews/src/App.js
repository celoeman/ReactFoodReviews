import './App.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons'; // Pizza Icon in headers
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Plus icon for forms (bottom right side of document);

function App(props) {
  const [open, setOpen] = useState(false);
  const [currentRestaurantOpen, setCurrentRestaurantOpen] = useState("");
  const [rightSide, setRightSide] = useState(false);
  const [value, setValue] = useState({
    restaurant: "",
    city: "",
    state: "",
    rating: "",
    description: "",
    ratingCounter: 0,
    reviews: [],
    image: "food.png"
  });
  const [revRestaurant, setRevRestaurant] = useState("Dunderbaks");
  const [reviewValue, setReviewValue] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [restaurant, setRestaurant] = useState([
    {
    restaurant: "Dunderbaks",
    city: "Tampa",
    state: "FL",
    rating: "5.0",
    description: "A German themed restaurant with amazing German food.",
    ratingCounter: 0,
    reviews: ["Potatoes, served 13 different ways. If you're starch and beer deficient, come here!", "Best place to watch the World Cup"],
    image: "dunderbaks.jpg"
    },
    {
    restaurant: "Portillos",
    city: "Tampa",
    state: "FL",
    rating: "4.6",
    description: "Old school Chicago vibes with the best hot dogs.",
    ratingCounter: 0,
    reviews: ["Cashier was a little rude, but that Chocolate cake thooo:)", "Love the atmosphere"],
    image: "portillos.jpg"
    },
    {
    restaurant: "Simply Phó",
    city: "Oldsmar",
    state: "FL",
    rating: "5.0",
    description: "Best. Soup. Ever.",
    ratingCounter: 0,
    reviews: ["soup was perfect, hands down the best Pho yet", "If you're on edge, get the egg rolls and the krab rangoon"],
    image: "simplypho.jpg"
    }
  ]);

// AddItemOpen is for the button in the bottom right cornere - allows the forms to appear;

  function AddItemOpen(x) {
    if (x === false) {
      document.getElementById("addItem_main").style.width = "400px";
      document.getElementById("addItem_main").style.height = "400px";
      document.getElementById("addItem_main").style.borderRadius = "20px 20px 75px 20px";
      document.getElementById("plusIcon").style.transform = "rotate(45deg) translate(-75%, -5%)";
      setOpen(true);
    } else {
      document.getElementById("addItem_main").style.width = "75px";
      document.getElementById("addItem_main").style.height = "75px";
      document.getElementById("addItem_main").style.borderRadius = "75px";
      document.getElementById("plusIcon").style.transform = "rotate(0deg) translate(-50%, -50%)";
      setOpen(false);
    }
  }

// RightSideShow brings up the right column where restaurant reviews/info are listed;

  function rightSideShow(x, restaurant) {
    if (x === false && currentRestaurantOpen === "") {
      document.getElementById("main").style.gridTemplateColumns = "60% auto";
      document.getElementById("rightMain").style.display = "block";
      setCurrentRestaurantOpen(restaurant);
      setRightSide(true);
    } else if (x === true && currentRestaurantOpen === restaurant){
      document.getElementById("main").style.gridTemplateColumns = "100%";
      document.getElementById("rightMain").style.display = "none";
      setCurrentRestaurantOpen("");
      setRightSide(false);
    } else if (x === true && currentRestaurantOpen !== restaurant) {
      setCurrentRestaurantOpen(restaurant);
    }
  }

// SwitchForm allows you to switch between add restaurant form, and add review form;

  function switchForm(x) {
    if (x == "left") {
      document.getElementById("pickFormLeft").style.width = "60%";
      document.getElementById("pickFormLeft").style.background = "rgb(255, 204, 110)";
      document.getElementById("pickFormRight").style.width = "40%";
      document.getElementById("pickFormRight").style.background = "rgb(209, 135,0,1)";
      document.getElementById("addItem_formLeft").style.display = "block";
      document.getElementById("addItem_formRight").style.display = "none";
    } else {
      document.getElementById("pickFormRight").style.width = "60%";
      document.getElementById("pickFormRight").style.background = "rgb(255, 204, 110)";
      document.getElementById("pickFormLeft").style.width = "40%";
      document.getElementById("pickFormLeft").style.background = "rgb(209, 135,0,1)";
      document.getElementById("addItem_formLeft").style.display = "none";
      document.getElementById("addItem_formRight").style.display = "block";
    }
  }

// This handleChange updates the value before it's added to the restaurant state;

  const handleChange = (e) => {
    setValue(prevState => {
      return { ...prevState, [e.target.id]: e.target.value}
    });
  }

// This addRest adds a new restaurant to the restaurant state;

  const addRest = (x) => {
    const newRest = [...restaurant, x];
    setRestaurant(newRest);
    setValue({
      restaurant: "",
      city: "",
      state: "",
      rating: "",
      description: "",
      ratingCounter: 0,
      reviews: [],
      image: "food.png"
    });
  }

// a and b below correspost the the second form (Add Review / #addItem_formRight);
// they update the reviewValue and revRestaurant before it's pushed (addReview) to the reviews array inside restaurants;

  const a = (e) => {
    setReviewValue(e.target.value);
  }

  const b = (e) => {
    setRevRestaurant(e.target.value);
  }

// This adds a review to the restaurant, please note the functions a and b above for further context;
// Adds a review to the review array inside restaurants;

  const addReview = (x) => {
    restaurant.map(x => {
      if (x.restaurant === revRestaurant) {
        let updatedReviews = [...x.reviews, reviewValue];
        x.reviews = updatedReviews;
        rightSideShow(rightSide, x.restaurant);
        setRevRestaurant("Dunderbaks");
        setReviewValue("");
        AddItemOpen(true);
      }
    });
  }

// JSX

  return (

    <div className="App">
      <header className="App-header">
        <div id="title">
          <FontAwesomeIcon
            className="pizzaIcon"
            icon={faPizzaSlice}
          />
          <h1>Eman's Food Reviews</h1>
        </div>
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Lets Eat!"
          autocomplete="off"
        >
        </input>
      </header>
      <div
        id="addItem"
        onClick={() => AddItemOpen(open)}
      >
        <FontAwesomeIcon
          id="plusIcon"
          className="plusIcon"
          icon={faPlus}
        />
      </div>
      <div id="addItem_main">
        <div id="pickForm">
          <div id="pickFormLeft" onClick={() => switchForm('left')}>Add Restaurant</div>
          <div id="pickFormRight" onClick={() => switchForm('right')}>Add Review</div>
        </div>
        <form
          id="addItem_formLeft"
          autocomplete="off">
          <input
            id="restaurant"
            type="text"
            name="restaurant"
            placeholder="restaurant"
            style={{width:"70%", float:"left", marginLeft: "20px"}}
            value={value.restaurant}
            onChange={handleChange}
          ></input>
          <input
            id="rating"
            type="number"
            name="rating"
            placeholder="5"
            style={{width:"15%", float:"left", clear: "right", marginLeft: "20px"}}
            value={value.rating}
            onChange={handleChange}
          ></input><br></br>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="city"
            style={{marginTop: "30px"}}
            value={value.city}
            onChange={handleChange}
          ></input><br></br>
          <input
            id="state"
            type="text"
            name="state"
            placeholder="state"
            value={value.state}
            onChange={handleChange}
          ></input><br></br>
          <textarea
            id="description"
            type="text"
            name="description"
            placeholder="description"
            style={{height: "100px", resize: "none"}}
            value={value.description}
            onChange={handleChange}
          ></textarea><br></br>
          <input
            id="leftSubmit"
            type="button"
            value="submit"
            style={{width: "50%"}}
            onClick={() => addRest(value)}
          ></input>
        </form>
        <form id="addItem_formRight">
          <select
            id="revRestaurantSelected"
            name="revRestaurantSelected"
            value={revRestaurant}
            onChange={b}
          >
          {
            restaurant.map(x => {
              return(<option value={x.restaurant}>{x.restaurant}</option>);
            })
          }
          </select><br></br>
          <textarea
            id="revRestaurant"
            type="text"
            name="revRestaurant"
            placeholder="Restaurant"
            style={{height: "200px", resize: "none"}}
            value={reviewValue}
            onChange={a}
          ></textarea><br></br>
          <input
            id="rightSubmit"
            type="button"
            value="submit"
            style={{width: "50%"}}
            onClick={() => addReview(reviewValue)}
          ></input>
        </form>
      </div>
      <div id="main">
        <div id="leftMain">

          <div id="restaurants_container">

            {restaurant.map(x => {
              return(
                <div className="restaurant_main" onClick={() => rightSideShow(rightSide, x.restaurant)}>
                  <img className="restaurant_img" src={x.image} alt="rest"></img>
                  <div className="restaurant_details">
                    <div className="restaurant_row1">
                      <div className="restaurant_title">{x.restaurant}</div>
                      <div className="restaurant_rating">{x.rating}</div>
                    </div>
                    <div className="restaurant_row2">
                      <div className="restaurant_location"><i>{x.city}, {x.state}</i></div>
                      <div className="restaurant_description">{x.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
        <div id="rightMain">
          <div className="review_title">{currentRestaurantOpen}</div>
          <div className="review_row1">
            <div className="restaurant_img2">
            {
              restaurant.map(x => {
                if (x.restaurant === currentRestaurantOpen) {
                  return (
                    <img className="side_image" src={x.image} alt="rest"></img>
                  );
                }
              })
            }
            </div>
            <div className="review_details">
            {
              restaurant.map(x => {
                if (x.restaurant === currentRestaurantOpen) {
                  return (
                    <div>
                      <div className="review_bubbles"><p style={{fontWeight: "900", display:"inline"}}>City:</p> {x.city}</div><br></br>
                      <div className="review_bubbles"><p style={{fontWeight: "900", display:"inline"}}>State:</p> {x.state}</div><br></br>
                      <div className="review_bubbles"><p style={{fontWeight: "900", display:"inline"}}>Rating:</p> {x.rating}</div><br></br>
                      <div className="review_bubbles"><p style={{fontWeight: "900", display:"inline"}}>Info:</p> {x.description}</div>
                    </div>
                  );
                }
              })
            }
            </div>
          </div>

          <div>
          {
            restaurant.map(x => {
              if (x.restaurant === currentRestaurantOpen) {
                return(
                  <div>
                    {
                      x.reviews.map(y => {
                        return(<div class="review_output">{y}</div>)
                      })
                    }
                  </div>
                )
              }
            })
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
