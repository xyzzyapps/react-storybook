import * as React from 'react';
import { storiesOf } from "@storybook/react";
import { TeamList } from './TeamList';
import { query } from './testUtils';


storiesOf("TeamList", module)
  .add("basic 2", () =>
      <TeamList query={query} />
  );
