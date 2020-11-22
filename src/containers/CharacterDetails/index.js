import React, { useEffect, useState } from "react";
import { Collapse, Divider, Skeleton, List, Affix } from "antd";

import "./styles.scss";
import http from "../../utils/http";
import { Link, useHistory, useLocation } from "react-router-dom";
import SliderSection from "../../components/SliderSection";
import { placeholderImage } from "../../constants/global";
const { Panel } = Collapse;

const CharacterDetails = () => {
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState(null);
  const location = useLocation();
  const thumbnail = !character
    ? ""
    : `${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`;
  const history = useHistory();

  useEffect(() => {
    let characterID = location.pathname.match(/\d*$/)[0];
    getCharacter(characterID);
  }, []);

  const getCharacter = async (characterID) => {
    const { data } = await http.get(`characters/${characterID}`);
    if (data.code && data.code === 404) {
      history.push(`/not-found`);
    } else {
      setCharacter(data);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="character-detail">
        <Skeleton active avatar paragraph={{ rows: 10 }} />
      </div>
    );
  return (
    <div className="character-detail-page">
      <Affix offsetTop={20}>
        <p className="character-name">{character.name}</p>
      </Affix>
      <div className="content">
        <div className="sider">
          <Affix offsetTop={60}>
            <img
              className="character-thumbnail"
              src={thumbnail}
              alt="character thumbnail"
            />
          </Affix>
        </div>
        <div className="main-content">
          <Collapse
            defaultActiveKey={["description", "comics", "stories"]}
            ghost
          >
            <Panel header="Description" key="description">
              <p className="description">{character.description}</p>
            </Panel>
            <Divider className="section-divider" />
            <Panel header="Comics" key="comics">
              <SliderSection
                clickable={true}
                items={character.comics.map((comic) => {
                  const mappedComic = { ...comic };
                  mappedComic.description = comic.title;
                  mappedComic.link = `/comics/${comic.id}`;
                  return mappedComic;
                })}
              />
            </Panel>
            <Panel header="Stories" key="stories">
              <List
                itemLayout="horizontal"
                dataSource={character.stories}
                renderItem={(item, i) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <img
                          src={
                            item.thumbnail
                              ? `${item.thumbnail}portrait_small.jpg`
                              : `${placeholderImage}portrait_small.jpg`
                          }
                          alt={`story-${i}`}
                        />
                      }
                      title={
                        <Link to={`/stories/${item.id}`}>{item.title}</Link>
                      }
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
