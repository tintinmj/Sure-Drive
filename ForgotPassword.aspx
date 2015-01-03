<%@ Page Title="" Language="C#" MasterPageFile="~/CarRentalMaster.master" AutoEventWireup="true" CodeFile="ForgotPassword.aspx.cs" Inherits="ForgotPassword" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="well" style="width:70%;">
        <table style="width: 100%;">
            <tr>
                <td style="width: 100%;" align="center">
                    <table style="text-align: left; width: 50%;">
                        <tr>
                            <td style="width: 50%;">
                                <h3>Forgot Password</h3>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="txtRegNum">
                                        Email Address
                                    </label>
                                    <asp:TextBox ID="txtEmail" runat="server" CssClass="form-control" placeholder="Email" type="email" required></asp:TextBox>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <asp:Button ID="btnRecovery" runat="server" CssClass="btn btn-block btn-warning" Text="Send Recovery Email" OnClick="btnRecovery_Click" />
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>
                                <asp:Label ID="lblMsg" runat="server" Text=""></asp:Label>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
        </table>
    </div>
</asp:Content>

