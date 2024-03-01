using System;
using System.Collections.Generic;

namespace vehicle_configurator.Models;

public partial class Manufacturer
{
    public long Id { get; set; }

    public string ManuName { get; set; } = null!;

    public int SegId { get; set; }

    public virtual ICollection<Model> Models { get; } = new List<Model>();

    public virtual Segment Seg { get; set; } = null!;
}
