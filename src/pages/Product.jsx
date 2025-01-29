import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const isModalOpen = useSelector((state) => state.modal.modal ?? false);
  const { data, keyword } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState(() => ({
    name: "",
    price: "",
    url: "",
  }));
  const onChangeFunc = (e, type) => {
    if (type === "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  let loc = location?.search.split("=")[1];
  useEffect(() => {
    if (loc) {
      setProductInfo(data.find((dt) => dt.id == loc));
    }
  }, [loc]);

  console.log(location?.search.split("=")[1], "data");
  const buttonFunc = async () => {
    const result = await dispatch(
      createDataFunc({ ...productInfo, id: data.length + 1 })
    );
    if (result.payload) {
      // İşlem başarılı ise
      dispatch(modalFunc(false)); // Modal'ı kapat
      setProductInfo({ name: "", price: "", url: "" }); // State'i temizle
    }
  };

  const buttonUpdateFunc = () => {
    dispatch(updateDataFunc({ ...productInfo, id: loc }));
    dispatch(modalFunc());
    navigate("/");
  };

  const contentModal = (
    <>
      <Input
        type={"text"}
        placeholder={"Ürün Ekle"}
        name={"name"}
        id={"name"}
        value={productInfo?.name}
        onChange={(e) => onChangeFunc(e, "name")}
      />
      <Input
        type={"text"}
        placeholder={"Fiyat Ekle"}
        name={"price"}
        id={"price"}
        value={productInfo?.price}
        onChange={(e) => onChangeFunc(e, "price")}
      />
      <Input
        type={"file"}
        placeholder={"Resim Seç"}
        name={"url"}
        id={"url"}
        onChange={(e) => onChangeFunc(e, "url")}
      />
      <Button
        btnText={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
        onClick={loc ? buttonUpdateFunc : buttonFunc}
      />
    </>
  );

  const filteredItems = data.filter((dt) =>
    dt.name.toLowerCase().includes(keyword)
  );

  return (
    <div>
      {data?.length > 0 ? (
        <div className="flex items-center flex-wrap">
          {filteredItems?.map((dt, i) => (
            <ProductCard key={i} dt={dt} />
          ))}
        </div>
      ) : (
        <p>Henüz ürün bulunmamaktadır.</p>
      )}
      {isModalOpen && (
        <Modal
          content={contentModal}
          title={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
        />
      )}
    </div>
  );
};

export default Product;
