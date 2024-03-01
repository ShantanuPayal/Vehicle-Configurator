using System;
using System.Collections.Generic;

namespace vehicle_configurator.Models;

public partial class Component
{
    public long Id { get; set; }

    public string? CompName { get; set; }

    public virtual ICollection<AlternateComponent> AlternateComponentAltComps { get; } = new List<AlternateComponent>();

    public virtual ICollection<AlternateComponent> AlternateComponentComps { get; } = new List<AlternateComponent>();

    public virtual ICollection<Vehicle> Vehicles { get; } = new List<Vehicle>();
}
