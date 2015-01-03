<%@ Page Title="" Language="C#" MasterPageFile="~/CarRentalMaster.master" AutoEventWireup="true" CodeFile="UserSearch.aspx.cs" Inherits="UserSearch" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">

    <style type="text/css">
        .auto-style1 {
            height: 83px;
        }
        .auto-style2 {
            height: 65px;
        }
    </style>

</asp:Content>



<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="progress progress-bar-striped active">
        <div id="pb" class="progress progress-bar progress-bar-striped active" style="width: 25%;"></div>
    </div>
    <table style="width:100%;">
        <tr>
            <td style="width:100%;" align="center">
                <table style="text-align:left; width:30%;">
                    <tr>
                        <td style="width:100%;">
                            <h3>
                                <asp:Label ID="Label1" runat="server" style="font-size: x-large" Text="I want a car"></asp:Label>
                            </h3>
                        </td>
                    </tr>
                    <tr>
                        <td class="auto-style2">
                            <div class="form-group">
                                <label for="txtRegNum">
                                    From
                                </label>
                                <asp:DropDownList ID="ddlPickupCities" runat="server" CssClass="form-control">
                                    <asp:ListItem Value="0">Dumdum</asp:ListItem>
                                    <asp:ListItem>Garia</asp:ListItem>
                                    <asp:ListItem>Howrah Rly Station</asp:ListItem>
                                    <asp:ListItem>Sealdah Rly Station</asp:ListItem>
                                    <asp:ListItem>Salt Lake</asp:ListItem>
                                    <asp:ListItem>Beliaghata</asp:ListItem>
                                    <asp:ListItem>Esplanade</asp:ListItem>
                                    <asp:ListItem>Shyambazar</asp:ListItem>
                                    <asp:ListItem>Durgapur</asp:ListItem>
                                    <asp:ListItem>Kalyani</asp:ListItem>
                                    <asp:ListItem>Digha</asp:ListItem>
                                    <asp:ListItem>Burdawan</asp:ListItem>
                                    <asp:ListItem>Ruby</asp:ListItem>
                                    <asp:ListItem>Panagarh</asp:ListItem>
                                </asp:DropDownList>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="auto-style1">
                            <div class="form-group">
                                <label for="txtRegNum">
                                    On
                                </label>
                                <asp:TextBox ID="txtDate" runat="server" CssClass="form-control" type="date" placeholder="DD-MM-YYYY" required></asp:TextBox>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group">
                                <label for="txtRegNum">
                                    Time
                                </label>
                                <asp:DropDownList ID="ddlTime" runat="server" CssClass="form-control">
                                    <asp:ListItem Value="0">1</asp:ListItem>
                                    <asp:ListItem>2</asp:ListItem>
                                    <asp:ListItem>3</asp:ListItem>
                                    <asp:ListItem>4</asp:ListItem>
                                    <asp:ListItem>5</asp:ListItem>
                                    <asp:ListItem>6</asp:ListItem>
                                    <asp:ListItem>7</asp:ListItem>
                                    <asp:ListItem>8</asp:ListItem>
                                    <asp:ListItem>9</asp:ListItem>
                                    <asp:ListItem>10</asp:ListItem>
                                    <asp:ListItem>11</asp:ListItem>
                                    <asp:ListItem>12</asp:ListItem>
                                </asp:DropDownList>
                                <asp:RadioButtonList ID="rdobtnlstAMPM" runat="server" RepeatDirection="Horizontal">
                                    <asp:ListItem Value="0" Selected="True">AM</asp:ListItem>
                                    <asp:ListItem Value="1">PM</asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Button ID="imgbtnBook" runat="server" Text="Submit" CssClass="btn btn-block btn-primary" OnClick="imgbtnBook_Click" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="lblValidation" runat="server" ForeColor="Red" ></asp:Label>
                        </td>
                    </tr>
                    </table>
            </td>
        </tr>
    </table>
</asp:Content>

