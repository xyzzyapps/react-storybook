import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dropdown, Space, Row, Col, Avatar, Menu } from 'antd';
import { IUser, ITeam } from './interfaces';
import { arrayRemoveByValue } from './utils';

import "antd/dist/antd.css";
import { DownOutlined, UserOutlined } from '@ant-design/icons';

interface Props {
  userInvites: any;
  setUserInvites(value: any): void;
  teamInvites: any;
  setTeamInvites(value: any): void;
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
      },
      {
        key: '5',
        danger: true,
        label: 'Delete',
      },
    ]}
  />
}



export const InviteList = (props: Props) => {

  useEffect(() => {
    props.setUserInvites(props.userInvites);
    props.setTeamInvites(props.teamInvites);
  }, [props])

  const userChangePermission = (user: any) => ({ item }) => {
    let content = item.props.elementRef.current.textContent;

    if (content === "Delete") {
      let userInvites = arrayRemoveByValue(props.userInvites, user);
      props.setUserInvites([...userInvites]);
    } else {
      user.permission = item.props.elementRef.current.textContent;
      props.setUserInvites([...props.userInvites]);
    }
  }

  let userRows = props.userInvites.map((user: IUser) => {
    return <Row key={user.userId} style={{ "marginTop": "24px" }}>
      <Col span={2}><Avatar size="64" icon={<UserOutlined />} /> </Col>
      <Col span={10} style={{ "margin": "4px" }}>{user.userName}</Col>
      <Col span={7} offset={4} >
        <Dropdown overlay={menu({ onSelect: userChangePermission(user) })}>
          <a onClick={(e) => e.preventDefault()} >
            <Space>
              <span style={{ "position": "relative", "top": "4px" }}>{user.permission}</span> <DownOutlined style={{ "position": "relative", "top": "4px" }} />
            </Space>
          </a>
        </Dropdown>
      </Col>
    </Row>
  });

  const teamChangePermission = (team: ITeam) => ({ item, key, keyPath, domEvent }) => {
    let content = item.props.elementRef.current.textContent;
    if (content === "Delete") {
      let teamInvites = arrayRemoveByValue(teamInvites, team);
      props.setTeamInvites([...teamInvites]);
    } else {
      team.permission = item.props.elementRef.current.textContent;
      props.setTeamInvites([...props.teamInvites]);
    }
  }


  let teamRows = props.teamInvites.map((team: ITeam) => {
    return <Row style={{ "marginTop": "24px" }}>
      <Col span={2}><Avatar size="64" icon={<UserOutlined />} /> </Col>
      <Col span={10} style={{ "margin": "4px" }}>{team.teamName}</Col>
      <Col span={7} offset={4}>
        <Dropdown overlay={menu({ onSelect: teamChangePermission(team) })}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              <span style={{ "position": "relative", "top": "4px" }}>{team.permission}</span> <DownOutlined style={{ "position": "relative", "top": "4px" }} />
            </Space>
          </a>
        </Dropdown>
      </Col>
    </Row>
  });


  return (
    <>
      {userRows}
      {teamRows}
    </>

  );
};

