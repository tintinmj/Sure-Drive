<%@ Page Title="" Language="C#" MasterPageFile="~/CarRentalMaster.master" AutoEventWireup="true" CodeFile="ContactUs.aspx.cs" Inherits="ContactUs" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="title"><h1><strong>Contact Us</strong></h1></div>
     <p>&nbsp;</p>


    <div id="cont-pt">
        <h4>
            <a href="https://github.com/tintinmj">
                <span class="fa fa-github-square"></span>
            </a>&nbsp;
            <a href="http://stackoverflow.com/users/2350145/tintinmj">
                <span class="fa fa-stack-overflow"></span>
            </a>&nbsp; Anirban Nag(+91 9038541773)
        </h4>
        <h4>
            <a href="https://www.facebook.com/debayanb">
                <span class="fa fa-facebook-square"></span>
            </a>&nbsp; Debayan Bhowmik(+91 8017259009)
        </h4>
        <h4>
            <a href="https://www.facebook.com/rup.mama">
                <span class="fa fa-facebook-square"></span>
            </a>&nbsp; Rup Sarkar(+91 9874603188)
        </h4>
        <h4>
            <a href="https://www.facebook.com/kishor.mondal.9">
                <span class="fa fa-facebook-square"></span>
            </a>&nbsp; Kishor Mondal(+91 8296134292)
        </h4>


        <p>&nbsp;</p>
        <div class="land">
            90/A, Dum Dum Road,
            <br>
            Kolkata - 700025
        </div>
        <div class="ph">Call : 1800 500 700</div>
        <div class="mail"><a href="mailto:suredrive2014@gmail.com">suredrive2014@gmail.com</a></div>
        <div class="web"><a href="Home.aspx">www.suredrive.com</a></div>
    </div>

    <div class="contact-lft" />
    <h3>We'd <i class="fa fa-heart" style="color: hotpink; font: 200"></i> to hear from you :)</h3>

        <div class="txt-bx-mn" style="width: 25%">
            <div class="bx-txt">Subject</div>
            <div class="bx-inp">
                <asp:TextBox ID="txtSubject" runat="server" CssClass="form-control" placeholder="Subject" required type="text"></asp:TextBox>
            </div>
        </div>
        <div class="txt-bx-mn" style="width: 25%">
            <div class="bx-txt">E-mail address</div>
            <div class="bx-inp">
                <asp:TextBox ID="txtEmail" runat="server" CssClass="form-control" placeholder="Email" required type="email"></asp:TextBox>
            </div>
        </div>

        <div class="txt-bx-mn">
          <div class="bx-txt">Message</div>
            <div class="bx-inp1" style="width: 25%">
                    <asp:TextBox ID="txtMessage" runat="server" TextMode="MultiLine" CssClass="form-control" placeholder="Message"></asp:TextBox>
                    &nbsp;
                </div>
        </div>

        <div class="txt-bx-mn">

            <div></div>
            <div class="bx-inp">
                <asp:Button ID="btnSubmit" runat="server" CssClass="btn btn-default" Text="Send" OnClick="btnSubmit_Click" Width="10%" />
            </div>
            <span id="Label1"></span>
        </div>
        <div>
            <tr>
                <td>&nbsp;</td>
                <td>
                    <asp:Label ID="lblMsg" runat="server" Text="" CssClass="text-center label"></asp:Label>
                </td>
            </tr>
        </div>
    <!-- Modal -->
        <div class="modal fade" id="modalSuccess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    </div>
                    <div class="modal-body">
                        <label>
                            Message Sent... Thanks for your feedback :)
                        </label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modalUnSuccess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    </div>
                    <div class="modal-body">
                        <label>
                            No Internet Connection! :(
                        </label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!--Modal end -->
        <script type="text/javascript">
            function openSuc() {
                $('#modalSuccess').modal('show');
            }
            function openUnSuc() {
                $('#modalUnSuccess').modal('show');
            }
        </script>

</asp:Content>

