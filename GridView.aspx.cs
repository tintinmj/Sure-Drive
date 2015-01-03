using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class GridView : System.Web.UI.Page
{
    private ClsCarHandler handler = new ClsCarHandler();
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
        DataSet ds = handler.GetDetails();
        DataBind(ds);
    }

    private void populateGridByID(string ID)
    {
        DataSet ds = handler.GetDetailsByID(ID);
        DataBind(ds);
    }

    private void DataBind(DataSet ds)
    {
        GridView1.DataSource = ds.Tables[0];
        GridView1.DataBind();
        ddlNumberPlate.DataSource = ds.Tables[0];
        ddlNumberPlate.DataTextField = "cregid";
        ddlNumberPlate.DataValueField = "cregid";
        ddlNumberPlate.DataBind();
        ddlNumberPlate.Items.Insert(0,new ListItem("Select Number Plate", string.Empty));
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
            populateGridByID(ddlNumberPlate.SelectedItem.Value);
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
        string carRegId = GridView1.Rows[e.RowIndex].Cells[1].Text;
        handler.DeleteCar(carRegId);
        GridView1.EditIndex = -1;
        populateGrid();
    }

    protected void btnSearch_Click(object sender, EventArgs e)
    {
        handler.GetDetailsByID(ddlNumberPlate.SelectedValue);
        populateGridByID(ddlNumberPlate.SelectedValue);
    }

    protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
    {
        int rowindex = e.RowIndex;

        ClsCar car = new ClsCar();
        car.CarRegisterId = GridView1.Rows[rowindex].Cells[1].Text;
        car.CarManufacturer = ((TextBox)GridView1.Rows[rowindex].Cells[2].Controls[0]).Text;
        car.CarModel = ((TextBox)GridView1.Rows[rowindex].Cells[3].Controls[0]).Text;
        car.CarSeat = int.Parse(((TextBox)GridView1.Rows[rowindex].Cells[4].Controls[0]).Text);
        car.CarRatePerKM = float.Parse(((TextBox)GridView1.Rows[rowindex].Cells[5].Controls[0]).Text);
        car.CarRatePerHR = float.Parse(((TextBox)GridView1.Rows[rowindex].Cells[6].Controls[0]).Text);
        car.CarMinHR = int.Parse(((TextBox)GridView1.Rows[rowindex].Cells[6].Controls[0]).Text);
        car.CarAcOrNonAc = ((TextBox)GridView1.Rows[rowindex].Cells[7].Controls[0]).Text;
        car.CarPhotoLink = ((TextBox)GridView1.Rows[rowindex].Cells[8].Controls[0]).Text;
        handler.UpdateCar(car);

        GridView1.EditIndex = -1;
        populateGrid();
    }
    protected void btnViewAll_Click(object sender, EventArgs e)
    {
        populateGrid();
    }
}