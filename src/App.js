// MATERIAL UI
import { createTheme, ThemeProvider } from "@mui/material";

// REACT
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

// OTHERS
import store from "./app/store";
import "./App.css";
import { ErrorPage } from "./components/ErrorPage";
import { MyProfile } from "./features/profiles/MyProfile";
import { Home } from "./components/Home";
import Header from "./components/Header";
import { OthersProfile } from "./features/profiles/OthersProfile";
import { PostDetails } from "./features/posts/PostDetails";

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
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/postdetails/:id" element={<PostDetails />} />
              <Route path="/userprofile/:id" element={<OthersProfile />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
