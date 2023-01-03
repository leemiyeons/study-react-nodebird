import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Router from "next/router";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }

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
