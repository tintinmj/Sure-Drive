using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class UserSearch : System.Web.UI.Page
{
    ClsBooking booking = new ClsBooking();
    protected void Page_Load(object sender, EventArgs e)
    {
        if(Session["user"] == null)
        {
            Response.Redirect("Login.aspx");
        }
        if(!IsPostBack)
        {
            //clndrPickUpDate.SelectedDate = DateTime.Now;
        }
    }

    protected void imgbtnBook_Click(object sender, EventArgs e)
    {
        DateTime dtValid = new DateTime();
        if(DateTime.TryParse(txtDate.Text,out dtValid))
        {
            int time = int.Parse(ddlTime.SelectedItem.Text);

            // change time as 24 hour format
            if (rdobtnlstAMPM.SelectedItem.Text == "PM")
            {
                time += 12;
            }

            // selected date is after today so no problem
            if (dtValid.Date > DateTime.Today.Date)
            {
                booking.PickUpCity = ddlPickupCities.SelectedItem.Text;
                booking.PickUpDate = (DateTime.Parse(txtDate.Text)).ToShortDateString();
                booking.PickUpTime = ddlTime.SelectedItem.Text;
                if (rdobtnlstAMPM.SelectedItem.Text == "PM")
                {
                    booking.PickUpTime += " PM";
                }
                else
                {
                    booking.PickUpTime += " AM";
                }

                Session["booking"] = booking;
                Response.Redirect("ShowCarsToChoose.aspx");
            }

            // selected date is today and minimum 3hr advance from right now
            else if (dtValid.Date == DateTime.Today.Date && time > (DateTime.Now.Hour + 3))
            {
                booking.PickUpCity = ddlPickupCities.SelectedItem.Text;
                booking.PickUpDate = (DateTime.Parse(txtDate.Text)).ToShortDateString();
                booking.PickUpTime = ddlTime.SelectedItem.Text;
                if (rdobtnlstAMPM.SelectedItem.Text == "PM")
                {
                    booking.PickUpTime += " PM";
                }
                else
                {
                    booking.PickUpTime += " AM";
                }

                Session["booking"] = booking;
                Response.Redirect("ShowCarsToChoose.aspx");
            }
            else 
            {
                lblValidation.Text = "Date or Time is invalid and book at least 3hr before pickup time";
            }
        }
        else
        {
            lblValidation.Text = "Date is not valid";
        }
    }
}