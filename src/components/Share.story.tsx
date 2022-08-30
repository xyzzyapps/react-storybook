import React from "react";
import { storiesOf } from "@storybook/react";
import { ShareBox } from './ShareBox';
import { getRandomInt, query, generateTeams, generateUsers, getUser, getTeam } from './testUtils';

storiesOf("SharePage", module)
  .add("basic", () =>
      <ShareBox 
          isPublic={true}
          userInvites={generateUsers()}
          teamInvites={generateTeams()}
          publicURL={"https://notion.co/test"} 
          generateURL={() => "https://notion.co/" + getRandomInt(0, 1000) }
          query={query}
          getUser={getUser}
          getTeam={getTeam} />
  );
