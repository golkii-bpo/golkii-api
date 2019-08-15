using System;
namespace GolkiiAPI.src.Data.Telefonia
{
    public struct OperadoraModel
    {
        public string Name;
        public OperadoraModel(string name) { Name = name; }
    }
    public struct TelefonoModel
    {
        public int Numero;
        public OperadoraModel Operadora;
        public TelefonoModel(int numero,OperadoraModel operadora) { Numero = numero; Operadora = operadora; }
    }
}
