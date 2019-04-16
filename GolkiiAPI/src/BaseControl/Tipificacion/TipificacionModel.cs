using System;
namespace GolkiiAPI.src.BaseControl.Tipificacion
{
    public class TipificacionModel
    {
        public TipificacionModel(string idTipificacion, string tipificacion)
        {
            this.idTipificacion = idTipificacion;
            this.tipificacion = tipificacion;
        }
        public string idTipificacion { get; set; }
        public string tipificacion { get; set; }
    }
}
