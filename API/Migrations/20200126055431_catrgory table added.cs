using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class catrgorytableadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "Foods",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Catgories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Value = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Catgories", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Catgories");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Foods");
        }
    }
}
