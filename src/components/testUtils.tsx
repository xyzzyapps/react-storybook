import * as React from 'react';
import { UserOutlined } from '@ant-design/icons';

export const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getUser = (id) => {
  return {
    userId: 1,
    userName: "Test User AC",
    imageURL: "https://localhost",
    email: "test@email.com",
    permission: "Full Access"
  }

}

export const getTeam = (id) => {
  return {
    teamId: 2,
    teamName: "Test Team AC",
    imageURL: "https://localhost",
    permission: "Full Access"
  }
}


export const generateUsers: any[] = () => {
  return [
    {
      userId: 1,
      userName: "Test User",
      imageURL: "https://localhost",
      email: "test@email.com",
      permission: "Full Access"
    }
  ]
};

export const generateTeams: any[] = () => {
  return [
    {
      teamId: 2,
      teamName: "Test Team",
      imageURL: "https://localhost",
      permission: "Full Access"
    }
  ]
};


const renderTitle = (title: string) => (
  <span>
    {title}
  </span>
);


const renderItem = (value: any) => ({
  value: value.name,
  _value: value,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        padding: "4px"
      }}
    >
      <span style={{ padding: "4px" }}>
        <UserOutlined style={{ marginRight: "8px" }} />
        {value.name}
      </span>
    </div>
  ),
});

export const query = (query: string) => {
  return [
    {
      label: renderTitle('Users'),
      options: [renderItem({
        id: 1,
        name: "Test User AC",
        permission: "Full Access",
        type: "user"
      })]
    },
    {
      label: renderTitle('Teams'),
      options: [renderItem({
        id: 1,
        name: "Test Team AC",
        permission: "Full Access",
        type: "team"
      })]
    },
  ];
};