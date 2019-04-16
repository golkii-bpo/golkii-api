namespace GolkiiAPI.src.Shared
{
    public abstract class AbstractPersonaModel
    {
        /// <summary>
        /// Gets or sets the identifier persona.
        /// </summary>
        /// <value>The identifier persona.</value>
        public int idPersona { get; set; }
        /// <summary>
        /// Gets or sets the nombre.
        /// </summary>
        /// <value>The nombre.</value>
        public string nombre { get; set; }
        /// <summary>
        /// Gets or sets the cedula.
        /// </summary>
        /// <value>The cedula.</value>
        public string cedula { get; set; }
    }
}
