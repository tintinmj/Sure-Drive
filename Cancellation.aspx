<%@ Page Title="" Language="C#" MasterPageFile="~/CarRentalMaster.master" AutoEventWireup="true" CodeFile="Cancellation.aspx.cs" Inherits="Cancellation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
        <script type="text/javascript">
            function success()
            {
                alert('Cancellation Successful!');
            }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <table style="width:100%;">
        <tr>
            <td style="width:100%;" align="center">
                <table style="width:30%;">
                    <tr>
                        <td style="width:100%;"><h3>Cancellation</h3></td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group">
                                <label for="txtRegNum">
                                    Booking ID
                                </label>
                                <asp:TextBox ID="txtBookinID" runat="server" CssClass="form-control" placeholder="Booking ID" required></asp:TextBox>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group">
                                <label for="txtRegNum">
                                    Your Email Address
                                </label>
                                <asp:TextBox ID="txtEmal" runat="server" CssClass="form-control" placeholder="Email Address" required type="email"></asp:TextBox>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="lblInvalid" runat="server" ForeColor="Red" Text="Invalid Email or Booking ID or already Cancelled!" Visible="False"></asp:Label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Button ID="imgbtnCancel" Text="Cancel" runat="server" CssClass="btn btn-danger btn-block" OnClick="ImageButton1_Click" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="lblCancel" runat="server" ForeColor="Red" Text="Cancellation Successful!" Visible="false"></asp:Label>
                            <%--<div id="alertc" class="alert alert-dismissable alert-danger">
                                <button type="button" class="close" data-dismiss="alert">×</button>
                                <strong>Oh snap!</strong> <a href="#" class="alert-link">Change a few things up</a> and try submitting again.
                            </div>--%>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</asp:Content>

