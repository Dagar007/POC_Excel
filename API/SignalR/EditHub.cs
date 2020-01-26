using System;
using System.Threading.Tasks;
using API.DataAccess;
using API.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class EditHub : Hub
    {
        private readonly DataContext _dataContext;
        public EditHub(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task SendEdit(EditDto edit)
        {
            await Clients.Others.SendAsync("ReceiveEdit", edit.Id);
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

        public async Task SendAdd(Food food)
        {
            _dataContext.Foods.Add(food);
            if (await _dataContext.SaveChangesAsync() > 0)

                await Clients.Others.SendAsync("ReceiveAdd", food);
        }
        public async Task SendDelete(Guid id)
        {
            var food = await _dataContext.Foods.FindAsync(id);
            if (food == null)
                throw new Exception("Can't find food");
            _dataContext.Foods.Remove(food);
            if (await _dataContext.SaveChangesAsync() > 0)
            {
                await Clients.Others.SendAsync("ReceiveDelete");
            }
        }


        public async Task SendEditComplete(EditDto edit)
        {
            await Clients.Others.SendAsync("ReceiveEditComplete", edit.Id);
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

        }
        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

        }

    }
}