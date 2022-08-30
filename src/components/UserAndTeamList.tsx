import * as React from 'react';
import { useState } from 'react';
import { AutoComplete, Dropdown, Avatar, Space, Input, Row, Col, Button, Menu, Alert } from 'antd';
import { arrayRemoveByValue } from './utils';

import "antd/dist/antd.css";
import { DownOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';

export interface Props {
  query(term: string): any;
  onInvite([]): any;
  closeModal(): void;
}


export const menu = (props: any) => {
  return <Menu onClick={props.onSelect}
    items={[
      {
        key: '1',
        label: "Full Access"
      },
      {
        key: '2',
        label: "Can Edit",
      },
      {
        key: '3',
        label: "Can Comment",
      },
      {
        key: '4',
        label: "Can View",
      }
    ]}
  />
}

export const UserAndTeamList = (props: Props) => {

  const [options, setOptions] = useState([]);
  let [invites, setInvites] = useState([]);
  const [permission, setPermission] = useState("Full Access");
  const [currentSelection, setCurrentSelection] = useState("");


  const handleSearch = async (value: string) => {
    let matches = await props.query(value)
    setOptions(matches);
  };

  const onSelect = (text: string, element: any) => {
    element._value.permission = permission;
    setCurrentSelection(element.value);
    invites.push(element._value);
    setInvites([...invites]);
  };

  const changePermission = ({ item }) => {
    setPermission(item.props.elementRef.current.textContent);
  }

  const removeItem = (invite: any) => () => {
    invites = arrayRemoveByValue(invites, invite)
    setInvites([...invites]);
  }

  const invitesRows = invites.map((invite: any) => {
    return <Row style={{ "marginTop": "24px" }}>
      <Col span={2}> <Avatar size="64" icon={<UserOutlined />} /> </Col>
      <Col span={10} style={{ "marginTop": "4px" }}>{invite.name}</Col>
      <Col span={7} offset={4}>
        <Alert message={invite.permission} type="info" />
      </Col>
      <Col span={1}>
        <DeleteOutlined onClick={removeItem(invite)} style={{ "fontSize": "large", "top": "10px", "position": "relative", "marginLeft": "4px" }} />
      </Col>
    </Row>
  });

  return (
    <>
      <Row ><Col span={16}>
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{ width: 300 }}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
          allowClear={true}
          value={currentSelection}
          onChange={(value) => setCurrentSelection(value)}
        >
          <Input size="large" placeholder="Add emails, teams " />
        </AutoComplete>
      </Col>

        <Col span={8}>
          <Dropdown overlay={menu({ onSelect: changePermission })}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                <span style={{ "position": "relative", "top": "4px" }}>{permission}</span> <DownOutlined style={{ "position": "relative", "top": "4px" }} />
              </Space>
            </a>
          </Dropdown>
        </Col>
      </Row>
      {invitesRows}

      <Button style={{ "marginTop": "24px" }} type="primary" onClick={(e) => { setCurrentSelection(""); props.onInvite(invites); setInvites([]); props.closeModal() }}>Invite</Button>
      <Button onClick={(e) => { setCurrentSelection(""); setInvites([]); props.closeModal() }}>Close</Button>
    </>

  );
};

