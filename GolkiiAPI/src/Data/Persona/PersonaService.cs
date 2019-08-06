using System;
using System.Threading.Tasks;
using GolkiiAPI.src.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace GolkiiAPI.src.BaseControl.Persona
{
    internal class PersonaService
    {
        PersonaFactory Factory = new PersonaFactory();

        private ResponseModel PC(PersonaModel P) {
            var Tr = Factory.GetTarjetasPersona(P.idPersona);
            var Tl = Factory.GetTelefonosPersona(P.idPersona);
            var _PC = new PersonaCompleta()
            {
                DatosGenerales = P,
                Tarjetas = Tr,
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