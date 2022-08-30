import * as React from 'react';
import { useState } from 'react';
import { AutoComplete, Dropdown, Avatar, Space, Input, Row, Col, Button, Menu } from 'antd';

import "antd/dist/antd.css";
import { DownOutlined, UserOutlined } from '@ant-design/icons';

export interface Props {
  query(term: string): any;
  onInvite([]): any;
  closeModal([]): void;
}


export const menu = (props:any) => {
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

export const TeamList = (props: Props) => {

  const [options, setOptions] = useState<any>([]);
  const [invites, setInvites] = useState<any>([]);
  const [permission, setPermission] = useState<string>("Full Access");

  const handleSearch = async (value: string) => {
    let matches = await props.query(value)
    setOptions(matches);
  };

  const onSelect = (text, node) => {
    node._value.permission = permission;
    invites.push(node._value);
    setInvites([...invites]);
  };

  const changePermission = ({ item, key, keyPath, domEvent }) => {
    setPermission(item.props.elementRef.current.textContent);
  }

  const invitesRows = invites.map((invite: any) => {
   return <Row  style={{"marginTop": "24px"}}>
      <Col span={2}> <Avatar size="64" icon={<UserOutlined />} /> </Col>
      <Col span={10}>{invite.name}</Col>
      <Col span={7} offset={5}>
            {invite.permission}
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
        >
        <Input size="large" placeholder="Add emails, teams " />
        </AutoComplete>
        </Col>

        <Col span={8}>
          <Dropdown overlay={ menu({onSelect: changePermission}) }>
              <a onClick={e => e.preventDefault()}>
              <Space>
                  {permission} <DownOutlined />
              </Space>
              </a>
          </Dropdown>
        </Col>

   </Row>
    {invitesRows}

    <Button style={{"marginTop": "24px"}} type="primary" onClick={(e) => props.onInvite(invites)}>Invite</Button>
    <Button onClick={(e) => props.closeModal()}>Close</Button>
  </>

  );
};

