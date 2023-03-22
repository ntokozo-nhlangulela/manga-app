import { AppBar, Toolbar, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import T from "./components/mangaCard";
import MangaDetails from "./components/mangaDetails";
import ViewManga from "./components/viewManga";
import appPaths from "./shared/paths";

function App() {
  return (
    <BrowserRouter>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'>
            Manga Hub
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route
          path={appPaths.home}
          element={<T />}
        />
        <Route
          path={appPaths.details}
          element={<MangaDetails />}
        />
        <Route
          path={appPaths.viewManga}
          element={<ViewManga />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
