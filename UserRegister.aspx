<%@ Page Title="Register" Language="C#" MasterPageFile="~/CarRentalMaster.master" AutoEventWireup="true" CodeFile="UserRegister.aspx.cs" Inherits="UserRegister" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div>
        
            <h1>Create your Account</h1>
        
    </div>
    <div class="well" style="width:50%;">
        <table style="width: 100%;">
            <tr>
                <td style="width: 100%;" align="center">
                    <table style="text-align: left; width: 50%;">
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="txtRegNum">
                                        Name
                                    </label>
                                    <asp:TextBox ID="txtName" runat="server" CssClass="form-control" placeholder="Name" required></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtName" Display="Dynamic" ErrorMessage="Name required" ForeColor="Red"></asp:RequiredFieldValidator>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="txtRegNum">
                                        Mobile Number
                                    </label>
                                    <div class="input-group" style="width: 100%;">
                                        <div class="input-group-addon">+91</div>
                                        <asp:TextBox ID="txtMobile" runat="server" CssClass="form-control" placeholder="Mobile Number" MaxLength="10" required></asp:TextBox>
                                    </div>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="txtMobile" Display="Dynamic" ErrorMessage="Mobile required" ForeColor="Red"></asp:RequiredFieldValidator>
                                    <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txtMobile" ErrorMessage="10 digits mobile number" ForeColor="Red" ValidationExpression="\d\d\d\d\d\d\d\d\d\d"></asp:RegularExpressionValidator>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="txtRegNum">
                                        Email
                                    </label>
                                    <asp:TextBox ID="txtEmail" runat="server" CssClass="form-control" placeholder="Email" required type="email"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="txtEmail" Display="Dynamic" ErrorMessage="Email required" ForeColor="Red"></asp:RequiredFieldValidator>
                                    <asp:RegularExpressionValidator ID="RegularExpressionValidator2" runat="server" ControlToValidate="txtEmail" ErrorMessage="Give valid email address" ForeColor="Red" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="txtRegNum">
                                        Address
                                    </label>
                                    <asp:TextBox ID="txtAdd" runat="server" TextMode="MultiLine" CssClass="form-control" placeholder="Address" required></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ControlToValidate="txtAdd" Display="Dynamic" ErrorMessage="Address required" ForeColor="Red"></asp:RequiredFieldValidator>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group" id="divPassword">
                                    <label for="txtRegNum">
                                        Password
                                    </label>
                                    <asp:TextBox ID="txtPass" runat="server" TextMode="Password" CssClass="form-control" placeholder="******" required></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" ControlToValidate="txtPass" Display="Dynamic" ErrorMessage="Password required" ForeColor="Red"></asp:RequiredFieldValidator>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group" id="divConfPass">
                                    <label for="txtRegNum">
                                        Confirm Password
                                    </label>
                                    <asp:TextBox ID="txtConfPass" runat="server" TextMode="Password" CssClass="form-control" placeholder="******" required></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator7" runat="server" ControlToValidate="txtConfPass" Display="Dynamic" ErrorMessage="Confirm Password" ForeColor="Red"></asp:RequiredFieldValidator>
                                    <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToCompare="txtPass" ControlToValidate="txtConfPass" ErrorMessage="Password not matching" ForeColor="Red"></asp:CompareValidator>
                                </div>
                            </td>
                        </tr>
<%--                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <asp:CheckBox ID="CheckBox1" runat="server" Style="text-align: left" />
                                    <label for="txtRegNum">
                                        I have read all the Terms &amp; Conditions
                                    </label>
                                </div>
                            </td>
                        </tr>--%>
                        <tr>
                            <td colspan="2">
                                <asp:Button ID="imgbtnRegister" runat="server" CssClass="btn btn-block btn-success" Text="Register" OnClick="imgbtnRegister_Click" />
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

