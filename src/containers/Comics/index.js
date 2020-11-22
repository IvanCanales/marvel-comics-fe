import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch } from "react-redux";

import "./styles.scss";
import http from "../../utils/http";
import formatFilters from "../../constants/formatFilters";
import { changeComic } from "../../actions";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [numComics, setNumComics] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    getComics(1);
  }, []);

  const getComics = async (page, params = {}) => {
    setLoading(true);
    const { data } = await http.get("comics/", {
      params: { offset: page - 1, ...params },
    });
    let newComics = [...comics];
    data.comics.forEach((comic, i) => {
      const id = (page - 1) * 20 + i;
      const thumbnail = comic.thumbnail;
      newComics[id] = {
        key: id + 1,
        ...comic,
        description: comic.description
          ? `${comic.description.slice(0, 150)}...`
          : "",
        thumbnail: `${thumbnail.path}/portrait_small.${thumbnail.extension}`,
      };
    });
    setComics(newComics);
    setNumComics(data.total * 20);
    setLoading(false);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.current.select();
        }, 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const onTableChange = (pagination, filters, _, { action }) => {
    const comicFilters = {};
    if (filters.format) comicFilters.format = filters.format[0];
    else if (filters.title) {
      comicFilters.title = filters.title[0];
    } else if (filters.issueNumber) {
      comicFilters.issueNumber = filters.issueNumber[0];
    }
    if (action === "paginate") {
      getComics(pagination.current, comicFilters);
    } else if (action === "filter") {
      getComics(1, comicFilters);
    }
  };

  return (
    <div className="comics-page">
      <Table
        dataSource={comics}
        loading={loading}
        onChange={onTableChange}
        pagination={{
          total: numComics,
          pageSize: 20,
          showSizeChanger: false,
        }}
        scroll={{
          scrollToFirstRowOnChange: true,
          x: 1200,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              dispatch(changeComic(record));
              history.push(`/comics/${record.id}`);
            },
          };
        }}
      >
        <Table.Column
          title="#"
          dataIndex="key"
          key="key"
          align="center"
          fixed="left"
          width={100}
        />
        <Table.Column
          title=""
          dataIndex="thumbnail"
          key="thumbnail"
          align="center"
          render={(thumbnail) => <img src={thumbnail} alt="comic thumbnail" />}
          width={80}
          fixed="left"
        />
        <Table.Column
          title="Title"
          dataIndex="title"
          key="title"
          {...getColumnSearchProps("title")}
          width={300}
        />
        <Table.Column
          title="Description"
          dataIndex="description"
          key="description"
        />
        <Table.Column
          title="Format"
          dataIndex="format"
          key="format"
          align="center"
          filters={formatFilters}
          filterMultiple={false}
          width={100}
        />
        <Table.Column
          title="Issue Number"
          dataIndex="issueNumber"
          key="issue-number"
          align="center"
          width={200}
          {...getColumnSearchProps("issueNumber")}
        />
      </Table>
    </div>
  );
};

export default Comics;
