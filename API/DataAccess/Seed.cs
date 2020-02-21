using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.DataAccess
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(!context.Foods.Any())
            {
                var foods = new List<Food>
                {
                    new Food {
                        Name = "Roti",
                        Ingrident1 = "Atta",
                        Ingrident2 = "Namak",
                        Ingrident3 = "",
                        Ingrident4 = "",
                        Ingrident5 = "",
                        Ingrident6 = "",
                        

                    },
                     new Food {
                        Name = "Palak Panner",
                        Ingrident1 = "Pakal",
                        Ingrident2 = "Panner",
                        Ingrident3 = "Panni",
                        Ingrident4 = "",
                        Ingrident5 = "",
                        Ingrident6 = "",
                        

                    },
                };

                context.Foods.AddRange(foods);
                context.SaveChanges();
            }
            if(!context.Catgories.Any())
            {
               var catgories = new List<Category>
               {
                   new Category { Value = "Home Made"},
                   new Category { Value = "Desserts"},
                   new Category {Value = "Spicy"},
                   new Category { Value ="Drinks"},
                   new Category { Value ="Others"}
               };
               context.Catgories.AddRange(catgories);
               context.SaveChanges();
            }
            if (!context.BankAccounts.Any())
            {
                var bankAccount = new BankAccount
                {
                    Balance = 2000
                };
                context.Add(bankAccount);
                context.SaveChanges();
            }
        }
    }
}