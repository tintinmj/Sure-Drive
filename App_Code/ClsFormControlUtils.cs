using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

/// <summary>
/// Summary description for ClsFormControlUtils
/// </summary>
public static class ClsFormControlUtils
{


    /// <summary>
    /// http://stackoverflow.com/questions/4872364/clearing-all-fields-in-an-asp-net-form
    /// and call it like
    /// ClearInputs(Page.Controls);
    /// or
    /// Redirect to the same page
    /// Response.Redirect(Request.Url.PathAndQuery, true);
    /// </summary>
    /// <param name="ctrls"></param>
    public static void ClearInputs(ControlCollection ctrls)
    {
        foreach (Control ctrl in ctrls)
        {
            if (ctrl is TextBox)
                ((TextBox)ctrl).Text = string.Empty;
            else if (ctrl is DropDownList)
                ((DropDownList)ctrl).ClearSelection();

            ClearInputs(ctrl.Controls);
        }
    }

    public static string SentenceCase(string sentence)
    {
        TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
        return textInfo.ToTitleCase(sentence);
    }
}