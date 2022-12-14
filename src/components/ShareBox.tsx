import * as React from 'react';
import { useState, useEffect } from 'react';

import { Switch, Input, Button, Col, Row, Modal, Divider } from 'antd';
import { InviteList } from './InviteList';
import { UserAndTeamList } from './UserAndTeamList';
import { IUser, ITeam } from './interfaces';

import './ShareBox.css';
import "antd/dist/antd.css";
import { GlobalOutlined, QuestionCircleOutlined, LinkOutlined } from '@ant-design/icons';

export interface Props {
  isPublic: boolean;
  userInvites: [];
  teamInvites: [];
  publicURL: string;
  generateURL(): string;
  query(term: string): any;
  getUser(id: string): any;
  getTeam(id: string): any;
  inviteSync(isPublic: boolean, publicURL: string, userInvites: any, teamInvites: any): void;
}

export const ShareBox = (props: Props) => {
  const [isPublic, setPublic] = useState(true);
  const [publicURL, setPublicURL] = useState("");
  const [isTeamListVisible, setTeamListVisible] = useState(false);
  const [userInvites, setUserInvites] = useState([]);
  const [teamInvites, setTeamInvites] = useState([]);

  useEffect(() => {
    setPublic(props.isPublic);
    setPublicURL(props.publicURL);
    setUserInvites(props.userInvites);
    setTeamInvites(props.teamInvites);
  }, [props])


  const onPublicCheckboxChange = (checked: boolean) => {
    setPublic(checked);
    setPublicURL(props.generateURL());
  };

  const showTeamList = () => {
    setTeamListVisible(true);
  };

  const closeModal = () => {
    setTeamListVisible(false);
  };

  const copyClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(publicURL);
  }

  const onInvite = async (newInvites) => {
    newInvites.map(async (e: any) => {
      if (e.type === "team") {
        let team = await props.getTeam(e.id);
        team.permission = e.permission;
        teamInvites.push(team);
        setTeamInvites([...teamInvites]);
      } else if (e.type === "user") {
        let user = await props.getUser(e.id);
        user.permission = e.permission;
        userInvites.push(user);
        setUserInvites([...userInvites]);
      }
    })
    await props.inviteSync(isPublic, publicURL, userInvites, teamInvites);
  }


  return (
    <>
      <Modal title="Team List" visible={isTeamListVisible} >
        <UserAndTeamList onInvite={onInvite}
          query={props.query}
          closeModal={closeModal}
          style={{ "boxShadow": "rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px" }} />
      </Modal>
      <Row>
        <Col span="6" style={{ "boxShadow": "rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px" }}>
          <Row style={{ "marginTop": "24px" }}>
            <Col flex={"24px"}><GlobalOutlined style={{ "fontSize": "large", "top": "12px", "position": "relative" }} /></Col>
            <Col flex={"200px"}><b>Share to web</b></Col>
            <Col flex={"150px"}></Col>
            <Col flex={1}><Switch defaultChecked onChange={onPublicCheckboxChange} /></Col>
          </Row>
          <Row>
            <Col flex={"24px"}></Col>
            <Col flex={"300px"}>Publish and share link with anyone</Col>
            <Col span={2}></Col>
          </Row>
          <Divider />
          <Row>
            <Col flex={6}> <Input placeholder="Add people, teams" readOnly onClick={showTeamList} /> </Col>
            <Col flex={1}> <Button onClick={showTeamList} >Invite</Button></Col>
          </Row>
          <Row style={{ "paddingBottom": "12px" }}>
            <Col flex={24}><InviteList userInvites={userInvites} setUserInvites={setUserInvites} teamInvites={teamInvites} setTeamInvites={setTeamInvites} /></Col>
          </Row>
          <Divider style={{ "margin": "0px" }} />
          <Row style={{ "padding": "12px", "backgroundColor": "rgb(248,250,250)" }}>
            <Col span={"24px"}> <QuestionCircleOutlined /> </Col>
            <Col span={10} style={{ "marginLeft": "8px" }}><a href="https://www.notion.so/help/sharing-and-permissions" target="_blank">Learn about sharing </a></Col>
            <Col span={5} offset={6}><a className="fade" style={{ "color": "black" }} onClick={copyClipboard}><LinkOutlined /> Copy Link </a></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};