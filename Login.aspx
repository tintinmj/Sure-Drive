<%@ Page Title="" Language="C#" AutoEventWireup="true" MasterPageFile="~/CarRentalMaster.master" CodeFile="Login.aspx.cs" Inherits="Login1" %>
<asp:Content ID="headContent" runat="server" ContentPlaceHolderID="head">
    <link rel="stylesheet" href="Styles/style.css" media="screen" type="text/css" />
    <script type="text/javascript">
        function goToRegister()
        {
            window.location = "UserRegister.aspx";
        }
    </script>
</asp:Content>
<asp:Content ID="bodyContent" runat="server" ContentPlaceHolderID="ContentPlaceHolder1">
    <div id="login-form">

        <h3>Login</h3>

        <fieldset>
            <asp:TextBox ID="txtEmail" runat="server" required type="email" placeholder="Email"></asp:TextBox>
            <asp:TextBox ID="txtPass" runat="server" TextMode="Password" required placeholder="Password"></asp:TextBox>

            <asp:Button ID="imgbtnLogin" Text="Sign in" runat="server" OnClick="imgbtnLogin_Click" />
            <footer class="clearfix">

                <p><span class="info">?</span>Don't have an account? <a style="cursor: pointer; color: #0000FF;" onclick="goToRegister();">Register</a></p>
                <br></br>
                <p><span class="info">?</span><a href="ForgotPassword.aspx" style="cursor: pointer;">Forgot Password?</a></p>
            </footer>
            <asp:Label ID="lblInvalid" runat="server" ForeColor="Red" Text="Invalid Email or Password" Visible="False"></asp:Label>
        </fieldset>

    </div>
</asp:Content>

