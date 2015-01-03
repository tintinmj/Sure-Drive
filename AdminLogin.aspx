<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.master" AutoEventWireup="true" CodeFile="AdminLogin.aspx.cs" Inherits="AdminHome" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="login-form">

        <h3>Login</h3>

        <fieldset>
            <asp:TextBox ID="txtEmail" runat="server" required type="email" placeholder="Email"></asp:TextBox>
            <asp:TextBox ID="txtPass" runat="server" TextMode="Password" required placeholder="Password"></asp:TextBox>

            <asp:Button ID="imgbtnLogin" Text="Sign in" runat="server" OnClick="imgbtnLogin_Click" />

            <asp:Label ID="lblInvalid" runat="server" ForeColor="Red" Text="Invalid Email or Password" Visible="False"></asp:Label>
        </fieldset>

    </div>
</asp:Content>

