import { Box, Container, Stack, Button } from "@mui/material";
import { useSelector } from "react-redux";
import PendingRequests from "./PendingRequests";
import AcceptedRequests from "./AcceptedRequests";
import ReceivedRequests from "./ReceivedRequests";
import SuggestedConnects from "./SuggestedConnects";
import { useRef, useState } from "react";

function FriendsPage() {
  const allUsers = useSelector((store) => store.users);
  const curUser = useSelector((state) => state.curUser);
  const [tab, setTab] = useState("friends");
  const tabsRef = useRef(null);

  const filteredCurUser = allUsers.filter((user) => user.id !== curUser.userId);

  const curUserFriends = allUsers.find(
    (user) => user.id === curUser.userId
  )?.friends;

  const requests = curUserFriends?.requests;
  const pendings = curUserFriends?.pendings;
  const accepted = curUserFriends?.accepted;

  // merged the list to make sure that the friends in the lists do not exist in
  // the list of connect suggestions
  const mergedList = requests
    ?.concat(accepted)
    .concat(pendings)
    .map((user) => user.id);

  const suggestedConnections = filteredCurUser.filter(
    (user) => !mergedList?.includes(user.id)
  );

  if (tab === "friends") {
    tabsRef.current = (
      <Box>
        <AcceptedRequests accepted={accepted} />
      </Box>
    );
  } else if (tab === "requests") {
    tabsRef.current = (
      <Box>
        <ReceivedRequests requests={requests} />
      </Box>
    );
  } else if (tab === "pendings") {
    tabsRef.current = (
      <Box>
        <PendingRequests pendings={pendings} />
      </Box>
    );
  } else if (tab === "suggestions") {
    tabsRef.current = (
      <Box>
        <SuggestedConnects suggestions={suggestedConnections} />
      </Box>
    );
  }

  const handleTabsClick = (tabName, e) => {
    console.log(e?.target?.textContent);
    setTab(tabName);
  };

  return (
    <Container component="main">
      <Box sx={{ fontWeight: "bold", mx: 1 }}>
        <Stack direction="row" spacing={3}>
          <Box onClick={(e) => handleTabsClick("friends", e)}>
            <Button size="small">Friends</Button>
          </Box>
          <Box onClick={(e) => handleTabsClick("requests", e)}>
            <Button size="small">Connect Requests</Button>
          </Box>
          <Box onClick={() => handleTabsClick("pendings")}>
            <Button size="small">Sent Requests</Button>
          </Box>
          <Box onClick={() => handleTabsClick("suggestions")}>
            <Button size="small">Suggested Connects</Button>
          </Box>
        </Stack>
      </Box>
      <Box ref={tabsRef}>{tabsRef.current}</Box>
    </Container>
  );
}

export default FriendsPage;
