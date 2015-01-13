using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AdminAddCar : System.Web.UI.Page
{
    private ClsCarHandler chandler;
    protected void Page_Load(object sender, EventArgs e)
    {
        if(Session["admin"] == null)
        {
            Response.Redirect("AdminLogin.aspx");
        }
        if(!this.IsPostBack)
        {
            
        }
        
    }

    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        if (Page.IsValid)
        {
            ClsCar car = new ClsCar();
            chandler = new ClsCarHandler();
            car.CarRegisterId = txtRegNum.Text;
            car.CarManufacturer = ddlManf.SelectedItem.Text;
            car.CarModel = ClsFormControlUtils.SentenceCase(txtModel.Text);
            car.CarSeat = int.Parse(ddlSeat.SelectedItem.Text);
            car.CarRatePerKM = float.Parse(txtRatePerKM.Text);
            car.CarRatePerHR = float.Parse(txtRatePerHR.Text);
            car.CarMinHR = int.Parse(txtMinHR.Text);
            car.CarAcOrNonAc = rdobtnlstAC.SelectedItem.Text;

            if (!flupldCarPic.HasFile)
            {
                lblUpload.Text = "Picture needed!";
                return;
            }
            if (flupldCarPic.HasFile)
            {
                string filename = Path.GetFileName(flupldCarPic.PostedFile.FileName);
                string currentpath = Server.MapPath("car-images\\").ToString();
                flupldCarPic.PostedFile.SaveAs(currentpath + filename);
                car.CarPhotoLink = filename;
            }

            if (!chandler.hasDuplicate(car.CarRegisterId))
            {
                lblUpload.Visible = false;
                chandler.AddCar(car);
                lblConfirmation.Text = "Car successfully added";
            }
            else
            {
                lblConfirmation.Text = "Car already exist";
            }
            ClsFormControlUtils.ClearInputs(Page.Controls);
        }
    }


}