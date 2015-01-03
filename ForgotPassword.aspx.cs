using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ForgotPassword : System.Web.UI.Page
{
    ClsDataAccess dao = new ClsDataAccess();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) { }
    }

    protected void btnRecovery_Click(object sender, EventArgs e)
    {
        string query = "select upassword from tblusers where uemail = '" + txtEmail.Text + "'";
        DataSet ds = dao.GetData(query);
        if (ds.Tables[0].Rows.Count == 0)
        {
            lblMsg.Text = "Invalid Email!";
        }
        else
        {
            string subject = "Forgot Password";

            string body = "Your password is " + ds.Tables[0].Rows[0]["upassword"];
            if(ClsMail.sendMail(txtEmail.Text, subject, body))
            {
                lblMsg.Text = "Recovery Email Sent! :)";
            }
            else
            {
                lblMsg.Text = "No Internet Connection... We need to mail you :(";
            }
        }
    }
}