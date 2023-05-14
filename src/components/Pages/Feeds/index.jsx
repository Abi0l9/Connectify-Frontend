import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Feed({ user }) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user]);
  return <div>Feed</div>;
}

export default Feed;
