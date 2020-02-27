using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using MimeKit;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController: ControllerBase
    {
        [HttpGet]
       public async Task<ActionResult> Message()
       {
           var message = new MimeMessage();
           message.From.Add(new MailboxAddress("POC", "dagardeepak88@gmail.com"));
           message.To.Add(new MailboxAddress("Deepak Dagar", "selfishdeepak@gmail.com"));

           message.Subject = "test email using asp.net core api.";
           message.Body = new TextPart("plain")
           {
               Text = "hello world email"
           };
           using(var client = new SmtpClient())
           {
               client.Connect("smtp.gmail.com", 587, false);
              await client.AuthenticateAsync("dagardeepak88@gmail.com","mynameisdagar1");
               client.Send(message);
               await client.DisconnectAsync(true);
           }

           return Ok("mail sent");

       }
    }
}