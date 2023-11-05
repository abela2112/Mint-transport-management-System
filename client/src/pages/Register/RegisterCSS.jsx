import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  font-family: "Poppins", sans-serif;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  
`;
export const Title = styled.span`
 font-weight: 500;
 font-size: 30px;
text-align: left;
/* padding:10px 20px; */

`

export const SignUpForm = styled.form`
  //width: 400px;
  
  padding: 20px;
  /* background-color: #f2f2f2; */
  /* border-radius: 1px; */
  /* box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1); */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export const Contain = styled.div`
display: flex;

width: 400px;
flex-direction: column;
margin-bottom: 10px;
margin-right: 20px;
`
export const Label = styled.label`
padding: 5px 0;
 
`;
export const SignUpInput = styled.input`
  width: calc(100%);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SignUpButton = styled.button`
 width: 200px;
  padding:10px 20px;
  font-size: 16px;
  margin-top: 20px;
  background-color: #155c68;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const SelectOption = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;
export const BottomText = styled.div`
 text-align: center;
 width: 100%;
 /* justify-content: center;
 align-items: center; */
 margin:10px;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export const ImageContainer = styled.div`
  flex: 1;
  
  width: 100%;
  height: 100%;
`;
export const TextContainer = styled.div`
  /* flex: 1; */
padding: 20px;
  display: flex;

  flex-direction: column;
  width: 70%;
  height: 90%;
  background-color: #fff;
  box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
-moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
  /* justify-content: center;
  align-items: center; */
  border-radius: 5px;
`;

export const Option = styled.option``;
