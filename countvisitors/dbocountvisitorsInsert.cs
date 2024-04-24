using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.Sql;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Company.Function
{
    public static class dbocountvisitorsInsert
    {
        // Visit https://aka.ms/sqlbindingsoutput to learn how to use this output binding
        [FunctionName("dbocountvisitorsInsert")]
        public static async Task<CreatedResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            [Sql("[dbo].[count_visitors]", "SqlConnectionString")] IAsyncCollector<ToDoItem> output,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger with SQL Output Binding function processed a request.");

            // Generate a random visitor count
            Random random = new Random();
            int visitorCount = random.Next();

            // Create a new ToDoItem with auto-generated ID and visitor count
            ToDoItem todoItem = new ToDoItem
            {
                id = visitorCount,
                visitor_name = visitorCount // Random visitor count
            };

            // Add the ToDoItem to the SQL database
            await output.AddAsync(todoItem);

            // Return a CreatedResult with the inserted item
            return new CreatedResult(req.Path, todoItem);
        }
    }

    public class ToDoItem
    {
        public int id { get; set; } // Auto-generated ID
        public int visitor_name { get; set; } // Random visitor count
    }
}
