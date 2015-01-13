using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AdminGridViewBooking : System.Web.UI.Page
{
    private ClsBookingHandler bookingHandler = new ClsBookingHandler();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["admin"] == null)
        {
            Response.Redirect("AdminLogin.aspx");
        }
        if (this.IsPostBack == false)
        {
            populateGrid();
        }
    }

    private void populateGrid()
    {
        DataSet ds = bookingHandler.GetDetails();
        DataBind(ds);
    }

    private void populateGridByID(int ID)
    {
        DataSet ds = bookingHandler.GetDetailsByID(ID);
        DataBind(ds);
    }

    private void DataBind(DataSet ds)
    {
        GridView1.DataSource = ds.Tables[0];
        GridView1.DataBind();
        ddlNumberPlate.DataSource = ds.Tables[0];
        ddlNumberPlate.DataTextField = "bid";
        ddlNumberPlate.DataValueField = "bid";
        ddlNumberPlate.DataBind();
        ddlNumberPlate.Items.Insert(0, new ListItem("Select booking ID", string.Empty));
    }

    protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        int pageno = e.NewPageIndex;
        GridView1.PageIndex = pageno;
        populateGrid();
    }

    protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
    {
        GridView1.EditIndex = e.NewEditIndex;
        if (ddlNumberPlate.SelectedItem.Value != "")
        {
            populateGridByID(int.Parse(ddlNumberPlate.SelectedValue));
        }
        else
        {
            populateGrid();
        }
    }

    protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
    {
        GridView1.EditIndex = -1;
        populateGrid();
    }

    protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        int bid = int.Parse(GridView1.Rows[e.RowIndex].Cells[1].Text);
        bookingHandler.DeleteBooking(bid);
        GridView1.EditIndex = -1;
        populateGrid();
    }

    protected void btnSearch_Click(object sender, EventArgs e)
    {
        bookingHandler.GetDetailsByID(int.Parse(ddlNumberPlate.SelectedValue));
        populateGridByID(int.Parse(ddlNumberPlate.SelectedValue));
    }

    protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
    {
        int rowindex = e.RowIndex;

        ClsBooking booking = new ClsBooking();

        int bid = int.Parse(GridView1.Rows[rowindex].Cells[1].Text);
        booking.CarRegisterId = ((TextBox)GridView1.Rows[rowindex].Cells[2].Controls[0]).Text;
        booking.UserEmail = ((TextBox)GridView1.Rows[rowindex].Cells[3].Controls[0]).Text;
        booking.PickUpCity = ((TextBox)GridView1.Rows[rowindex].Cells[4].Controls[0]).Text;
        booking.PickUpAddress = ((TextBox)GridView1.Rows[rowindex].Cells[5].Controls[0]).Text;
        booking.PickUpLandMark = ((TextBox)GridView1.Rows[rowindex].Cells[6].Controls[0]).Text;
        booking.PickUpDate = ((TextBox)GridView1.Rows[rowindex].Cells[7].Controls[0]).Text;
        booking.PickUpTime = ((TextBox)GridView1.Rows[rowindex].Cells[8].Controls[0]).Text;
        bookingHandler.UpdateBooking(booking, bid);

        GridView1.EditIndex = -1;
        populateGrid();
    }
    protected void btnViewAll_Click(object sender, EventArgs e)
    {
        populateGrid();
    }
}