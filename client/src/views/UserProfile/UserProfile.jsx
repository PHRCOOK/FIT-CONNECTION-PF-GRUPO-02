import { useLocation, useParams } from "react-router-dom";
import UserDetails from "../../components/userDetails/userDetails";

import React from "react";

function UserProfile() {
  const isAdminCurrentUser = useLocation().pathname.includes("admin");

  const id = (isAdminCurrentUser && useParams().id) || 1;
  return (
    <div>
      <UserDetails user_id={id} />
    </div>
  );
}

export default UserProfile;
