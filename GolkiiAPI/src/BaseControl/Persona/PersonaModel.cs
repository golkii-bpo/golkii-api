using System;
using System.Collections.Generic;
using GolkiiAPI.src.Shared;

namespace GolkiiAPI.src.BaseControl.Persona
{

    public class PersonaModel : AbstractPersonaModel
    {
        /// <summary>
        /// Gets or sets the edad.
        /// </summary>
        /// <value>The edad.</value>
        public int? edad { get; set; }
        /// <summary>
        /// Gets or sets the sexo.
        /// </summary>
        /// <value>The sexo.</value>
        public string sexo { get; set; }
        /// <summary>
        /// Gets or sets the salario.
        /// </summary>
        /// <value>The salario.</value>
        public float salario { get; set; }
        /// <summary>
        /// Gets or sets the status credex.
        /// </summary>
        /// <value>The status credex.</value>
        public string statusCredex { get; set; }
        /// <summary>
        /// Gets or sets the departamento.
        /// </summary>
        /// <value>The departamento.</value>
        public string departamento { get; set; }
        /// <summary>
        /// Gets or sets the municipio.
        /// </summary>
        /// <value>The municipio.</value>
        public string municipio { get; set; }
        /// <summary>
        /// Gets or sets the domicilio.
        /// </summary>
        /// <value>The domicilio.</value>
        public string domicilio { get; set; }
    }

    public class PersonaCompleta 
    {
        public PersonaModel DatosGenerales;
        public List<GolkiiAPI.src.BaseControl.Tarjeta.TarjetaModel> Tarjetas;
        public List<GolkiiAPI.src.BaseControl.Telefono.TelefonoModel> Telefonos;
    }
}
