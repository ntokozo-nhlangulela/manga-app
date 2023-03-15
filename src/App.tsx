import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import T from "./components/mangaCard";
import MangaDetails from "./components/mangaDetails";
import appPaths from "./shared/paths";

function App() {
  //ToDo: Add react routing
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={appPaths.home}
          element={<T />}
        />
        <Route
          path={appPaths.details}
          element={<MangaDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
