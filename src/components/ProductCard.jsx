import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteDataFunc, updateDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ dt }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateFunc = () => {
    dispatch(modalFunc());
    setOpenEdit(false);
    //dispatch(updateDataFunc(dt));
    navigate(`/?update=${dt?.id}`);
  };

  return (
    <div className="w-[200px] h-[200px] relative m-2 rounded-md">
      <img src={dt?.url} className="w-full h-full rounded-md" alt="" />
      <div className="absolute left-0 bottom-0 bg-red-600 text-white w-full px-2">
        <div className="text-lg font-semibold">{dt?.name}</div>
        <div>{dt?.price}$</div>
      </div>
      <div
        onClick={() => setOpenEdit(!openEdit)}
        className="absolute top-0 right-2"
      >
        <BsThreeDots color="red" size={24} />
      </div>
      {openEdit && (
        <div className="bg-blue-500 border border-white text-white absolute top-5 right-2 p-2 text-sm rounded-lg">
          <div
            onClick={() => dispatch(deleteDataFunc(dt?.id))}
            className="cursor-pointer border-b"
          >
            Sil
          </div>
          <div onClick={updateFunc} className="cursor-pointer">
            Güncelle
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
