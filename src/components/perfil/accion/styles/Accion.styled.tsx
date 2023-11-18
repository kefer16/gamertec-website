import styled from "styled-components";

export const AccionStyled = styled.div`
   width: 100%;
   padding: 20px 0;

   & .titulo-principal {
      width: 100%;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3px solid rgba(gray, 0.15);
   }

   & .form__accion {
      width: 50%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__cambio {
         width: 100%;
         display: flex;
         align-items: center;
         display: flex;
         margin-bottom: 20px;
         &-definicion {
            width: 50%;
            display: flex;
            justify-content: end;
            padding-right: 10px;
            font-weight: bold;
         }
         &-valor {
            width: 50%;
            padding-left: 10px;
            font-weight: 300;
         }
         &-input {
            width: 100%;
         }
      }
   }

   & .boton__seleccionar__imagen {
      color: #ffffff;
      background: #6366f1;
      /* border: 1px solid #6366f1; */
      padding: 0.5rem;
      font-size: 0.5rem;
      /* transition: background-color 0.2s, color 0.2s, border-color 0.2s,
         box-shadow 0.2s; */
      border-radius: 6px;
   }
`;
