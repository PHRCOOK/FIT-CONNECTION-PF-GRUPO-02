import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserDetails from "../../components/userDetails/userDetails";

function UserProfile() {
  const currentUser = useSelector((state) => state.userShopping);
  const isAdmin = useSelector((state) => state.isAdmin);
  const params = useParams();
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    if ((params && params.id) || (currentUser && currentUser.id)) {
      setId((isAdmin && params.id) || currentUser.id);
    }
    if (currentUser && currentUser.name) {
      setName(currentUser.name);
    }
  }, [currentUser, isAdmin, params]);

  return (
    <div>
      <UserDetails
        user_id={id}
        name={name}
        setName={setName}
        currentUser={currentUser}
      />
    </div>
  );
}

export default UserProfile;
