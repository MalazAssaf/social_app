import { Routes, Route } from "react-router-dom";
import { Home } from "./features/posts/Home";
import { About } from "./features/posts/About";
import "./App.css";
import Header from "./features/Header";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "MyFont",
  },
});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
