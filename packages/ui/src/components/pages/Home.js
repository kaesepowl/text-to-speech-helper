import React from "react";
import useSWR from "swr";

const Home = () => {
  const { data, error } = useSWR("http://localhost:8080/processed");
  return <div>home</div>;
};

export default Home;
