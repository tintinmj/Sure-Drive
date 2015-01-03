﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsDataAccess
/// </summary>
public class ClsDataAccess
{
    private string connectionString = @"Data Source=(LocalDB)\v11.0;AttachDbFilename=G:\CarRentalServices\App_Data\CarRentalSerrviceDB.mdf;Integrated Security=True";
    SqlConnection con;

	public ClsDataAccess()
	{
        con = new SqlConnection(connectionString);
	}

    private SqlConnection getConnection()
    {
        return this.con;
    }

    private void open()
    {
        con.Open();
    }

    private void close()
    {
        con.Close();
    }

    public void ExecuteQuery(string query)
    {
        open();
        SqlCommand com = new SqlCommand(query, getConnection());
        com.ExecuteNonQuery();
        close();
    }
        
    public DataSet GetData(string query)
    {
        SqlDataAdapter da = new SqlDataAdapter(query, getConnection());
        DataSet ds = new DataSet();
        da.Fill(ds);
        return ds;
    }
}