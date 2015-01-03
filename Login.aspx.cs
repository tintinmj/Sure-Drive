using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
public partial class Login1 : System.Web.UI.Page
{
    ClsUser user = new ClsUser();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["user"] != null)
        {
            Response.Redirect("Home.aspx");
        }
    }

    protected void imgbtnLogin_Click(object sender, EventArgs e)
    {
        string query = "SELECT * from " + Tables.User + " WHERE "
                        + " uemail = '" + txtEmail.Text + "' AND "
                        + " upassword = '" + txtPass.Text + "'";
        ClsDataAccess dao = new ClsDataAccess();
        DataSet ds = dao.GetData(query);
        if (ds.Tables[0].Rows.Count > 0)
        {
            user.Name = ds.Tables[0].Rows[0]["uname"].ToString();
            user.MobileNumber = ds.Tables[0].Rows[0]["umobile"].ToString();
            user.Address = ds.Tables[0].Rows[0]["uaddress"].ToString();
            user.Email = user.MobileNumber = ds.Tables[0].Rows[0]["uemail"].ToString();

            Session["user"] = user;
            Response.Redirect("UserSearch.aspx");
        }
        else
        {
            lblInvalid.Visible = true;
        }
    }
}