import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookAdmin from "./pages/BookAdmin";
import Home from "./pages/Home";
import "./App.css";
import BookForm from "./pages/BookForm";
import UserContextProvider from "./context/UserContext";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/book-admin" element={<BookAdmin />} />
            <Route path="/edit-book/:id" element={<BookForm />} />
            <Route path="/new-book/" element={<BookForm />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
