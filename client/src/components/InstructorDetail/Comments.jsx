import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CardComment from "./CardComment";

function Comments({ comments, id_instructor }) {
  // const [comments, setComments] = useState([]);

  // const fetchComments = async () => {
  //   try {
  //     const { data } = await axios("/api/feedbacks");
  //     console.log(data);
  //     setComments(data.Items);
  //   } catch (error) {
  //     console.log(error);
  //     // const message = error.response.data.error;
  //     Swal.fire("Error", "message", "error");
  //   }
  // };
  // useEffect(() => {
  //   fetchComments();
  // }, []);

  return (
    <div>
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
    </div>
  );
}

export default Comments;
