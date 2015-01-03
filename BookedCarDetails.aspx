<%@ Page Title="" Language="C#" MasterPageFile="~/CarRentalMaster.master" AutoEventWireup="true" CodeFile="BookedCarDetails.aspx.cs" Inherits="BookedCarDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="progress progress-bar-striped active">
        <div class="progress progress-bar progress-bar-striped active" style="width: 80%"></div>
    </div>
    <table style="width: 100%; margin-left: 10%; margin-right: 10%;">
        <tr>
            <td valign="top">
                <table>
                    <tr>
                        <td>
                            <h3>Give Pickup Details</h3>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group">
                                <label for="txtRegNum">
                                    My pickup venue*
                                </label>
                                <asp:TextBox ID="txtPickUpAddress" runat="server" CssClass="form-control" TextMode="MultiLine" placeholder="Enter Pick Up Details (Required)" required></asp:TextBox>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group">
                                <label for="txtRegNum">
                                    Nearest Landmark
                                </label>
                                <asp:TextBox ID="txtLandmark" runat="server" CssClass="form-control" TextMode="MultiLine" placeholder="Enter Land Mark (Optional)"></asp:TextBox>
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
                            <asp:Label ID="lblBooked" runat="server"></asp:Label>
                        </td>
                    </tr>
                </table>
            </td>
            <td>
                <asp:DataList ID="datalistCar" runat="server">
                    <ItemTemplate>
                        <table>
                            <tr>
                                <td>&nbsp;</td>
                                <td>
                                    <table>
                                        <tr>
                                            <td colspan="2" style="text-align: left">
                                                <h3>Booking Summary</h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <asp:Label ID="Label4" runat="server" Text="Minimum Booking Hours"></asp:Label>
                                            </td>
                                            <td>
                                                <asp:Label ID="lblMinHR" runat="server" Text='<%# Eval("cminhr") %>'></asp:Label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <hr style="height: -12px; width: 238px" class="divider" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <asp:Image ID="Image1" runat="server" Height="340px" Width="402px" ImageUrl='<%# "car-images/"+Eval("cphotolink") %>' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <asp:Panel ID="Panel2" runat="server" HorizontalAlign="Center" Width="100%">
                                                    <table cellpadding="3" style="width: 100%; border-radius: 6px; -moz-border-radius: 6px; -webkit-border-radius: 6px;" class="table-bordered table-hover">
                                                        <tr>
                                                            <td colspan="2" align="center">
                                                                <h1>
                                                                    <asp:Label ID="lblCarName" runat="server" Style="font-size: xx-large" Text='<%# Eval("cmanf") + " " + Eval("cmodel") %>'></asp:Label>
                                                                </h1>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center">
                                                                <asp:Label ID="lblRatePerKM" runat="server" Text='<%# "₹ " + Eval("crateperkm") + " Per KM" %>'></asp:Label>
                                                            </td>
                                                            <td align="center">
                                                                <asp:Label ID="lblRatePerHR" runat="server" Text='<%# "₹ " + Eval("crateperhr") + " Per Hour " %>'></asp:Label>
                                                            </td>
                                                        </tr>

                                                    </table>
                                                </asp:Panel>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </ItemTemplate>
                </asp:DataList>
            </td>
        </tr>
    </table>
</asp:Content>

