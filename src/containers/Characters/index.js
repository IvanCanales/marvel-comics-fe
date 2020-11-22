import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import "./styles.scss";
import http from "../../utils/http";
import { changeCharacter } from "../../actions";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [numCharacters, setNumCharacters] = useState(0);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    getCharacters(1);
  }, []);

  const getCharacters = async (page, params = {}) => {
    setLoading(true);
    const { data } = await http.get("characters/", {
      params: { offset: page - 1, ...params },
    });
    let newCharacters = [...characters];
    data.characters.forEach((character, i) => {
      const id = (page - 1) * 20 + i;
      const thumbnail = character.thumbnail;
      newCharacters[id] = {
        key: id + 1,
        ...character,
        description: character.description
          ? `${character.description.slice(0, 150)}...`
          : "",
        thumbnail: `${thumbnail.path}/portrait_small.${thumbnail.extension}`,
      };
    });
    setCharacters(newCharacters);
    setNumCharacters(data.total * 20);
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
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const onTableChange = (pagination, filters, _s, { action }) => {
    const characterFilters = {};
    if (filters.name) characterFilters.name = filters.name[0];
    if (action === "paginate") {
      getCharacters(pagination.current, characterFilters);
    } else if (action === "filter") {
      getCharacters(1, characterFilters);
    }
  };

  return (
    <div className="characters-page">
      <Table
        theme="dark"
        dataSource={characters}
        loading={loading}
        onChange={onTableChange}
        pagination={{
          total: numCharacters,
          pageSize: 20,
          showSizeChanger: false,
        }}
        scroll={{
          scrollToFirstRowOnChange: true,
          x: 650,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              dispatch(changeCharacter(record));
              history.push(`/characters/${record.id}`);
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
          width={80}
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
          title="Name"
          dataIndex="name"
          key="name"
          width={140}
          {...getColumnSearchProps("name")}
        />
        <Table.Column
          title="Description"
          dataIndex="description"
          key="description"
        />
      </Table>
    </div>
  );
};

export default Characters;
