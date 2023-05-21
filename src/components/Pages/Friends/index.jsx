import { Box, Container } from "@mui/material";
import AllUsers from "./AllUsers";
import { useSelector } from "react-redux";
import PendingRequests from "./PendingRequests";
import AcceptedRequests from "./AcceptedRequests";
import ReceivedRequests from "./ReceivedRequests";
import SuggestedConnects from "./SuggestedConnects";

function FriendsPage({ loggedInUser }) {
  // const { requests, pendings, accepted } = useSelector(
  //   (store) => store.friends
  // );
  const allUsers = useSelector((store) => store.users);

  const filteredLoggedInUser = allUsers.filter(
    (user) => user.id !== loggedInUser.userId
  );

  const loggedInUserFriends = allUsers.find(
    (user) => user.id === loggedInUser.userId
  )?.friends;

  const requests = loggedInUserFriends?.requests;
  const pendings = loggedInUserFriends?.pendings;
  const accepted = loggedInUserFriends?.accepted;

  // merged the list to make sure that the friends in the lists do not exist in
  // the list of connect suggestions
  const mergedList = requests
    ?.concat(accepted)
    .concat(pendings)
    .map((user) => user.id);

  const suggestedConnections = filteredLoggedInUser.filter(
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
