using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AdminMaster : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["admin"] != null)
        {
            ClsUser user = (ClsUser)Session["admin"];
            lblUserName.Text = "Welcome Admin!";
            lnkAccount.Text = "Logout";
        }
        else
        {
            lblUserName.Text = "";
            lnkAccount.Text = "Login";
        }
    }

    protected void lnkAccount_Click(object sender, EventArgs e)
    {
        if (Session.Count > 0)
        {
            Session.Abandon();
            Session.RemoveAll();
        }
        Response.Redirect("AdminLogin.aspx");
    }
}
