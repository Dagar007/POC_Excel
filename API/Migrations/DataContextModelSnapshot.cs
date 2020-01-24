﻿// <auto-generated />
using System;
using API.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0");

            modelBuilder.Entity("API.Models.Food", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Ingrident1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Ingrident2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Ingrident3")
                        .HasColumnType("TEXT");

                    b.Property<string>("Ingrident4")
                        .HasColumnType("TEXT");

                    b.Property<string>("Ingrident5")
                        .HasColumnType("TEXT");

                    b.Property<string>("Ingrident6")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Foods");
                });
#pragma warning restore 612, 618
        }
    }
}
