﻿
using System.Threading.Tasks;
using GolkiiAPI.src.Response;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GolkiiAPI.src.BaseControl.Persona
{
    [Route("api/persona")]
    [ApiController]
    public class PersonaController: ControllerBase
    {
        private readonly PersonaService service = new PersonaService();

        private ActionResult<ResponseModel> StatusHandler(ResponseModel R) => R.StatusCode == StatusCodes.Status404NotFound ? NotFound(R) : new ActionResult<ResponseModel>(R);

        /// <summary>
        /// Gets the persona by cedula.
        /// </summary>
        /// <remarks>
        /// Retorna un JSON    
        /// <br/><br/>
        /// 
        ///     {
        ///         StatusCode: INT
        ///         Menssage:   STRING
        ///         Value:      OBJECT   
        ///     }
        /// 
        /// <br/><br/>
        /// 
        /// En caso que el Status code sea de error el Value se mantendara vacio, en caso contrario contendra un objeto PERSONA el contiene lo siguientes campos:
        /// 
        /// <br/><br/>
        /// 
        ///         {
        ///             "edad":         INT,
        ///             "sexo":         STRING,
        ///             "salario":      FLOAT,
        ///             "salarioINSS":  FLOAT,
        ///             "statusCredex": STRING,
        ///             "departamento": STRING,
        ///             "municipio":    STRING,
        ///             "domicilio":    STRING,
        ///             "origen":       STRING,
        ///             "idPersona":    INT,
        ///             "nombre":       STRING,
        ///             "cedula":       STRING
        ///         }
        /// </remarks>
        /// <returns>The persona by cedula.</returns>
        /// <param name="cedula">011206901234A</param>
        /// <param name="campaign">Campaign</param>
        [EnableCors]
        [HttpGet("cedula/{cedula}/campaign/{campaign}")]
        [ProducesResponseType(typeof(ResponseModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ResponseModel> GetPersonaByCedula(string cedula, string campaign) => StatusHandler(service.GetPersonaByCedula(cedula, campaign));


        /// <summary>
        /// Gets the persona by telefono.
        /// </summary>
        /// <remarks>
        /// Retorna un JSON    
        /// <br/><br/>
        /// 
        ///     {
        ///         StatusCode: INT
        ///         Menssage:   STRING
        ///         Value:      OBJECT   
        ///     }
        /// 
        /// <br/><br/>
        /// 
        /// En caso que el Status code sea de error el Value se mantendara vacio, en caso contrario contendra un objeto PERSONA el contiene lo siguientes campos:
        /// 
        /// <br/><br/>
        /// 
        ///         {
        ///             "edad":         INT,
        ///             "sexo":         STRING,
        ///             "salario":      FLOAT,
        ///             "salarioINSS":  FLOAT,
        ///             "statusCredex": STRING,
        ///             "departamento": STRING,
        ///             "municipio":    STRING,
        ///             "domicilio":    STRING,
        ///             "origen":       STRING,
        ///             "idPersona":    INT,
        ///             "nombre":       STRING,
        ///             "cedula":       STRING
        ///         }
        /// </remarks>
        /// <returns>The persona by cedula.</returns>
        /// <param name="telefono">87654321</param>
        /// <param name="campaign">Campaign</param>
        [EnableCors]
        [HttpGet("telefono/{telefono}/campaign/{campaign}")]
        [ProducesResponseType(typeof(ResponseModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ResponseModel> GetPersonaByTelefono(string telefono, string campaign) => StatusHandler(service.GetPersonaByTelefono(telefono, campaign));

            }
}
