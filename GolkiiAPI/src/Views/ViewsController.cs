using GolkiiAPI.src.Response;
using System;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GolkiiAPI.src.Views
{
    [Route("Api/Views")]
    [ApiController]
    public class ViewsController: ControllerBase
    {
        private readonly ViewsService service = new ViewsService();

        private ActionResult<ResponseModel> StatusHandler(ResponseModel R) => R.StatusCode == StatusCodes.Status404NotFound ? NotFound(R) : new ActionResult<ResponseModel>(R);

        [EnableCors]
        [HttpGet("EndToEnd/CalledCount")]
        [ProducesResponseType(typeof(ResponseModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ResponseModel> Get_EndToEnd_CC() => StatusHandler(service.Get_EndToEndView_CC());

        [EnableCors]
        [HttpGet("EndToEnd/CalledTime/{From}/{To}")]
        [ProducesResponseType(typeof(ResponseModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ResponseModel> Get_EndToEnd_Time(string From, string To) {
            try {
                DateTime startDate = DateTime.Parse(From);
                DateTime endDate = DateTime.Parse(To);
                return StatusHandler(service.Get_EndToEndView_TIME(startDate, endDate));
            }
            catch {
                return StatusHandler(new ResponseModel() { 
                    Message = "Error en formato de fechas",
                    StatusCode = 404,
                    Value = null
                });
            }
        }

        [EnableCors]
        [HttpGet("DiableLeadsMenu")]
        [ProducesResponseType(typeof(ResponseModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ResponseModel> Get_DiableLeadsMenu() => StatusHandler(service.Get_DiableLeadsMenuView());
    }
}
