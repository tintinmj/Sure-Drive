using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.Sql;

public partial class UserRegister : System.Web.UI.Page
{
    ClsUser user = new ClsUser();
    private ClsUserHandler uHandler = new ClsUserHandler();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["user"] != null)
        {
            Response.Redirect("Home.aspx");
        }

        if (!IsPostBack) 
        {
        }
    }

    protected void imgbtnRegister_Click(object sender, EventArgs e)
    {
        try
        {
            if (Page.IsValid)
            {
                user.Name = txtName.Text;
                user.MobileNumber = txtMobile.Text;
                user.Email = txtEmail.Text;
                user.Address = txtAdd.Text;
                user.Password = txtPass.Text;

                uHandler.AddUser(user);
                Session["user"] = user;
            }
        }
        catch(Exception ex)
        {
            lblMsg.Text = "Looks like email already taken!";
        }
        Response.Redirect("Home.aspx");
    }
}