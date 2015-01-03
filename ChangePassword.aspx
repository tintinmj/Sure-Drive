<%@ Page Title="" Language="C#" MasterPageFile="~/CarRentalMaster.master" AutoEventWireup="true" CodeFile="ChangePassword.aspx.cs" Inherits="ChangePassword" %>

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
                                <h3>Change Password</h3>
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
                                <div class="form-group">
                                    <label for="txtRegNum">
                                        Old Password
                                    </label>
                                    <asp:TextBox ID="txtOldPass" runat="server" TextMode="Password" CssClass="form-control" placeholder="******" required></asp:TextBox>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group" id="divPassword">
                                    <label for="txtRegNum">
                                        New Password
                                    </label>
                                    <asp:TextBox ID="txtPass" runat="server" TextMode="Password" CssClass="form-control" placeholder="******" required></asp:TextBox>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group" id="divConfPass">
                                    <label for="txtRegNum">
                                        Confirm New Password
                                    </label>
                                    <asp:TextBox ID="txtConfPass" runat="server" TextMode="Password" CssClass="form-control" placeholder="******" required></asp:TextBox>
                                    <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToCompare="txtPass" ControlToValidate="txtConfPass" ErrorMessage="Password not matching" ForeColor="Red"></asp:CompareValidator>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <asp:Button ID="btnChange" runat="server" CssClass="btn btn-block btn-warning" Text="Change Password" OnClick="btnChange_Click" />
                            </td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
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

