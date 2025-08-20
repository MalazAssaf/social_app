import { Routes, Route } from "react-router-dom";
import { Home } from "./features/posts/Home";
import { About } from "./components/About";
import "./App.css";
import Header from "./components/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./app/store";

const theme = createTheme({
  typography: {
    fontFamily: "MyFont",
  },
});
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
