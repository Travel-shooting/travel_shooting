import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../components/Main/SearchInput";
import supabase from "../util/supabase/supabaseClient";

async function getPost(userId) {
  try {
    const { data, error } = await supabase
      .from("POST")
      .select("*")
      .eq("userId", userId);
    if (error) {
      throw error;
    }
    return data;
    // console.log(data);
  } catch (error) {
    console.log("Error fetching posts:", error.message);
    return [];
  }
}

function MainPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id); // 현재 로그인된 사용자의 ID 설정
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const data = await getPost(userId);
        setPosts(data);
        setFilteredPosts(data);
      }
    };
    fetchData();
  }, [userId]);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().inclues(lowerCaseQuery) ||
        (post.tags && post.tags.toLowerCase().inclues(lowerCaseQuery))
    );
    setFilteredPosts(filtered);
  };

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
        {filteredPosts.length === 0 ? (
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
          filteredPosts.map((post) => (
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
            to="/newpost/1"
            className="button post-btn"
            style={{ textDecoration: "none" }}
          >
            기록 하러가기
          </Link>
        </div>
      </div>
      <SearchInput onSearch={handleSearch} />
    </>
  );
}


export default MainPage;
