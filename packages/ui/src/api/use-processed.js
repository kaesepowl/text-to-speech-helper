import useSWR from "swr";

const useProcessed = () => useSWR("http://localhost:8080/processed");

export default useProcessed;
