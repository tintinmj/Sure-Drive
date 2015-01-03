using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

/// <summary>
/// Summary description for ClsMail
/// </summary>
public class ClsMail
{
    private static readonly string from = "suredrive2014@gmail.com";
    private static readonly string password = "suredrive10";
	
    public static bool sendMail(string to, string subject, string body)
    {
        try
        {
            MailMessage mailMessage = new MailMessage();
            mailMessage.To.Add(to);
            mailMessage.From = new MailAddress(from);
            mailMessage.Subject = subject;
            mailMessage.Body = body;
            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Host = "smtp.gmail.com";
            smtpClient.Port = 587; 
            smtpClient.Credentials = new System.Net.NetworkCredential(from, password);
            smtpClient.EnableSsl = true;
            smtpClient.Send(mailMessage);
            mailMessage = null;
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public static bool sendMail(string subject, string body)
    {
        try
        {
            sendMail(from, subject, body);
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}