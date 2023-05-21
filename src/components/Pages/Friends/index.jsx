import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import PendingRequests from "./PendingRequests";
import AcceptedRequests from "./AcceptedRequests";
import ReceivedRequests from "./ReceivedRequests";
import SuggestedConnects from "./SuggestedConnects";

function FriendsPage() {
  const allUsers = useSelector((store) => store.users);
  const curUser = useSelector((state) => state.curUser);

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

  return (
    <Container component="main">
      <Box>
        <ReceivedRequests requests={requests} />
      </Box>
      <Box>
        <AcceptedRequests accepted={accepted} />
      </Box>
      <Box>
        <PendingRequests pendings={pendings} />
      </Box>
      <Box>
        <SuggestedConnects suggestions={suggestedConnections} />
      </Box>
      {/* <Box>
        <AllUsers allUsers={suggestedConnections} />
      </Box> */}
      ;
    </Container>
  );
}

export default FriendsPage;
