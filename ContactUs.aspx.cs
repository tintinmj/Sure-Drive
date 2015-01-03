using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ContactUs : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) { }
    }
    protected void btnSubmit_Click(object sender, EventArgs e)
    { 
        string subject = txtSubject.Text;
        string message = txtMessage.Text;
        string mailclient = txtEmail.Text;
        message = "client mail address [ " + mailclient + " ] said " + message;
        if(ClsMail.sendMail(subject, message))
        {
            ScriptManager.RegisterStartupScript(this, this.GetType(), "Pop", "openSuc();", true);
        }
        else
        {
            ScriptManager.RegisterStartupScript(this, this.GetType(), "Pop", "openUnSuc();", true);
        }
    }
}