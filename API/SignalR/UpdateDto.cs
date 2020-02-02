using System;
using API.Models;

namespace API.SignalR
{
    public class UpdateDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Category { get; set; }
        public string Ingrident1 { get; set; }
        public string Ingrident2 { get; set; }
        public string Ingrident3 { get; set; }
        public string Ingrident4 { get; set; }
        public string Ingrident5 { get; set; }
        public string Ingrident6 { get; set; }
        public bool EditMode { get; set; }
        public string EditField { get; set; }
        public int Index { get; set; }
    }
}