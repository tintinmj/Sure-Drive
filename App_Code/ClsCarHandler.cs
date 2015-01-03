using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsCarHandler
/// </summary>
public class ClsCarHandler
{
    private ClsDataAccess access;
	public ClsCarHandler()
	{
        access = new ClsDataAccess();
	}

    public bool AddCar(ClsCar car)
    {
        bool result = false;
        if (!hasDuplicate(car.CarRegisterId))
        {
            string query = "Insert into " + Tables.Car + " values('" 
                + car.CarRegisterId.ToUpper() + "','" 
                + car.CarManufacturer + "','" 
                + car.CarModel + "','" 
                + car.CarSeat + "','" 
                + car.CarRatePerKM + "','" 
                + car.CarRatePerHR + "','" 
                + car.CarMinHR + "','" 
                + car.CarAcOrNonAc + "','" 
                + car.CarPhotoLink + "')";

            access.ExecuteQuery(query);
            result = true;
        }
        return result;
    }

    /// <summary>
    /// search the database for the duplicate car id.
    /// </summary>
    /// <param name="carRegID"> car registration id </param>
    /// <returns>ture</returns> if car registration id already in used
    public bool hasDuplicate(string carRegID)
    {
        bool result = false;
        string query = "select * from " + Tables.Car + " where cregid = '" + carRegID + "'";
        DataSet ds = access.GetData(query);

        if(ds.Tables[0].Rows.Count > 0)
        {
            result = true;
        }
        return result;
    }

    public bool UpdateCar(ClsCar car)
    {
        string query = "Update " + Tables.Car 
            + " set cmanf = '" + car.CarManufacturer 
            + "', cmodel = '" + car.CarModel 
            + "', cseat = '" + car.CarSeat 
            + "', crateperkm = '" + car.CarRatePerKM
            + "', crateperhr = '" + car.CarRatePerHR
            + "', cminhr = '" + car.CarMinHR
            + "', cacornonac = '" + car.CarAcOrNonAc
            + "', cphotolink = '" + car.CarPhotoLink
            + "' where cregid = '" 
            + car.CarRegisterId.ToUpper() + "'";

        access.ExecuteQuery(query);
        return true;
    }

    public bool DeleteCar(string carRegID)
    {
        string query = "delete from " + Tables.Car + " where cregid = '" + carRegID + "'";
        access.ExecuteQuery(query);
        return true;
    }

    public DataSet GetDetails()
    {
        // SQLInjection :P
        return GetDetailsByID("' OR 1=1 -- ");
    }

    public DataSet GetDetailsByID(string ID)
    {
        string query = "select * from " + Tables.Car + " where cregid = '" + ID + "'";
        return access.GetData(query);
    }
}