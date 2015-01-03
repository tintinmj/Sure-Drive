using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

/// <summary>
/// Summary description for ClsBookingHandler
/// </summary>
public class ClsBookingHandler
{
    private ClsDataAccess access;
	public ClsBookingHandler()
	{
        access = new ClsDataAccess();
	}

    public bool AddBooking(ClsBooking booking)
    {
        bool result = false;
        try
        {
            string query = "Insert into " + Tables.Booking + " values('" 
                + booking.CarRegisterId + "','" 
                + booking.UserEmail + "','" 
                + booking.PickUpCity + "','" 
                + booking.PickUpAddress + "','" 
                + booking.PickUpLandMark + "','"
                + booking.PickUpDate + "','" 
                + booking.PickUpTime + "')";
           
            access.ExecuteQuery(query);
            result = true;
        }
        catch(Exception ex)
        {
            return false;
        }
        return result;
    }

    public bool UpdateBooking(ClsBooking booking, int bid)
    {
        string query = "Update " + Tables.Booking 
            + " set cregid = '" + booking.CarRegisterId
            + "', uemail = '" + booking.UserEmail
            + "', bpickupcity = '" + booking.PickUpCity
            + "', bpickupaddress = '" + booking.PickUpAddress
            + "', bpickuplandmark= '" + booking.PickUpLandMark
            + "', bpickupdate = '" + booking.PickUpDate
            + "', bpickuptime = '" + booking.PickUpTime
            + "' where bid = '" 
            + bid + "'";

        access.ExecuteQuery(query);
        return true;
    }

    public bool DeleteBooking(int bid)
    {
        string query = "delete from " + Tables.Booking + " where bid = '" + bid + "'";
        access.ExecuteQuery(query);
        return true;
    }

    public DataSet GetDetails()
    {
        // SQLInjection :P
        return access.GetData("SELECT * FROM " + Tables.Booking);
    }

    public DataSet GetDetailsByID(int bid)
    {
        string query = ClsSQL.SELECTformatter(new string[] {"*"}, Tables.Booking, "bid", bid+"");
        return access.GetData(query);
    }
}