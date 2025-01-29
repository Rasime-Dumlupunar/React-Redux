import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import Modal from "./components/Modal";

function App() {
  const modal = useSelector((state) => state.modal.modal); // Doğru path'i kontrol edin

  return (
    <div className="App">
      {modal && <Modal title="Modal" />}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
