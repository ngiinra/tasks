"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setUserId } from "@/slices/UserSlice";
import { useGetUserDataQuery } from "@/services/users/userDataApi";

export default function DashboardClientWrapper({
  userId,
  children,
}: {
  userId?: string;
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetUserDataQuery(userId ?? "", {
    skip: !userId, // جلوگیری از فچ بی‌مورد
  });

  useEffect(() => {
    if (userId) {
      dispatch(setUserId(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [isSuccess, data]);

  return <>{children}</>;
}
