namespace GolkiiAPI.src.Data.Bancaria
{
    public struct TarjetaModel
    {
        public BancoModel Banco;
        public string Tipo;
        public TarjetaModel(BancoModel banco, string tipo) { Banco = banco; Tipo = tipo; } 
    }
}
