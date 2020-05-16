import React from "react";
import { Input, Button } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [accessKeyId, setAccessKeyId] = React.useState("");
  const [secretAccessKey, setSecretAccessKey] = React.useState("");

  const history = useHistory();

  const handleLogin = () => {
    if (accessKeyId && secretAccessKey) {
      localStorage.setItem("access-key-id", accessKeyId);
      localStorage.setItem("secret-access-key", secretAccessKey);

      history.push("/");
    }
  };

  return (
    <>
      <Input
        data-test-id="access-key-id-input"
        value={accessKeyId}
        onChange={(e) => setAccessKeyId(e.target.value)}
      />
      <Input
        data-test-id="secret-access-key-input"
        value={secretAccessKey}
        type="password"
        onChange={(e) => setSecretAccessKey(e.target.value)}
      />
      <Button data-test-id="login-button" onClick={handleLogin}>
        Login
      </Button>
    </>
  );
};

export default Login;
