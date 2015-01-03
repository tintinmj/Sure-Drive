<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.master" AutoEventWireup="true" CodeFile="AdminAddCar.aspx.cs" Inherits="AdminAddCar" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">

    <style type="text/css">
        .auto-style1 {
            height: 83px;
        }
    </style>

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
        <table style="width:50%;" align="center" class="panel">
            <tr>
                <td align="center">
                    <asp:Label ID="Label1" runat="server" style="color: #FF0000" Text="*All Fields Are Mandatory"></asp:Label>
                </td>
            </tr>
            <tr>
              <td class="panel-title">
                  <h3>Add Cars</h3>
              </td>
            </tr>
            <tr>
                <td>
                    <div class="form-group">
                        <label for="txtRegNum">
                            Registration Number*
                        </label>
                        <asp:TextBox ID="txtRegNum" runat="server" CssClass="form-control" placeholder="Registration Number" required></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtRegNum" Display="Dynamic" ErrorMessage="Registration no required" ForeColor="Red"></asp:RequiredFieldValidator>
                        <asp:Label ID="Label2" runat="server" style="color: #70A4B8" Text="(case-insensitive)"></asp:Label>
                        <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" Display="Dynamic" ControlToValidate="txtRegNum" ErrorMessage="Format invalid" ForeColor="Red" ValidationExpression="[a-zA-Z][a-zA-Z]\d\d[a-zA-Z]\d\d\d\d"></asp:RegularExpressionValidator>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="form-group">
                        <label for="txtRegNum">
                            Manufacturer*
                        </label>
                        <asp:DropDownList ID="ddlManf" runat="server" CssClass="form-control">
                            <asp:ListItem Value="0">Hyundai</asp:ListItem>
                            <asp:ListItem>Tata</asp:ListItem>
                            <asp:ListItem>Force</asp:ListItem>
                            <asp:ListItem>Maruti</asp:ListItem>
                            <asp:ListItem>Mahindra</asp:ListItem>
                            <asp:ListItem>HM</asp:ListItem>
                            <asp:ListItem>Honda</asp:ListItem>
                            <asp:ListItem>Mitshubishi</asp:ListItem>
                            <asp:ListItem>Toyota</asp:ListItem>
                        </asp:DropDownList>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="ddlManf" Display="Dynamic" ErrorMessage="Manufacturer required" ForeColor="Red"></asp:RequiredFieldValidator>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="auto-style1">
                    <div class="form-group">
                        <label for="txtRegNum">
                            Model*
                        </label>
                        <asp:TextBox ID="txtModel" runat="server" CssClass="form-control" placeholder="Model (Required)" required></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="txtModel" Display="Dynamic" ErrorMessage="Model required" ForeColor="Red"></asp:RequiredFieldValidator>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="form-group">
                        <label for="txtRegNum">
                            Seat*
                        </label>
                        <asp:DropDownList ID="ddlSeat" runat="server" style="margin-left: 0px" CssClass="form-control">
                            <asp:ListItem Value="0">4</asp:ListItem>
                            <asp:ListItem>7</asp:ListItem>
                            <asp:ListItem>8</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="form-group">
                        <label for="txtRegNum">
                            Rate Per KM*
                        </label>
                        <asp:TextBox ID="txtRatePerKM" runat="server" CssClass="form-control" placeholder="Rate Per KM (Required)" required></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ControlToValidate="txtRatePerKM" Display="Dynamic" ErrorMessage="Rate per KM needed" ForeColor="Red"></asp:RequiredFieldValidator>
                        <asp:RangeValidator ID="RangeValidator1" runat="server" ControlToValidate="txtRatePerKM" Display="Dynamic" ErrorMessage="range 10-50" ForeColor="Red" MaximumValue="50" MinimumValue="10" Type="Integer"></asp:RangeValidator>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="form-group">
                        <label for="txtRegNum">
                            Rate Per HR*
                        </label>
                        <asp:TextBox ID="txtRatePerHR" runat="server" CssClass="form-control" placeholder="Rate Per HR (Required)" required></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" ControlToValidate="txtRatePerHR" Display="Dynamic" ErrorMessage="Rate per HR needed" ForeColor="Red"></asp:RequiredFieldValidator>
                        <asp:RangeValidator ID="RangeValidator2" runat="server" ControlToValidate="txtRatePerHR" Display="Dynamic" ErrorMessage="range 100-500" ForeColor="Red" MaximumValue="500" MinimumValue="100" Type="Integer"></asp:RangeValidator>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="form-group">
                        <label for="txtRegNum">
                            Minimum HR*
                        </label>
                        <asp:TextBox ID="txtMinHR" runat="server" CssClass="form-control" placeholder="Minimum HR(Required)" required></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator7" runat="server" ControlToValidate="txtMinHR" Display="Dynamic" ErrorMessage="Minimum Hour needed" ForeColor="Red"></asp:RequiredFieldValidator>
                        <asp:RangeValidator ID="RangeValidator3" runat="server" ControlToValidate="txtMinHR" Display="Dynamic" ErrorMessage="range 5-12 hours" ForeColor="Red" MaximumValue="12" MinimumValue="5" Type="Integer"></asp:RangeValidator>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="form-group">
                        <label for="txtRegNum">
                            AC/Non-AC*
                        </label>
                        <asp:RadioButtonList ID="rdobtnlstAC" runat="server" Height="16px" RepeatDirection="Horizontal" style="text-align: left; margin-left: 0px; margin-top: 0px;" CssClass="textbox">
                            <asp:ListItem Selected="True">AC</asp:ListItem>
                            <asp:ListItem>Non AC</asp:ListItem>
                        </asp:RadioButtonList>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="form-group">
                        <label>
                            Upload Photo*
                        </label>
                        <asp:FileUpload ID="flupldCarPic" runat="server" CssClass="form-control" />
                        <asp:Label ID="lblUpload" runat="server" ForeColor="Red"></asp:Label>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="form-group">
                        <asp:Button ID="btnSubmit" runat="server" OnClick="btnSubmit_Click" Text="Submit" CssClass="btn btn-block btn-primary" />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="lblConfirmation" runat="server"></asp:Label>
                </td>
            </tr>
        </table>
</asp:Content>

