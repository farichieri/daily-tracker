import { auth } from "../../utils/firebase.config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Button from "../Layout/Button/Button";
import React, { useState } from "react";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    router.push("/user");
    await signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
    setIsDisabled(false);
    setIsLoading(false);
  };

  return (
    <div>
      <Button
        style={null}
        onClick={handleLogout}
        content="Logout"
        isLoading={isLoading}
        isDisabled={isDisabled}
        loadMessage={"Loading..."}
      />
      <style jsx>{`
        div {
          display: flex;
          min-width: 100px;
        }
      `}</style>
    </div>
  );
};

export default Logout;
