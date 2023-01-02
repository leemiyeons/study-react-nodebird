import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const followerList = [
    { nickname: "제로초" },
    { nickname: "이미연" },
    { nickname: "노드버드오피셜" },
  ];
  const followingList = [
    { nickname: "제로초" },
    { nickname: "이미연" },
    { nickname: "노드버드오피셜" },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
