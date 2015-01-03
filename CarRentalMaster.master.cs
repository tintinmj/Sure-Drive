using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class CarRentalMaster : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        lblUserName.Attributes.Add("onclick", "javascript:return false;");
        lblEnquiry.Attributes.Add("onclick", "javascript:return false;");
        if(Session["admin"] != null)
        {
            lblUserName.Text = "Welcome Admin!";
            lnkAccount.Text = "Logout";
            if (Request.Url.LocalPath.Contains("UserRegister.aspx"))
            {
                Response.Redirect("Home.aspx");
            }
        }
        else if(Session["user"] != null)
        {
            ClsUser user = (ClsUser)Session["user"];
            lblUserName.Text = "Welcome "+ user.Name + "!";
            lnkAccount.Text = "Logout";
            if(Request.Url.LocalPath.Contains("UserRegister.aspx"))
            {
                Response.Redirect("Home.aspx");
            }
        }
        else
        {
            lblUserName.Text = "";
            lnkAccount.Text = "Login";
        }
        
    }
    protected void lnkAccount_Click(object sender, EventArgs e)
    {
        if(Session.Count>0)
        {
            Session.Abandon();
            Session.RemoveAll();
        }
        Response.Redirect("Login.aspx");
    }
}