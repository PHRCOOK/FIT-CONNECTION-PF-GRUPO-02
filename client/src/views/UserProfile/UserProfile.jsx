import { useLocation, useParams } from "react-router-dom";
import UserDetails from "../../components/userDetails/userDetails";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function UserProfile() {
  const currentUser = useSelector((state) => state.currentUser);
  const isAdmin = useSelector((state) => state.isAdmin);

  const id = (isAdmin && useParams().id) || currentUser.id;
  return (
    <div>
      <UserDetails user_id={id} />
    </div>
  );
}

export default UserProfile;
