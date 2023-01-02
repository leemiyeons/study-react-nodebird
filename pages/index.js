import React from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import PostForm from "../components/PostFrom";
import PostCard from "../components/PostCard";

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
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
