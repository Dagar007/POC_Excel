using System;

namespace API.SignalR
{
    public class EditReceiveDto
    {
        public Guid Id { get; set; }
        public string Field { get; set; }
        public int Index { get; set; }
    }
}