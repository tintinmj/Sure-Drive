using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Cancellation : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!this.IsPostBack) { }
    }

    protected void ImageButton1_Click(object sender, EventArgs e)
    {
        string bid = txtBookinID.Text;
        string email = txtEmal.Text;

        string query = "SELECT bid FROM " + Tables.Booking + " WHERE bid = '" + bid + "'"
                        + " AND "
                        + " uemail = '" + email + "'";
        ClsDataAccess dao = new ClsDataAccess();
        DataSet ds = dao.GetData(query);
        if(ds.Tables[0].Rows.Count == 0)
        {
            lblCancel.Visible = false;
            lblInvalid.Visible = true;
        }
        if(ds.Tables[0].Rows.Count > 0)
        {
            lblInvalid.Visible = false;
            string dropBook = "DELETE FROM " + Tables.Booking + " WHERE bid = '" + bid + "'";
            dao.ExecuteQuery(dropBook);
            lblCancel.Visible = true;
        }
    }
}