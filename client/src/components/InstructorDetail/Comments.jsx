import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CardComment from "./CardComment";
import { Row } from "react-bootstrap";

function Comments({ comments, id_instructor }) {
  return (
    <Row style={{ display: "flex", justifyContent: "space-around" }}>
      {comments
        .filter(
          (c) => c.Instructor.id === Number(id_instructor) && c.status === true
        )
        .map((c) => (
          <CardComment
            key={c.id}
            comment={c.comment}
            id={c.id}
            instructor_id={c.instructor_id}
            post_at={c.post_at}
            raiting={c.raiting}
            user_id={c.user_id}
            Instructor={c.Instructor}
            User={c.User}
          />
        ))}
    </Row>
  );
}

export default Comments;
