import React, { useEffect, useState } from "react";
import { Collapse, Divider, Skeleton, List, Affix } from "antd";

import "./styles.scss";
import http from "../../utils/http";
import { Link, useHistory, useLocation } from "react-router-dom";
import SliderSection from "../../components/SliderSection";
import { placeholderImage } from "../../constants/global";
const { Panel } = Collapse;

const ComicDetails = () => {
  const [loading, setLoading] = useState(true);
  const [comic, setComic] = useState(null);
  const location = useLocation();
  const thumbnail = !comic
    ? ""
    : `${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`;
  const history = useHistory();

  useEffect(() => {
    let comicID = location.pathname.match(/\d*$/)[0];
    getComic(comicID);
  }, []);

  const getComic = async (comicID) => {
    const { data } = await http.get(`comics/${comicID}`);
    if (data.code && data.code === 404) {
      history.push(`/not-found`);
    } else {
      setComic(data);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="comic-detail">
        <Skeleton active avatar paragraph={{ rows: 10 }} />
      </div>
    );
  return (
    <div className="comic-detail-page">
      <Affix offsetTop={20}>
        <p className="comic-name">{comic.title}</p>
      </Affix>
      <div className="content">
        <div className="sider">
          <Affix offsetTop={60}>
            <img
              className="comic-thumbnail"
              src={thumbnail}
              alt="comic thumbnail"
            />
            <div className="info">
              <span className="section-title">Information</span>
              <Divider className="section-divider" />
              <div className="info-row">
                <span className="label">Format:</span>
                <span className="value">{comic.format}</span>
              </div>
              <div className="info-row">
                <span className="label">Issue:</span>
                <span className="value">#{comic.issueNumber}</span>
              </div>
            </div>
          </Affix>
        </div>
        <div className="main-content">
          <Collapse
            defaultActiveKey={[
              "description",
              "gallery",
              "characters",
              "stories",
            ]}
            ghost
          >
            <Panel header="Description" key="description">
              <p className="description">{comic.description}</p>
            </Panel>
            <Divider className="section-divider" />
            <Panel header="Gallery" key="gallery">
              <SliderSection images={comic.images} />
            </Panel>
            <Divider className="section-divider" />
            <Panel header="Characters" key="characters">
              <SliderSection
                clickable={true}
                items={comic.characters.map((character) => {
                  const mappedCharacter = { ...character };
                  mappedCharacter.description = character.name;
                  mappedCharacter.link = `/characters/${character.id}`;
                  return mappedCharacter;
                })}
              />
            </Panel>
            <Panel header="Stories" key="stories">
              <List
                itemLayout="horizontal"
                dataSource={comic.stories}
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

export default ComicDetails;
