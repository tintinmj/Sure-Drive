using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BookedSuccessful : System.Web.UI.Page
{
    ClsDataAccess dao = new ClsDataAccess();
    protected void Page_Load(object sender, EventArgs e)
    {
        if(Session["booking"] == null)
        {
            Response.Redirect("Login.aspx");
        }
        else
        {
            ClsBooking booking = (ClsBooking)Session["booking"];
            if(booking.PickUpAddress.Equals(string.Empty))
            {
                Response.Redirect("UserSearch.aspx");
            }
            else
            {
                DataSet ds = dao.GetData("select bid from tblbooking where cregid = '" + booking.CarRegisterId + "' AND bpickupdate = '" + booking.PickUpDate + "'");
                Session["bid"] = ds.Tables[0].Rows[0]["bid"].ToString();
                string bid = (string)Session["bid"];

                string query1 = "select * from tblbooking where bid = '" + bid + "'";
                DataSet ds1 = dao.GetData(query1);
                string toMail = ds1.Tables[0].Rows[0]["uemail"].ToString();
                string carId = booking.CarRegisterId;
                string address = ds1.Tables[0].Rows[0]["bpickupaddress"].ToString();
                string at = ds1.Tables[0].Rows[0]["bpickuptime"].ToString();

                string subject = "Thank You for booking with SureDrive";
                string body = "Hi! our car no : " + carId + " will pick you up from " + address + " at " + at + ". Please pay the driver according to use! Have a great ride! SureDrive Team :)";

                bool b = ClsMail.sendMail(toMail, subject, body);
                lblBid.Text = bid;
            }
        }
    }
}