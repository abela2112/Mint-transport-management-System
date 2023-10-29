import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  font-family: "Poppins", sans-serif;
  height: 100vh;
  width: 100%;
`;
export const Header = styled.header`
 
`

export const SignUpForm = styled.div`
  width: 400px;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 1px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`;
export const Contain = styled.div`
display: flex;
width: 100%;
flex-direction: column;
margin-bottom: 10px;
gap: 2px;

`
export const Label = styled.label`
padding: 5px 0;
 
`;
export const SignUpInput = styled.input`
  width: calc(100%-10px);
  padding: 10px;
  margin-bottom: 10 px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SignUpButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
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
 justify-content: center;
 align-items: center;
 margin:10px;
`

export const Image = styled.img`
  width: 400px;
  height: 300px;
`;
export const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const TextContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Option = styled.option``;
