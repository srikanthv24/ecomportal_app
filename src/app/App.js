// import './App.css';
import AppBar from "../components/AppBar/app-bar";
import Footer from "../components/footer";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <AppBar />
      <Routes />
      <div className="d-block d-sm-none">
        <Footer>Footer</Footer>
      </div>
    </div>
  );
}

export default App;
