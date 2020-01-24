namespace API.Helper
{
    public class QueryParams
    {
        public int? Count { get; set; }
        public int? Page { get; set; }
        public int? PageSize { get; set; } = 5;
        public int Offset { get; set; }
        
    }
}