import React from "react";
import { Card, Divider } from "antd";
import { Link } from "react-router-dom";

import "./styles.scss";
const { Meta } = Card;

const Home = () => {
  return (
    <div className="home-page">
      <p className="title">Everything about Marvel Comics</p>
      <Divider />
      <div className="card-container">
        <Link to="/characters">
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <img
                alt="characters list card link"
                src="http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55/portrait_xlarge.jpg"
              />
            }
          >
            <Meta
              title="Characters"
              description="
                List of all Marvel Characters on every comic
                or story you can imagine.
            "
            ></Meta>
          </Card>
        </Link>
        <Link to="/comics">
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <img
                alt="comics list card link"
                src="https://i.annihil.us/u/prod/marvel/i/mg/7/20/4fabe29911979/portrait_uncanny.jpg"
              />
            }
          >
            <Meta
              title="Comics"
              description="
              List of all Marvel Comics written through
              the ages. Checkout a description comics, characters before jumping in to reading.
            "
            ></Meta>
          </Card>
        </Link>
        <Link to="/stories">
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <img
                alt="stories list card link"
                src="https://i.annihil.us/u/prod/marvel/i/mg/2/10/5faedc3ee514a/portrait_uncanny.jpg"
              />
            }
          >
            <Meta
              title="Stories"
              description="
              List of all Marvel Stories written through
              the ages. Checkout a description comics, characters to find your favorite story.
            "
            ></Meta>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Home;
