using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ChangePassword : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if(Session["user"] == null)
        {
            Response.Redirect("Login.aspx");
        }
        if (!IsPostBack) { }
    }
    protected void btnChange_Click(object sender, EventArgs e)
    {
        ClsDataAccess dao = new ClsDataAccess();
        string email = txtEmail.Text;
        string oldpass = txtOldPass.Text;
        string newpass = txtPass.Text;

        string query = "select * from tblusers where uemail = '" + email + "' and upassword = '" + oldpass + "'";
        DataSet ds = dao.GetData(query);
        
        if(ds.Tables[0].Rows.Count > 0)
        {
            string updateQuery = "update tblusers set upassword = '" + newpass + "' where uemail = '" + email + "'";
            dao.ExecuteQuery(updateQuery);
            lblMsg.Text = "Password Updated";
        }
        else
        {
            lblMsg.Text = "Invalid Email or Password";
        }
    }
}