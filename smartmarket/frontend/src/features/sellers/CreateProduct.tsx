import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { createProduct } from "../../Slices/ProductsSlice";
import { AppDispatch, RootState } from "../../Store";
import { QueryClient, useMutation } from "react-query";
import { addProduct } from "../../api/productsApi";

const CreateProduct = () => {
    const dispatch: AppDispatch = useDispatch();
  const { createStatus } = useSelector((state: RootState) => state.products);

  const [productImg, setProductImg] = useState<string>("");
 
  const [new_product, setnew_product] = useState({
    name: "",
    category: "",
    price: 0,
    img:productImg,
    desc: ""
  });

  const queryClient = new QueryClient()
{
  const addProductMutation = useMutation(addProduct, {
    onSuccess: () => {
      //invalidate cache and refetch
      queryClient.invalidateQueries("products")
    }
  })}
//   c
  const handleProductImageUpload = (e: any) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file: any) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {

     const result = reader.result
     console.log(result)
     if (typeof result === 'string') {
        setProductImg(result);
      }
     
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
console.log(productImg)
    dispatch(
      createProduct({...new_product, img:productImg})
    );
  };

  return (
    <StyledCreateProduct>
      <StyledForm onSubmit={handleSubmit}>
        <h3>Create a Product</h3>
        <input
        className="form-control"
          id="imgUpload"
          accept="image/*"
          type="file"
          onChange={handleProductImageUpload}
          required
        />
        <select  value={new_product.category} onChange={(e) => setnew_product({...new_product,category:e.target.value})} required>
          <option value="">Select Category</option>
          <option value="vegetables">vegetables</option>
          <option value="fruits">fruits</option>
          <option value="cereals">cereals</option>
          <option value="legumes">legumes</option>
          <option value="tubers">tubers</option>
        </select>
        <input
          type="text"
          placeholder="Name"
          value={new_product.name}
          onChange={(e) => setnew_product({...new_product,name:e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={new_product.price}
          onChange={(e) => setnew_product({...new_product,price:parseInt(e.target.value)})}
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          value={new_product.desc}
          onChange={(e) => setnew_product({...new_product, desc:e.target.value} )}
          required
        />

        {/* <PrimaryButton type="submit" onClick={handleSubmit}>
          {createStatus === "pending" ? "Submitting" : "Submit"}
        </PrimaryButton> */}
          <input placeholder="Create" type="submit" className="btn btn-primary" onClick={handleSubmit}/>
      </StyledForm>
      <ImagePreview>
        {productImg ? (
          <>
            <img src={productImg} alt="error!" />
          </>
        ) : (
          <p>Product image upload preview will appear here!</p>
        )}
      </ImagePreview>
    </StyledCreateProduct>
  );
};

export default CreateProduct;

const StyledForm = styled.form`
  display: flex;
  color: white;
  flex-direction: column;
  width: 800px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 4rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;