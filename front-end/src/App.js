import axios from "axios";
import { useEffect } from "react";
import "./App.css";

function App() {

  useEffect(() => {
    axios.get(`http://localhost:2222/api/product-type/`).then((res) => {
      console.log(1)
      console.log(res.data);
    });
  }, []);

  return <div className="App"></div>;
}

export default App;
