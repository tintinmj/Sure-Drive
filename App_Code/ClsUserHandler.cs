using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsUserHandler
/// </summary>
public class ClsUserHandler
{
    private ClsDataAccess access;
	public ClsUserHandler()
	{
        access = new ClsDataAccess();
	}

    public bool AddUser(ClsUser user)
    {
        bool result = false;
        if (!hasDuplicate(user.Email))
        {
            string query = "Insert into " + Tables.User + " values('" 
                + user.Name + "','" 
                + user.MobileNumber + "','" 
                + user.Email + "','" 
                + user.Address + "','" 
                + user.Password + "')";

            access.ExecuteQuery(query);
            result = true;
        }
        return result;
    }

    /// <summary>
    /// search the database for the duplicate car id.
    /// </summary>
    /// <param name="userEmail"> car registration id </param>
    /// <returns>ture</returns> if car registration id already in used
    public bool hasDuplicate(string userEmail)
    {
        bool result = false;
        string query = ClsSQL.SELECTformatter(new string[] { "*" }, Tables.User, "uemail", userEmail);
        DataSet ds = access.GetData(query);

        if(ds.Tables[0].Rows.Count > 0)
        {
            result = true;
        }
        return result;
    }

    public bool UpdateUser(ClsUser user)
    {
        string query = "Update " + Tables.User 
            + " set uname = '" + user.Name
            + "', umobile = '" + user.MobileNumber
            + "', uaddress = '" + user.Address
            + "', upassword = '" + user.Password
            + "' where uemail = '" 
            + user.Email + "'";

        access.ExecuteQuery(query);
        return true;
    }

    public bool DeleteUser(string email)
    {
        string query = "delete from " + Tables.User + " where uemail = '" + email + "'";
        access.ExecuteQuery(query);
        return true;
    }

    public DataSet GetDetails()
    {
        // SQLInjection :P
        return GetDetailsByEmail("' OR 1=1 -- ");
    }

    public DataSet GetDetailsByEmail(string email)
    {
        string query = ClsSQL.SELECTformatter(new string[] {"*"}, Tables.User, "email", email);
        return access.GetData(query);
    }
}