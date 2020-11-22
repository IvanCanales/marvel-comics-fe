import React, { useEffect, useState } from "react";
import { Collapse, Divider, Skeleton } from "antd";

import "./styles.scss";
import http from "../../utils/http";
import { useHistory, useLocation } from "react-router-dom";
import SliderSection from "../../components/SliderSection";
import { placeholderImage } from "../../constants/global";
const { Panel } = Collapse;

const StoryDetails = () => {
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState(null);
  const location = useLocation();
  const thumbnail =
    story && story.thumbnail
      ? `${story.thumbnail.path}/portrait_fantastic.${story.thumbnail.extension}`
      : `${placeholderImage}portrait_fantastic.jpg`;
  const history = useHistory();

  useEffect(() => {
    let storyId = location.pathname.match(/\d*$/)[0];
    getStory(storyId);
  }, []);

  const getStory = async (storyId) => {
    const { data } = await http.get(`stories/${storyId}`);
    if (data.code && data.code === 404) {
      history.push(`/not-found`);
    } else {
      setStory(data);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="story-detail">
        <Skeleton active avatar paragraph={{ rows: 10 }} />
      </div>
    );
  return (
    <div className="story-detail-page">
      <div className="content">
        <div className="sider">
          <img
            className="story-thumbnail"
            src={thumbnail}
            alt="story thumbnail"
          />
        </div>
        <div className="main-content">
          <Collapse
            defaultActiveKey={["description", "comics", "characters"]}
            ghost
          >
            <span className="section-title">Story Title</span>
            <p className="title">{story.title}</p>
            <Panel header="Description" key="description">
              <p className="description">{story.description}</p>
            </Panel>
            <Divider className="section-divider" />
            <Panel header="Comics" key="comics">
              <SliderSection
                clickable={true}
                items={story.comics.map((comic) => {
                  const mappedComic = { ...comic };
                  mappedComic.description = comic.title;
                  mappedComic.link = `/comics/${comic.id}`;
                  return mappedComic;
                })}
              />
            </Panel>
            <Panel header="Characters" key="characters">
              <SliderSection
                clickable={true}
                items={story.characters.map((character) => {
                  const mappedCharacter = { ...character };
                  mappedCharacter.description = character.title;
                  mappedCharacter.link = `/characters/${character.id}`;
                  return mappedCharacter;
                })}
              />
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
