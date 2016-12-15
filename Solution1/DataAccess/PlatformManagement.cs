﻿using DataAccess.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace DataAccess
{
    public class PlatformManagement : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {

        public DbSet<Mark> Marks { get; set; }

        public DbSet<Module> Modules { get; set; }

        public DbSet<Course> Courses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = "User ID=student;Password=student;Host=localhost;Port=5432;Database=solution;Pooling=true;";
            optionsBuilder.UseNpgsql(connectionString);
            base.OnConfiguring(optionsBuilder);
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Obs: Requires running 'CREATE EXTENSION "uuid-ossp";' on the database
            builder.HasPostgresExtension("uuid-ossp");

            MarkSetUp(builder);

            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }

        private void MarkSetUp(ModelBuilder builder)
        {
            builder.Entity<Mark>().HasKey(mark => new { mark.ModuleId, mark.UserId });
        }

    }
}
