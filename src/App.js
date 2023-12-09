import "./App.css";
import { BrowserRouter as Router, Route} from "inferno-router";
import AddBank from "./Components/AddBank";

const App=()=>{
    return (
        <Router>
          <Route path="/" component={AddBank} />
        </Router>
    );
  };

  export default App;