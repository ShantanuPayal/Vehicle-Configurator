using System;
using System.Collections.Generic;
//using vehicle_configurator.DbRepos;
using vehicle_configurator.Models;
using Microsoft.EntityFrameworkCore;
//using vehicle_configurator.Models;

namespace vehicle_configurator.Repository;

public partial class ScottDbContext : DbContext
{
    public ScottDbContext()
    {
    }

    public ScottDbContext(DbContextOptions<ScottDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AlternateComponent> AlternateComponents { get; set; }

    public virtual DbSet<Component> Components { get; set; }

    public virtual DbSet<Invoice> Invoices { get; set; }

    public virtual DbSet<Manufacturer> Manufacturers { get; set; }

    public virtual DbSet<Model> Models { get; set; }

    public virtual DbSet<Segment> Segments { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Vehicle> Vehicles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("Server=localhost;Database=vehicle_configurator;user id=root;password=root");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AlternateComponent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("alternate_components");

            entity.HasIndex(e => e.CompId, "FK3u63qxa2hslju1ol1tlgs6n4j");

            entity.HasIndex(e => e.ModId, "FKplgx3kg99og25pr0pvw1x4try");

            entity.HasIndex(e => e.AltCompId, "FKsk85p1u27ykw0kv0878xpucat");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AltCompId).HasColumnName("alt_comp_id");
            entity.Property(e => e.CompId).HasColumnName("comp_id");
            entity.Property(e => e.DeltaPrice).HasColumnName("delta_price");
            entity.Property(e => e.ModId).HasColumnName("mod_id");

            entity.HasOne(d => d.AltComp).WithMany(p => p.AlternateComponentAltComps)
                .HasForeignKey(d => d.AltCompId)
                .HasConstraintName("FKsk85p1u27ykw0kv0878xpucat");

            entity.HasOne(d => d.Comp).WithMany(p => p.AlternateComponentComps)
                .HasForeignKey(d => d.CompId)
                .HasConstraintName("FK3u63qxa2hslju1ol1tlgs6n4j");

            entity.HasOne(d => d.Mod).WithMany(p => p.AlternateComponents)
                .HasForeignKey(d => d.ModId)
                .HasConstraintName("FKplgx3kg99og25pr0pvw1x4try");
        });

        modelBuilder.Entity<Component>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("components");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CompName)
                .HasMaxLength(255)
                .HasColumnName("comp_name");
        });

        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("invoices");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AltCompId)
                .HasMaxLength(255)
                .HasColumnName("alt_comp_id");
            entity.Property(e => e.ModelId).HasColumnName("model_id");
            entity.Property(e => e.ModelPrice).HasColumnName("model_price");
            entity.Property(e => e.OrderedQty).HasColumnName("ordered_qty");
            entity.Property(e => e.TotalPrice).HasColumnName("total_price");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<Manufacturer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("manufacturers");

            entity.HasIndex(e => e.SegId, "FKvt86n4h6jurg9ofnq26txaw7");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ManuName)
                .HasMaxLength(255)
                .HasColumnName("manu_name");
            entity.Property(e => e.SegId).HasColumnName("seg_id");

            entity.HasOne(d => d.Seg).WithMany(p => p.Manufacturers)
                .HasForeignKey(d => d.SegId)
                .HasConstraintName("FKvt86n4h6jurg9ofnq26txaw7");
        });

        modelBuilder.Entity<Model>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("models");

            entity.HasIndex(e => e.SegId, "FKeoehxbf066gnexos8p4o9fn5e");

            entity.HasIndex(e => e.ManuId, "FKr7t3perk8n5abjcuk8j3kn9ko");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ImagePath)
                .HasMaxLength(255)
                .HasColumnName("image_path");
            entity.Property(e => e.ManuId).HasColumnName("manu_id");
            entity.Property(e => e.MinQty).HasColumnName("min_qty");
            entity.Property(e => e.ModName)
                .HasMaxLength(255)
                .HasColumnName("mod_name");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.SafetyRating)
                .HasDefaultValueSql("'5'")
                .HasColumnName("safety_rating");
            entity.Property(e => e.SegId).HasColumnName("seg_id");

            entity.HasOne(d => d.Manu).WithMany(p => p.Models)
                .HasForeignKey(d => d.ManuId)
                .HasConstraintName("FKr7t3perk8n5abjcuk8j3kn9ko");

            entity.HasOne(d => d.Seg).WithMany(p => p.Models)
                .HasForeignKey(d => d.SegId)
                .HasConstraintName("FKeoehxbf066gnexos8p4o9fn5e");
        });

        modelBuilder.Entity<Segment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("segments");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.SegName)
                .HasMaxLength(255)
                .HasColumnName("seg_name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Userid).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Username, "UK_sb8bbouer5wak8vyiiy4pf2bx").IsUnique();

            entity.Property(e => e.Userid).HasColumnName("userid");
            entity.Property(e => e.AddressLine1)
                .HasMaxLength(255)
                .HasColumnName("address_line1");
            entity.Property(e => e.AddressLine2)
                .HasMaxLength(255)
                .HasColumnName("address_line2");
            entity.Property(e => e.City)
                .HasMaxLength(255)
                .HasColumnName("city");
            entity.Property(e => e.CompanyName)
                .HasMaxLength(255)
                .HasColumnName("company_name");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.GstNumber)
                .HasMaxLength(255)
                .HasColumnName("gst_number");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.PinCode)
                .HasMaxLength(255)
                .HasColumnName("pin_code");
            entity.Property(e => e.State)
                .HasMaxLength(255)
                .HasColumnName("state");
            entity.Property(e => e.Telephone)
                .HasMaxLength(255)
                .HasColumnName("telephone");
            entity.Property(e => e.Username).HasColumnName("username");
        });

        modelBuilder.Entity<Vehicle>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("vehicles");

            entity.HasIndex(e => e.CompId, "FKl73vrifij29mf60p025y6uykp");

            entity.HasIndex(e => e.ModId, "FKsrd84yon700o6fgng107lhnjq");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CompId).HasColumnName("comp_id");
            entity.Property(e => e.CompType)
                .HasColumnType("enum('S','C','I','E')")
                .HasColumnName("comp_type");
            entity.Property(e => e.IsConfigurable)
                .HasColumnType("enum('Y','N')")
                .HasColumnName("is_configurable");
            entity.Property(e => e.ModId).HasColumnName("mod_id");

            entity.HasOne(d => d.Comp).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.CompId)
                .HasConstraintName("FKl73vrifij29mf60p025y6uykp");

            entity.HasOne(d => d.Mod).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.ModId)
                .HasConstraintName("FKsrd84yon700o6fgng107lhnjq");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}