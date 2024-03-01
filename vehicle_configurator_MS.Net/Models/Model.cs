using System;
using System.Collections.Generic;

namespace vehicle_configurator.Models;

public partial class Model
{
    public long Id { get; set; }

    public string ImagePath { get; set; } = null!;

    public int MinQty { get; set; }

    public string ModName { get; set; } = null!;

    public int Price { get; set; }

    public int? SafetyRating { get; set; }

    public long ManuId { get; set; }

    public int SegId { get; set; }

    public virtual ICollection<AlternateComponent> AlternateComponents { get; } = new List<AlternateComponent>();

    public virtual Manufacturer Manu { get; set; } = null!;

    public virtual Segment Seg { get; set; } = null!;

    public virtual ICollection<Vehicle> Vehicles { get; } = new List<Vehicle>();
}
