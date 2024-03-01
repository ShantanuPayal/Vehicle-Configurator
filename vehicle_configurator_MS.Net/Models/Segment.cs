using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace vehicle_configurator.Models;

public partial class Segment
{

    [Key]
    [Column("id")]

    public int Id { get; set; }

    //public DateTime CreatedAt { get; set; }

    public string SegName { get; set; } = null!;

    //public DateTime UpdatedAt { get; set; }

   public virtual ICollection<Manufacturer> Manufacturers { get; } = new List<Manufacturer>();

    public virtual ICollection<Model> Models { get; } = new List<Model>();
}
