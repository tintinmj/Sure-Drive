<%@ Page Title="" Language="C#" MasterPageFile="~/CarRentalMaster.master" AutoEventWireup="true" CodeFile="BookedSuccessful.aspx.cs" Inherits="BookedSuccessful" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    
    <div class="progress progress-bar-striped active">
        <div class="progress progress-bar progress-bar-success active" style="width: 100%"></div>
    </div>    
    <div class="panel panel-success"style="width: 50%" >
        <div class="panel-heading">
            <h3 class="panel-title">Thank You for booking with Us!</h3>
        </div>
        <div class="panel-body">
            Booking Successful. Check your email<p>Your Booking Id is 
                <asp:Label ID="lblBid" runat="server"></asp:Label>
            </p>
        </div>
    </div>
</div>
</asp:Content>

