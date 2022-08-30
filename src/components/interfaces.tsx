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
  imageURL: string;
  type: string;
}
