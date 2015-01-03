using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BookedCarDetails : System.Web.UI.Page
{
    ClsCarHandler cHandler = new ClsCarHandler();
    ClsBookingHandler bHandler = new ClsBookingHandler();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["user"] == null)
        {
            Response.Redirect("Login.aspx");
        }
        else if(Session["booking"] == null)
        {
            Response.Redirect("UserSearch.aspx");
        }
        if (this.IsPostBack == false)
        {
            string cregid = Request.QueryString["id"].ToString();
            bindatalist(cregid);
        }
    }
    private void bindatalist(string cregid)
    {
        ClsCar car = new ClsCar();
        DataSet ds = cHandler.GetDetailsByID(cregid);
        datalistCar.DataSource = ds.Tables[0];
        datalistCar.DataBind();
    }
    protected void imgbtnBook_Click(object sender, EventArgs e)
    {
        ClsBooking booking = (ClsBooking)Session["booking"];
        booking.PickUpAddress = txtPickUpAddress.Text;
        booking.PickUpLandMark = txtLandmark.Text;
        Session["booking"] = booking;

        if(bHandler.AddBooking(booking))
        {
            lblBooked.Text = "Booked Successfully!";
            ClsDataAccess dao = new ClsDataAccess();
            Response.Redirect("BookedSuccessful.aspx");
        }
        else
        {
            lblBooked.Text = "Already booked! :(";
        }
        
    }
}