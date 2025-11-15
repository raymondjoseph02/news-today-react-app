import axios from "axios";
import { useEffect } from "react";

function TestApi() {
  const fetchApi = async () => {
    try {
      const res = await axios.get(
        "https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json"
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);
  return <div>TestApi</div>;
}

export default TestApi;
