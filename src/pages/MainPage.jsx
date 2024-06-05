import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchInput from "../components/Main/SearchInput";
import { logIn } from "../redux/slices/logSlice";
import supabase from "../util/supabase/supabaseClient";

function MainPage() {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const userId = useSelector((state) => state.log.logInUser);
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user) {
        dispatch(logIn(user.uuid)); // 현재 로그인된 사용자의 ID 설정
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from("POST")
          .select("*")
          .eq("postUserId", userId);

        if (error) console.error(error);
        else {
          setUserPosts(data);
          console.log(data);
        }
      }
    };
    fetchData();
  }, []);

  // if (userId === null) {
  //   return (
  //     <div
  //       style={{
  //         textAlign: "center",
  //         color: "#bbbbbb",
  //         marginBottom: "32px",
  //         fontSize: "40px",
  //         font: "pretendard-regular",
  //       }}
  //     >
  //       Loading...
  //     </div>
  //   );
  // } else if (!userId) {
  //   return (
  //     <div
  //       style={{
  //         textAlign: "center",
  //         color: "var(--mintgreen-color)",
  //         marginBottom: "32px",
  //         fontSize: "40px",
  //       }}
  //     >
  //       로그인이 필요합니다
  //     </div>
  //   );
  // } else {
  return (
    <>
      <div className="post-box">
        <p className="h2">나의 여행지 기록</p>
        {userPosts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#bbbbbb",
              marginBottom: "32px",
              fontSize: "16px",
            }}
          >
            {"나의 기록이 아직 없어요!"}
          </div>
        ) : (
          userPosts.map((post) => (
            <Link to={`/post/${post.id}`} className="post" key={post.id}>
              <div className="post-img">
                <img src={post.image_url || ""} alt="image" />
              </div>
              <p className="post-title">{post.title}</p>
              <span>{post.date}</span>
            </Link>
          ))
        )}
        <div>
          <Link
            to="/newpost"
            className="button post-btn"
            style={{ textDecoration: "none" }}
          >
            기록 하러가기
          </Link>
        </div>
      </div>
      <SearchInput />
    </>
  );
}

export default MainPage;
