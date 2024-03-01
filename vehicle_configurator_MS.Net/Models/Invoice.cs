using System;
using System.Collections.Generic;

namespace vehicle_configurator.Models;

public partial class Invoice
{
    public int Id { get; set; }

    public byte[]? AltCompId { get; set; }

    public int ModelId { get; set; }

    public int OrderedQty { get; set; }

    public int UserId { get; set; }

    public int ModelPrice { get; set; }

    public int TotalPrice { get; set; }
}
