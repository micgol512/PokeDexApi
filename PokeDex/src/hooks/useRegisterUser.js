import { useState, useCallback } from "react";
import { LOCAL_URL } from "../services/links";

const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = useCallback(async (user) => {
    setLoading(true);
    setError(null);

    try {
      const [isNameResp, isEmailResp] = await Promise.all([
        fetch(`${LOCAL_URL}/users?username=${user.username}`),
        fetch(`${LOCAL_URL}/users?email=${user.email}`),
      ]);

      const [isName, isEmail] = await Promise.all([
        isNameResp.json(),
        isEmailResp.json(),
      ]);

      if (isName.length || isEmail.length) {
        setError("Username or email already exists.");
        setLoading(false);
        return false;
      }

      const response = await fetch(`${LOCAL_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          username: user.username,
          password: user.password,
          email: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user.");
      }

      setLoading(false);
      return true;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      return false;
    }
  }, []);

  return { registerUser, loading, error };
};

export default useRegisterUser;
