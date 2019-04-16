using System;
using GolkiiAPI.src.BaseControl.Tipificacion;

namespace GolkiiAPI.src.BaseControl.Telefono
{
    public abstract class AbstracTelefonoModel
    {
        public int idTelefono { get; set; }
        public int telefono { get; set; }
        public string operadora { get; set; }
    }
    public class TelefonoModel : AbstracTelefonoModel
    {
        public int calledCount { get; set; }
        public DateTime? dateReprocessed { get; set; }
        public string user { get; set; }
        public TipificacionModel tipificacion { get; set; }
    }
}
