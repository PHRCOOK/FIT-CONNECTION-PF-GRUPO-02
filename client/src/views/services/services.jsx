import MembershipsCards from "../../components/cards_memberships/cards_memberships";

import { useEffect } from "react";

function services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1>SERVICIOS</h1>
      <MembershipsCards />
    </div>
  );
}

export default services;
