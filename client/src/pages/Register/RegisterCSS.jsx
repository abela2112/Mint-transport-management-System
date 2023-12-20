import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  position :relative;
  margin-top:0px;
  padding-top:0px;
`;
export const Title = styled.span`
 font-weight: 500;
 font-size: 34px;
 text-align: center;
 margin-bottom: 2rem;
/* padding:10px 20px; */

`

export const ImgmintContainer = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
    width: 100px;
    height: 100px;
    margin-left: 5px;
    margin-top: -55px;
`;

export const Img1 = styled.img`
    width: 100px;
    height:100px;
    object-fit: cover;
`;

export const SignUpForm = styled.form`
  //width: 400px;
  
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export const Contain = styled.div`
display: flex;

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
  width: 400px;


  &:hover::before {
    content: attr(title);
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px;
    background-color: #000;
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
  }

`;

export const SignUpButton = styled.button`
 width: 200px;
  padding:10px 20px;
  font-size: 16px;
  background-color: #155c68;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled{
    cursor: not-allowed;
  }
`;

export const SelectOption = styled.select`
  width: 400px;
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
  display: flex;
  flex-direction: column;
  width: 80%;
  background-color: #fff;
  box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 -webkit-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
 -moz-box-shadow: 0px 0px 23px 0px rgba(162, 161, 161, 0.75);
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  margin: 5rem 0 3rem 0;
`;

export const CopyRight = styled.small`
  position: fixed;
  bottom: 0;
  right: 0;
  margin-right: 3rem;
  font-size: 16px;
  font-weight: 300;
`

export const Option = styled.option``;
