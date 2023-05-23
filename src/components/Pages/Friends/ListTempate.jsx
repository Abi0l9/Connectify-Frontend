import {
  Avatar,
  Box,
  List,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Loading from "../../../Reusables/Loading";
import { Check, Close } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import {
  ACCEPT_FRIEND_REQUEST,
  CANCEL_FRIEND_REQUEST,
  DECLINE_FRIEND_REQUEST,
  MAKE_FRIEND_REQUEST,
} from "../../../Queries/userQueries";
import { useDispatch } from "react-redux";
import { notification } from "../../../reducers/notificationReducer";

const ConnectRequestsIcons = ({ acceptFn, declinelFn }) => {
  return (
    <Box>
      <Tooltip title="accept request">
        <IconButton onClick={acceptFn} edge="start">
          <Check color="success" />
        </IconButton>
      </Tooltip>
      <Tooltip title="cancel request">
        <IconButton onClick={declinelFn} edge="end">
          <Close color="error" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const MakeRequestsIcons = ({ sendConnectFn }) => {
  return (
    <Box>
      <Tooltip title="send connect request">
        <Button
          onClick={sendConnectFn}
          size="small"
          type="button"
          color="primary"
          variant="contained"
        >
          connect
        </Button>
      </Tooltip>
    </Box>
  );
};

const PendingRequestsIcons = ({ cancelFn }) => {
  return (
    <Box>
      <Tooltip title="cancel request">
        <IconButton onClick={cancelFn} edge="end">
          <Close color="error" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const ListTemplate = ({ list, type }) => {
  const dispatch = useDispatch();

  const [makeRequest] = useMutation(MAKE_FRIEND_REQUEST, {
    onCompleted: () => {
      dispatch(notification("Connect Request Sent", 4000));
    },
    onError: () => {
      dispatch(notification("An error occured, please, try later...", 4000));
    },
  });

  const [acceptRequest] = useMutation(ACCEPT_FRIEND_REQUEST, {
    onCompleted: () => {
      dispatch(notification("Accepted Connect Request", 4000));
    },
    onError: () => {
      dispatch(notification("An error occured, please, try later...", 4000));
    },
  });

  const [declineRequest] = useMutation(DECLINE_FRIEND_REQUEST, {
    onCompleted: () => {
      dispatch(notification("Declined Connect Request", 4000));
    },
    onError: (error) => {
      dispatch(notification("An error occured, please, try later...", 4000));
    },
  });

  const [cancelPendingRequest] = useMutation(CANCEL_FRIEND_REQUEST, {
    onCompleted: () => {
      dispatch(notification("Cancelled Sent Connect Request", 4000));
    },
    onError: (error) => {
      dispatch(notification("An error occured, please, try later...", 4000));
    },
  });

  const handleMakeRequest = (friendId) => {
    makeRequest({ variables: { friendId } });
  };

  const handleAccept = (friendId) => {
    acceptRequest({ variables: { friendId } });
  };

  const handleDecline = (friendId) => {
    declineRequest({ variables: { friendId } });
  };

  const handleCancel = (friendId) => {
    cancelPendingRequest({ variables: { friendId } });
  };

  return (
    <Box>
      {list?.map((user) => (
        <List sx={{ width: "100%" }} key={user.id}>
          <ListItem
            secondaryAction={
              <Box>
                {(type === "requests" && (
                  <ConnectRequestsIcons
                    acceptFn={() => handleAccept(user.id)}
                    declinelFn={() => handleDecline(user.id)}
                  />
                )) ||
                  (type === "pendings" && (
                    <PendingRequestsIcons
                      cancelFn={() => handleCancel(user.id)}
                    />
                  )) ||
                  (type === "suggestions" && (
                    <MakeRequestsIcons
                      sendConnectFn={() => handleMakeRequest(user.id)}
                    />
                  ))}
              </Box>
            }
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
            </ListItemAvatar>
            <Link href={`/profile/${user.name}`} underline="none">
              <ListItemText primary={user.name} />
            </Link>
          </ListItem>
        </List>
      )) || <Loading />}
    </Box>
  );
};

export default ListTemplate;
