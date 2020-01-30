using System;
using System.Threading.Tasks;
using API.DataAccess;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class AGGridHub : Hub
    {
        private readonly DataContext _context;
        public AGGridHub(DataContext context)
        {
            _context = context;
        }

        public async Task SendEdit(EditReceiveDto edit)
        {
            var food = await _context.Foods.FindAsync(edit.Id);
            if(food == null)
                throw new Exception("Food is not present in the system");
            food.EditField = edit.Field;
            await _context.SaveChangesAsync();
            await Clients.Others.SendAsync("ReceiveEdit", edit);
        }

        public async Task SendEditComplete(EditReceiveDto edit)
        {
            var food = await _context.Foods.FindAsync(edit.Id);
            if(food == null)
                throw new Exception("Food is not present in the system");
            food.EditField = null;
            await _context.SaveChangesAsync();
            await Clients.Others.SendAsync("SendEditComplete", edit);
        }

         public async Task SendUpdatedFood(UpdateDto updatedFood)
        {
            var food = await _dataContext.Foods.FindAsync(updatedFood.Id);
            if (food == null)
                throw new Exception("food item is not present");
            food.Name = updatedFood.Name ?? food.Name;
            food.Category = updatedFood.Category;
            food.Ingrident1 = updatedFood.Ingrident1 ?? food.Ingrident1;
            food.Ingrident2 = updatedFood.Ingrident2 ?? food.Ingrident2;
            food.Ingrident3 = updatedFood.Ingrident3 ?? food.Ingrident3;
            food.Ingrident4 = updatedFood.Ingrident4 ?? food.Ingrident4;
            food.Ingrident5 = updatedFood.Ingrident5 ?? food.Ingrident5;
            food.Ingrident6 = updatedFood.Ingrident6 ?? food.Ingrident6;


            var success = await _dataContext.SaveChangesAsync() >= 0;
            if (success)
            {
                await Clients.All.SendAsync("RecieveUpdatedFood", updatedFood);
            }

        }
    }
}