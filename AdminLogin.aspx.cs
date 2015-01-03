using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AdminHome : System.Web.UI.Page
{
    ClsUser admin = new ClsUser();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["admin"] != null)
        {
            Response.Redirect("AdminAddCar.aspx");
        }
    }

    protected void imgbtnLogin_Click(object sender, EventArgs e)
    {
        if(txtEmail.Text == "admin@admin.com" && txtPass.Text == "password")
        {
            Session["admin"] = admin;
            Response.Redirect("AdminAddCar.aspx");
        }
        else
        {
            Response.Redirect("Home.aspx");
        }
    }
}