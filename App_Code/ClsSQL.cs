using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsSQL
/// </summary>
public class ClsSQL
{
    public static readonly string ALL = "*";
	private ClsSQL()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    // PrintArray(new int[] {1, 3, 5, 7, 9});
    public static string SELECTformatter(string[] selections, string tablename,string primaryKeyColumName, string primaryKeyValue)
    {
        string query = "SELECT ";

        for (int i = 0; i < selections.Length - 1; i++)
        {
            query += query + selections[i] + ", ";
        }
        query += selections[selections.Length - 1] + " from ";
        query += tablename + " WHERE "
                                           + primaryKeyColumName
                                           + " = "
                                           + "'" + primaryKeyValue + "'";
        return query;
    }

    // PrintArray(new int[,] {{1,2}, {3,4}, {5,6}, {7,8}});
    public static string INSERTformatter(string tablename, string[,] columnnamesAndValues)
    {
        string query = "INSERT into " + tablename + " values ( ";
        for (int i = 0; i < columnnamesAndValues.GetLength(0) - 1; i++)
        {
            query += columnnamesAndValues[i, 0] + " = "
                       + "'" + columnnamesAndValues[i, 1] + "'" + ",";
        }
        query += columnnamesAndValues[columnnamesAndValues.GetLength(0) - 1, 0] + " = "
                           + "'" + columnnamesAndValues[columnnamesAndValues.GetLength(0) - 1, 1] + "'" + ")";
        return query;
    }

    public static string UPDATEformatter(string tablename, string[,] columnnamesAndValues,
                                                                             string primaryKeyColumName, string primaryKeyValue)
    {
        string query = "UPDATE " + tablename + " SET ";
        for (int i = 0; i < columnnamesAndValues.GetLength(0) - 1; i++)
        {
            query += columnnamesAndValues[i, 0] + " = "
                       + "'" + columnnamesAndValues[i, 1] + "'" + ",";
        }
        query += columnnamesAndValues[columnnamesAndValues.GetLength(0) - 1, 0] + " = "
                           + "'" + columnnamesAndValues[columnnamesAndValues.GetLength(0) - 1, 1] + "'";
        query += " WHERE "
                           + primaryKeyColumName
                           + " = "
                           + "'" + primaryKeyValue + "'";
        return query;
    }

    public static string DELETEformatter(string tablename, string primaryKeyColumName,
                                                                                    string primaryKeyValue)
    {
        string query = "DELETE FROM " + tablename + " WHERE" +
                                        primaryKeyColumName + " = " + "'" + primaryKeyValue + "'";
        return query;
    }
}