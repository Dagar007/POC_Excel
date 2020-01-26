using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class editModeColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EditMode",
                table: "Foods",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EditMode",
                table: "Foods");
        }
    }
}
