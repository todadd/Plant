import { useState } from "react";
import { useNavigate } from "@remix-run/react";

export function useAuth() {
  const [isSignIn, setIsSignIn] = useState(true); // 状態管理
  const navigate = useNavigate(); // ページ遷移用

  // 状態切り替え関数
  const handleToggle = () => {
    if (isSignIn) {
      navigate("/register"); // "Create Account" のとき
    } else {
      navigate("/login"); // "Sign In" のとき
    }
    setIsSignIn(!isSignIn); // 状態を反転
  };

  return { isSignIn, handleToggle }; // 状態と切り替え関数を返す
}