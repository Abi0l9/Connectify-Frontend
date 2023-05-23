import { useSelector } from "react-redux";

function useConnectList(profileUser) {
  const allUsers = useSelector((store) => store.users);
  const curUser = useSelector((state) => state.curUser);

  const curUserFriends = profileUser
    ? allUsers.find((user) => user.id === profileUser?.id)?.friends
    : allUsers.find((user) => user.id === curUser?.userId)?.friends;

  const requests = curUserFriends?.requests;
  const pendings = curUserFriends?.pendings;
  const accepted = curUserFriends?.accepted;

  return {
    requests,
    pendings,
    accepted,
  };
}

export default useConnectList;
