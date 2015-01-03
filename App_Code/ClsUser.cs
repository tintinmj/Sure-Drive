using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsUser
/// </summary>
public class ClsUser
{
	public ClsUser()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public string Name { set; get; }
    public string MobileNumber { set; get; }
    public string Email { set; get; }
    public string Address { set; get; }
    public string Password { set; get; }
}