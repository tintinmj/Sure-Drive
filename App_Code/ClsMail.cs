using System;
using System.IO;
using System.Net.Mail;
using System.Web;

/// <summary>
/// Summary description for ClsMail
/// </summary>
public class ClsMail
{
    private static string _emailCredFilePath = HttpContext.Current.Server.MapPath("~") + "Secret/Email.txt";
    private static readonly string _from = File.ReadAllText(_emailCredFilePath).Split(',')[0];
    private static readonly string _password = File.ReadAllText(_emailCredFilePath).Split(',')[1];
	
    public static bool sendMail(string to, string subject, string body)
    {
        try
        {
            MailMessage mailMessage = new MailMessage();
            mailMessage.To.Add(to);
            mailMessage.From = new MailAddress(_from);
            mailMessage.Subject = subject;
            mailMessage.Body = body;
            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Host = "smtp.gmail.com";
            smtpClient.Port = 587; 
            smtpClient.Credentials = new System.Net.NetworkCredential(_from, _password);
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
            sendMail(_from, subject, body);
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}