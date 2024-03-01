using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
//using System.ComponentModel.DataAnnotations.Schema;

namespace vehicle_configurator.Models;

public partial class User
{
    
    public int Userid { get; set; }

    public string? AddressLine1 { get; set; }

    public string? AddressLine2 { get; set; }

    
    public string? City { get; set; }


    public string? CompanyName { get; set; }

    
   
    public string Email { get; set; }

    public string? GstNumber { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "Password correction")]
    [Column("password")]
    public string? Password { get; set; }

   
   // public string? telephone { get; set;}

    
    public string? PinCode { get; set; }

    public string? State { get; set; }



    public string? Telephone { get; set; }

    public string? Username { get; set; }
    
}
