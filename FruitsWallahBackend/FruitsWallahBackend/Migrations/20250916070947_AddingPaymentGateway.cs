using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FruitsWallahBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddingPaymentGateway : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Amount",
                table: "OrderTransactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "OrderTransactions",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "RazorpaySignature",
                table: "OrderTransactions",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "TransactionOrderID",
                table: "OrderTransactions",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "TransactionOrderID",
                table: "Orders",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "OrderTransactions");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "OrderTransactions");

            migrationBuilder.DropColumn(
                name: "RazorpaySignature",
                table: "OrderTransactions");

            migrationBuilder.DropColumn(
                name: "TransactionOrderID",
                table: "OrderTransactions");

            migrationBuilder.DropColumn(
                name: "TransactionOrderID",
                table: "Orders");
        }
    }
}
