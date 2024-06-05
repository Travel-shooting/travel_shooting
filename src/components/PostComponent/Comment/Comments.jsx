import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../../../redux/slices/commentSlice";
import supabase from "../../../util/supabase/supabaseClient";

const Comments = () => {
  const { postId } = useParams();
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const comments = useSelector((state) => state.comment.comments);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // 로그인 상태를 가져옵니다.
  const dispatch = useDispatch();

  // 댓글 가져오기
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("COMMENTS")
      .select("*")
      .eq("commentPostId", postId)
      .order("commentDate", { ascending: false }); // 최신 댓글이 위로 오게 정렬

    if (error) console.error("댓글을 가져오는 데 실패했습니다.", error);
    else dispatch({ type: "comment/setComments", payload: data });
  };

  // 댓글 추가
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("로그인이 필요합니다");
      return;
    }

    const { data, error } = await supabase.from("COMMENTS").insert([
      {
        commentPostId: postId,
        commentUserId: USER.userId, // 예제를 위해 임시로 설정한 값입니다. 실제 유저 ID로 대체해야 합니다.
        commentContent: newComment,
        commentDate: new Date(),
      },
    ]);

    if (error) console.error("댓글 추가에 실패했습니다.", error);
    else {
      dispatch(addComment(data[0]));
      setNewComment("");
    }
  };

  const handleDeleteComment = async (id) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다");
      return;
    }

    const { error } = await supabase.from("COMMENTS").delete().eq("id", id);

    if (error) console.error("댓글 삭제에 실패했습니다", error);
    else dispatch(deleteComment(id));
  };

  // 댓글 수정
  const handleUpdateComment = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    const { data, error } = await supabase
      .from("COMMENTS")
      .update({ commentContent: editCommentText })
      .eq("id", editCommentId);

    if (error) console.error("댓글 수정에 실패했습니다.", error);
    else {
      dispatch(updateComment({ id: editCommentId, text: editCommentText }));
      setEditCommentId(null);
      setEditCommentText("");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div>
      <h3>댓글</h3>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          required
        />
        <button type="submit">댓글 추가</button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id}>
          {editCommentId === comment.id ? (
            <form onSubmit={handleUpdateComment}>
              <input
                type="text"
                value={editCommentText}
                onChange={(e) => setEditCommentText(e.target.value)}
                required
              />
              <button type="submit">수정 완료</button>
              <button onClick={() => setEditCommentId(null)}>취소</button>
            </form>
          ) : (
            <>
              <p>{comment.commentContent}</p>
              {isLoggedIn && (
                <>
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    삭제
                  </button>
                  <button
                    onClick={() => {
                      setEditCommentId(comment.id);
                      setEditCommentText(comment.commentContent);
                    }}
                  >
                    수정
                  </button>
                </>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
