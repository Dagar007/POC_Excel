using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class innitialState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Foods",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Ingrident1 = table.Column<string>(nullable: true),
                    Ingrident2 = table.Column<string>(nullable: true),
                    Ingrident3 = table.Column<string>(nullable: true),
                    Ingrident4 = table.Column<string>(nullable: true),
                    Ingrident5 = table.Column<string>(nullable: true),
                    Ingrident6 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Foods", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Foods");
        }
    }
}
