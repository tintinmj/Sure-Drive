<%@ Page Title="" Language="C#" MasterPageFile="~/CarRentalMaster.master" AutoEventWireup="true" CodeFile="Error.aspx.cs" Inherits="Error" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="panel panel-danger body-error">
        <div class="panel-heading">
            <h3 class="panel-title"><strong>Oops!</strong></h3>
        </div>
        <div>
            <img src="asset-images/new_error.png" class="img-responsive" width="1920" height="400"/>
        </div>
        <div class="panel-body">
            <div class="alert alert-dismissable alert-danger lead">
                <p class="lead">Sorry! The page is not available. What went wrong?</p>
                <br />
                <p><a href="ContactUs.aspx" class="alert-link"><u>Tell us.</u></a></p> 
            </div>
        </div>
    </div>
</asp:Content>

