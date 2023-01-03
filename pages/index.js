import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../components/PostFrom";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  /**
   * infinite Scroll을 사용할 때 pc나 모바일에 메모리가 찰 수 있는 상황이 생길 수 있으니 ( 렉 현상 )
   * 화면에서 보여지는 부분을 제외하고는 메모리에 저장시켜주고 없애주는 방법을 쓴다.
   * - react-virtualized 사용하여 성능 최적화 고려,,
   * */
  useEffect(() => {
    function onScroll() {
      console.log(
        window.scrollY, // 스크롤 할때 마다 높이 좌표 ( 얼마나 내렸는지...)
        document.documentElement.clientHeight, // 화면에 보이는 길이
        document.documentElement.scrollHeight // 총 길이
      );
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((v) => {
        return <PostCard key={v.id} post={v} />;
      })}
    </AppLayout>
  );
};

export default Home;
