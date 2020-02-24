// page to edit or delete information + settings
import React from "react";

import { ContentContainer, PageText, Header2 } from "./styledComponents/Index";

function DashTools() {
  return (
    <ContentContainer>
      <Header2>Tools page is an ADMIN only link</Header2>
      <PageText>
        On this page the admin can look at all the users and create/edit/delete
        users. The edit for example could be used when Sauti decides to provide
        free access to the site to government officials so they can change the
        level of access of a specific account by changing the role id in some
        way.
      </PageText>
    </ContentContainer>
  );
}

export default DashTools;
