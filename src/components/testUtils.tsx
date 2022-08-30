import * as React from 'react';
import { UserOutlined } from '@ant-design/icons';

export const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getUser = (id) => {
  return {
        userId: 1,
        userName: "Test User AC",
        imageURL: "https://localhost",
        email: "test@email.com",
        permission: "Full"
       }
 
}

export const getTeam = (id) => {
  return {
        teamId: 1,
        teamName: "Test Team",
        imageURL: "https://localhost",
        permission: "Full"
  }
}


export const generateUsers = () => {
    return [
       {
        userId: 1,
        userName: "Test User",
        imageURL: "https://localhost",
        email: "test@email.com",
        permission: "Full"
       }
    ]
};

export const generateTeams = () => {
    return [
       {
        teamId: 1,
        teamName: "Test Team",
        imageURL: "https://localhost",

        permission: "Full"
       }
    ]
};


const renderTitle = (title) => (
  <span>
    {title}
  </span>
);


const renderItem = (value) => ({
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
        <span style={{padding: "4px"}}>
           <UserOutlined style={{ marginRight: "8px" }}/>
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
              permission: "Full",
              type: "user"
            })]
          },
          {
            label: renderTitle('Teams'),
            options: [renderItem({
              id: 1,
              name: "Test Team AC",
              permission: "Full",
              type: "team"
            })]
          },
    ];
};