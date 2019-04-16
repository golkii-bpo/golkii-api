using System;
namespace GolkiiAPI.src.GOLKII.Workers
{
    public class WorkerModel
    {
        public int ID { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Cedula { get; set; }
        public DateTime FNacimiento { get; set; }
        public DateTime FIngreso { get; set; }
        public DateTime FModificacion { get; set; }
        public DateTime FRetiro { get; set; }
        public Boolean Estado { get; set; }
    }
}
