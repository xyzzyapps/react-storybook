import { Menu } from 'antd';
import * as React from 'react';

export interface IUser {
  userId: string;
  userName: string;
  imageURL: string;
  email: string;
  permission: string;
}

export interface ITeam {
  teamId: string;
  imageURL: string;
  teamName: string;
  permission: string;
}

export interface IAutoCompleteSuggestion {
    name: string;
    imageURL:  string;
    type: string;
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