import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dropdown, Space, Row, Col, Avatar, Menu } from 'antd';
import {IUser, ITeam} from './interfaces';

import "antd/dist/antd.css";
import { DownOutlined, UserOutlined } from '@ant-design/icons';

interface Props {
  userInvites: IUser[];
  teamInvites: ITeam[];
}

function arrayRemoveByValue(array, value) { 
  return array.filter(function(e){ 
        return e != value; 
  });
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

  let [userInvites, setUserInvites] = useState([]);
  let [teamInvites, setTeamInvites] = useState([]);

  useEffect(() => {
      setUserInvites(props.userInvites);
      setTeamInvites(props.teamInvites);
  }, [props])


  const userChangePermission = (user:any) => ({ item, key, keyPath, domEvent }) => {
    let content = item.props.elementRef.current.textContent;
    
    if (content === "Delete") {
      userInvites = arrayRemoveByValue(userInvites, user);
    } else {
      user.permission = item.props.elementRef.current.textContent;
    }
    setUserInvites([...userInvites]);
  }

  let userRows = userInvites.map((user) => {
    return <Row key={user.userId}  style={{"marginTop": "24px"}}>
      <Col span={2}><Avatar size="64" icon={<UserOutlined />} /> </Col>
      <Col span={10}>{user.userName}</Col>
      <Col span={7} offset={5}>
        <Dropdown overlay={ menu({onSelect: userChangePermission(user)}) }>
            <a onClick={(e) => e.preventDefault()} >
            <Space>
                  {user.permission} <DownOutlined />
            </Space>
            </a>
        </Dropdown>
      </Col>
    </Row>
  });

  const teamChangePermission = (team:any) => ({ item, key, keyPath, domEvent }) => {
    let content = item.props.elementRef.current.textContent;
    if (content === "Delete") {
      teamInvites = arrayRemoveByValue(teamInvites, team);
    } else {
      team.permission = item.props.elementRef.current.textContent;
    }
    setTeamInvites([...teamInvites]);
  }


  let teamRows = teamInvites.map((team) => {
    return <Row  style={{"marginTop": "24px"}}>
      <Col span={2}><Avatar size="64" icon={<UserOutlined />} /> </Col>
      <Col span={10}>{team.teamName}</Col>
      <Col span={7} offset={5}>
        <Dropdown overlay={ menu({onSelect: teamChangePermission(team)}) }>
            <a onClick={e => e.preventDefault()}>
            <Space>
                  {team.permission} <DownOutlined />
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

