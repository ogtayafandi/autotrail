'use client'
import { useUserStore } from "@/store/authStore";
import { useEffect } from "react";
import AuthService from '@/api/auth'

export default function Home() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  console.log(user, 'user');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AuthService.signed();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setUser]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    {user?.name}
    </div>
  );
}