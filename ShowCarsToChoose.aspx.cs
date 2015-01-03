using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ShowCarsToChoose : System.Web.UI.Page
{
    private DataSet ds;
    private ClsDataAccess dao = new ClsDataAccess();
    protected void Page_Load(object sender, EventArgs e)
    {
        //Session["user"] = "ABC";
        //Session["booking"] = "CDF";
        if (Session["user"] == null)
        {
            Response.Redirect("Login.aspx");
        }
        else if (Session["booking"] == null)
        {
            Response.Redirect("UserSearch.aspx");
        }
        if (this.IsPostBack == false)
        {
            bindatalist();
        }
    }
    private void bindatalist()
    {
        ClsBooking booking = (ClsBooking)Session["booking"];
        string bookingDate = booking.PickUpDate;
        string query = "select distinct cregid, cmanf, cmodel, cseat, crateperkm, crateperhr,"
                        + " cminhr, cacornonac, cphotolink from tblcars"
                        + " where cregid not in (select cregid from tblbooking where"
                        + " bpickupdate = '" + bookingDate + "')";
        ds = dao.GetData(query);
        DataList1.DataSource = ds.Tables[0];
        DataList1.DataBind();
    }

    protected void imgbtnBookNow_Click(object sender, EventArgs e)
    {
        ClsCar carToBook = new ClsCar();
        Button btn = (Button)sender;
        string id = btn.CommandArgument;
        String query = "";
        query = query + "SELECT * " + "\n";
        query = query + "FROM " + Tables.Car + " where cregid ='" + id + "'";
        ds = dao.GetData(query);
        carToBook.CarRegisterId = ds.Tables[0].Rows[0]["cregid"].ToString();
        carToBook.CarManufacturer = ds.Tables[0].Rows[0]["cmanf"].ToString();
        carToBook.CarModel = ds.Tables[0].Rows[0]["cmodel"].ToString();
        carToBook.CarSeat = int.Parse(ds.Tables[0].Rows[0]["cseat"].ToString());
        carToBook.CarRatePerKM = int.Parse(ds.Tables[0].Rows[0]["crateperkm"].ToString());
        carToBook.CarRatePerHR = int.Parse(ds.Tables[0].Rows[0]["crateperhr"].ToString());
        carToBook.CarMinHR = int.Parse(ds.Tables[0].Rows[0]["cminhr"].ToString());
        carToBook.CarAcOrNonAc = ds.Tables[0].Rows[0]["cacornonac"].ToString();
        carToBook.CarModel = ds.Tables[0].Rows[0]["cphotolink"].ToString();

        ClsBooking booking = (ClsBooking)Session["booking"];
        booking.CarRegisterId = id;
        ClsUser user = (ClsUser)Session["user"];
        booking.UserEmail = user.Email;
        Session["booking"] = booking;
        Session["carToBook"] = carToBook;
        Response.Redirect("BookedCarDetails.aspx?id=" + id);
    }
}