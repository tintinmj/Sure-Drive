using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsCar
/// </summary>
public class ClsCar
{
	public ClsCar()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public string CarRegisterId { set; get; }
    public string CarManufacturer { set; get; }
    public string CarModel { set; get; }
    public int CarSeat { set; get; }
    public float CarRatePerKM { set; get; }
    public float CarRatePerHR { set; get; }
    public int CarMinHR { set; get; }
    public string CarAcOrNonAc { set; get; }
    public string CarPhotoLink { set; get; }
}