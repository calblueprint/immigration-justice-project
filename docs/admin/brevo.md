---
icon: envelope
---

# Brevo

Brevo is an email marketing and communication platform that provides tools for sending transactional and marketing emails, managing contact lists, automating email campaigns, and analyzing email performance. [Brevo's SMTP service](https://help.brevo.com/hc/en-us/articles/209462765-What-is-Brevo-SMTP#h_01EJ8W8R9XSB1D00A4BDMZMAM3) offers a free plan with a rate limit of 300 emails per day. 

Click [here](https://calblueprint.notion.site/Brevo-Documentation-Research-c8f5e7b5a05f4fc9a9fd6de0f9a37f3b?pvs=4) for more information regarding the Brevo integration.

## Why is Brevo Important?

 Prior to integrating Brevo, we used Supabase for sending these transactional emails. Supabase imposes a rate limit of 4 emails per hour, which posed a significant limitation for our application's functionality and scalability. We've integrated Brevo's SMTP into our project to send transactional emails to the users. These emails are crucial for the website's usability, particularly during the Sign-Up and Forgot Password flows.
 
 By integrating Brevo's SMTP, we have enhanced our email delivery system, ensuring that essential processes like account verification and password resets are reliable and efficient. For both flows, users only need to click the link in the email to complete the action, with no email response required.

## Updating the Sender

A sender is an email address used to send communications to users and is visible in the emails they receive. There are two main steps for updating the sender:

1. **Add a sender on Brevo**
    - Follow steps 1-7 outlined in [Brevo's documentation](https://help.brevo.com/hc/en-us/articles/208836149-Create-a-new-sender) for how to create a new sender.

2. **Update the sender on Supabase**

    - Use the navigation bar on the left side of the screen to navigate to the Auth Settings: Project Settings → Authentication (under Configuration).
    - Scroll down to the SMTP Settings. 
    - Update the sender email and the sender name according to match those of the new sender.

![updating the sender on supabase](/assets/image/supabase-sender.png)

After updating the sender, please test to ensure that users are still able to receive transactional emails.

