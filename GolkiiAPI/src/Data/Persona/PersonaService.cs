using GolkiiAPI.src.Response;
using Microsoft.AspNetCore.Http;

namespace GolkiiAPI.src.Data.Persona
{
    internal class PersonaService
    {
        PersonaFactory Factory = new PersonaFactory();

        private ResponseModel PC(PersonaModel P) {
            var Bc = Factory.GetBancosDePersona(P.idPersona);
            var Tl = Factory.GetTelefonosDePersona(P.idPersona);
            var _PC = new PersonaCompleta()
            {
                DatosGenerales = P,
                Bancos = Bc,
                Telefonos = Tl
            };
            ResponseModel R = new ResponseModel()
            {
                StatusCode = StatusCodes.Status200OK,
                Message = "Registro encontrado",
                Value = _PC
            };
            return R;
        }

        internal ResponseModel GetPersonaByCedula(string ced)
        {
            var P = Factory.GetPersonaByCedula(ced);
            if (P is null)
            {
                ResponseModel R = new ResponseModel()
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = "El ID de persona proporcionado no esta asociado a ningun registro",
                    Value = null
                };
                return R;
            }
            else
            {
                return PC(P);
            }
        }

        internal ResponseModel GetPersonaByTelefono(string Telefono)
        {
            var P = Factory.GetPersonaByTelefono(Telefono);

            if (P is null)
            {
                ResponseModel R = new ResponseModel()
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = "El telefono proporcionado no esta asociado a ninguna persona",
                    Value = null
                };
                return  R;
            }
            else
            {
                return PC(P);
            }
        }
    }
}