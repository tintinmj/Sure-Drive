<%@ Page Title="" Language="C#" MasterPageFile="~/CarRentalMaster.master" AutoEventWireup="true" CodeFile="Home.aspx.cs" Inherits="Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
       
    <script src="Scripts/jquery-1.4.1.min.js" type="text/javascript">    </script>
    <script src="Scripts/libs/jquery.nivo.slider.pack.js" type="text/javascript">    </script>
    <script src="Scripts/libs/jquery.secret-source.min.js" type="text/javascript">    </script>

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>

    <link href="Styles/nivo-slider.css" rel="stylesheet" type="text/css" />
    <link href="Styles/Default.css" rel="stylesheet" type="text/css" />  
    <script src="Scripts/Demo.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(window).load(function () {
            $('#nivo-slider').nivoSlider();
            
        });
    </script>
               
    <div class="slider-wrapper theme-default">
        <div id="nivo-slider" class="nivoSlider img-responsive">
            <img src="Img_Slider/IMG3.jpg" alt=""/>
            <img src="Img_Slider/Honda_Brio-10.jpg" alt=""/>
            <img src="Img_Slider/IMG1.jpg" alt=""/>
            <img src="Img_Slider/IMG2.jpg" alt=""/>            
            <img src="Img_Slider/2011TataSumoGrandeMKIIFrontSideView.jpg" alt=""/>
            
        </div>
    </div>           
</asp:Content>

