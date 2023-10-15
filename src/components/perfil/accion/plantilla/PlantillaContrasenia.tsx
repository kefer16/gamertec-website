export const PlantillaContrasenia = () => {
   return (
      <div className="cajas-form">
         <form id="actu_contra" action="" method="POST">
            <div className="titulo">
               <label>¿Cambiaras tu contraseña? </label>
               <p>Primero deberás colocar tu contraseña actual</p>
            </div>
            <div className="inputs">
               <label>Ingrese la contraseña Actual:</label>
               <input
                  type="password"
                  placeholder="Contraseña Actual"
                  id="contra_actual"
                  title="Mínimo 8, incluir Caracteres, minúsculas, mayúsculas, números y letras"
                  pattern="[A-Za-z0-9#$!?-]{8,15}"
               />
            </div>
            <div className="inputs">
               <label>Ingrese la Nueva Contraseña:</label>
               <input
                  type="password"
                  placeholder="Contraseña Nueva"
                  id="contra_nueva"
                  title="Mínimo 8, incluir Caracteres, minúsculas, mayúsculas, números y letras"
                  pattern="[A-Za-z0-9#$!?-]{8,15}"
               />
            </div>
            <div className="inputs">
               <label>Repita la Nueva Contraseña: </label>
               <input
                  type="password"
                  placeholder="Rep. Contraseña Nueva"
                  id="rep_nueva"
                  title="Mínimo 8, incluir Caracteres, minúsculas, mayúsculas, números y letras"
                  pattern="[A-Za-z0-9#$!?-]{8,15}"
               />
            </div>

            <div className="boton">
               <input type="submit" value="Actualizar" />
            </div>
         </form>
      </div>
   );
};
