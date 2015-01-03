﻿<%@ Page Title="" Language="C#" MasterPageFile="~/AdminMaster.master" AutoEventWireup="true" CodeFile="GridView.aspx.cs" Inherits="GridView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <asp:DropDownList ID="ddlNumberPlate" runat="server" Width="201px">
        </asp:DropDownList>
        <asp:Button ID="btnSearch" runat="server" OnClick="btnSearch_Click" Text="Search" style="margin-left: 2px" Width="116px" CssClass="btn btn-default btn-sm"/>
        <asp:Button ID="btnViewAll" runat="server" OnClick="btnViewAll_Click" Text="View All" Width="116px" CssClass="btn btn-default btn-sm"/>
        <asp:GridView ID="GridView1" runat="server" AllowPaging="True" AutoGenerateColumns="False" AutoGenerateDeleteButton="True" AutoGenerateEditButton="True" OnPageIndexChanging="GridView1_PageIndexChanging" OnRowCancelingEdit="GridView1_RowCancelingEdit" OnRowDeleting="GridView1_RowDeleting" OnRowEditing="GridView1_RowEditing" OnRowUpdating="GridView1_RowUpdating" CssClass="table table-bordered table-responsive table-hover table-responsive table-condensed table-stripped active">
            <Columns>
                <asp:BoundField DataField="cregid" HeaderText="Car Number" ReadOnly="True" SortExpression="id" />
                <asp:BoundField DataField="cmanf" HeaderText="Company" SortExpression="name" />
                <asp:BoundField DataField="cmodel" HeaderText="Model" SortExpression="address" />
                <asp:BoundField DataField="cseat" HeaderText="Seats" />
                <asp:BoundField DataField="crateperkm" HeaderText="Rate Per KM" />
                <asp:BoundField DataField="crateperhr" HeaderText="Rate Per HR" />
                <asp:BoundField DataField="cminhr" HeaderText="Minimum HR" />
                <asp:BoundField DataField="cacornonac" HeaderText="AC/Non-AC" SortExpression="acornonac" />
                <asp:BoundField DataField="cphotolink" HeaderText="Photo Link" />
            </Columns>
        </asp:GridView>
</asp:Content>
