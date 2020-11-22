import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Divider, Skeleton } from "antd";

import "./styles.scss";
import http from "../../utils/http";
import { changeComic } from "../../actions";
import { useLocation } from "react-router-dom";
import SliderSection from "../../components/SliderSection";
const { Panel } = Collapse;

const ComicDetails = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { comic } = useSelector((state) => state.global);
  const location = useLocation();
  const thumbnail = !comic
    ? ""
    : `${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`;

  useEffect(() => {
    let comicID = location.pathname.match(/\d*$/)[0];
    if (!comic) {
      getComic(comicID);
    } else {
      setLoading(false);
    }
  }, []);

  const getComic = async (comicID) => {
    const { data } = await http.get(`comics/${comicID}`);
    dispatch(changeComic(data));
    setLoading(false);
  };

  if (loading)
    return (
      <div className="comic-detail">
        <Skeleton active avatar paragraph={{ rows: 10 }} />
      </div>
    );
  return (
    <div className="comic-detail">
      <p className="comic-name">{comic.title}</p>
      <div className="content">
        <div className="sider">
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
              <span className="value">{comic.issueNumber}</span>
            </div>
          </div>
        </div>
        <div className="main-content">
          <Collapse
            defaultActiveKey={["description", "gallery", "characters"]}
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
                images={comic.characters.map(
                  (character) => character.thumbnail
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
