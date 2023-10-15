import styled from "styled-components";

export const AccionStyled = styled.div`
   width: 100%;
   padding: 20px 0;

   & .titulo-principal {
      width: 100%;
      /* height: 70px; */
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      border-bottom: 3px solid rgba(gray, 0.15);
      h1 {
         margin-left: 20px;
         font-weight: 600;
         font-size: 1.2rem;
         color: rgba($colorTexto, 0.8);
      }
   }
   & .regresar {
      color: $color1;
      height: 20px;
      display: flex;
      align-items: center;
      text-decoration: none;
      font-weight: 500;
      margin-right: 20px;
      svg {
         margin-right: 10px;
      }
   }

   & .cajas {
      width: 70%;
      /* height: 400px; */
      margin: 0 auto;
      @media screen and (max-width: 700px) {
         width: 95%;
      }
      & .cajas-form {
         width: 100%;
         display: flex;
         justify-content: center;

         & form {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            @media screen and (max-width: 700px) {
               width: 90%;
               justify-content: space-between;
            }
            .mensaje {
               width: 80%;
               display: flex;
               margin: auto;
               // margin: 5px 0;
            }
            & .texto {
               display: flex;
               flex-direction: column;
            }

            & .inputs {
               display: flex;
               flex-direction: column;
            }

            & .texto,
            .inputs,
            .boton {
               width: 100%;
               display: flex;
               /* height: 70px; */
               justify-content: center;
               align-items: center;
               text-align: center;

               & p {
                  font-size: 1.4em;
                  color: $colorTexto;
                  font-weight: 500;
               }
            }

            & .titulo {
               color: $colorTexto;
               width: 100%;
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               height: 100px;
               text-align: center;
            }
            & .inputs {
               justify-content: space-evenly;

               & label {
                  color: $colorTexto;
                  font-weight: 500;
               }

               & input {
                  width: 60%;
                  padding: 7px 10px;
                  font-size: 1em;
                  color: $colorTexto;
               }
            }

            .boton {
               input {
                  @include botonEnviar;
               }
            }
         }
      }
   }
`;
