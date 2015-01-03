<%@ Page Title="" Language="C#" MasterPageFile="~/CarRentalMaster.master" AutoEventWireup="true" CodeFile="ShowCarsToChoose.aspx.cs" Inherits="ShowCarsToChoose" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
        <br />
        <div class="progress progress-bar-striped active" >
            <div class="progress progress-bar progress-bar-striped active" style="width: 50%"></div>
        </div>
        <asp:DataList ID="DataList1" runat="server" style="width:60%;">
            <ItemTemplate>
                <table cellpadding="5" cellspacing="3" style="width:100%;" class="table table-bordered table-responsive table-hover table-responsive table-condensed">
                    <tr>
                        <td rowspan="3" align="center" valign="middle">
                            <asp:Image ID="Image1" runat="server" style="opacity:0.8;" Height="120px" Width="160px" ImageUrl='<%# "car-images/"+Eval("cphotolink") %>' />
                        </td>
                        <td colspan="2">
                            <asp:Label ID="lblCarName" runat="server" style="font-size: large; font-weight: 700" Text='<%# Eval("cmanf") + " " + Eval("cmodel") %>'></asp:Label>
                        </td>
                        <td rowspan="3">
                            <asp:Label ID="lblSeats" runat="server" Text='<%# Eval("cseat") + " Seats" %>'></asp:Label>
                        </td>
                        <td rowspan="3">
                            <asp:Label ID="lblMinHR" runat="server" Text='<%# "Minimum " + Eval("cminhr") + " Hour(s)" %>'></asp:Label>
                        </td>
                        <td rowspan="3" style="vertical-align:middle;" align="center">
                            <asp:Button ID="imgbtnBookNow" runat="server" Text="Book Now" CssClass="btn btn-default btn-block" CommandArgument='<%# Eval("cregid") %>' OnClick="imgbtnBookNow_Click" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <asp:Label ID="lblAc" runat="server" Text='<%# Eval("cacornonac") %>'></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            <asp:Label ID="lblRatePerKM" runat="server" Text='<%# "₹ " + Eval("crateperkm") + " Per  KM" %>'></asp:Label>
                            &nbsp;</td>
                        <td >
                            <asp:Label ID="lblRatePerHR" runat="server" Text='<%# "₹ " + Eval("crateperhr") + " Per  Hour" %>'></asp:Label>
                        </td>
                    </tr>
                </table>
            </ItemTemplate>
        </asp:DataList>
            
</asp:Content>

