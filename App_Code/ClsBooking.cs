using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsBooking
/// </summary>
public class ClsBooking
{
	public ClsBooking()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string CarRegisterId { set; get; }
    public string UserEmail { set; get; }
    public string PickUpCity { set; get; }
    public string PickUpAddress { set; get; }
    public string PickUpLandMark { set; get; }
    public string PickUpDate { set; get; }
    public string PickUpTime { set; get; }

}