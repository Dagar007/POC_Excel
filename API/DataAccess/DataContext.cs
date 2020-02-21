using API.DataAccess.Configuration;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }
        public DbSet<Food> Foods { get; set; }
        public DbSet<Category> Catgories { get; set; }
        public DbSet<BankAccount> BankAccounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ConcurrentAccountWithRowVersionEntityTypeConfiguration());
        }
    }
}