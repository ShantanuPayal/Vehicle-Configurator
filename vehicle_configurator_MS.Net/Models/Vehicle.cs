using System;
using System.Collections.Generic;

namespace vehicle_configurator.Models;

public partial class Vehicle
{
    public long Id { get; set; }

    public string CompType { get; set; } = null!;

    public string IsConfigurable { get; set; } = null!;

    public long CompId { get; set; }

    public long ModId { get; set; }

    public virtual Component Comp { get; set; } = null!;

    public virtual Model Mod { get; set; } = null!;
}
