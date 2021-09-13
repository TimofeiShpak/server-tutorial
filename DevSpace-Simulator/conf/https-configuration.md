# Enabling HTTPS Support for Standalone Client

In order to enable https in standalone client you need to follow the steps given below.

## Generating Key pair and Certificate

Sample `keystore` is provided with this sample application. You can find that in `src/main/resources` folder.
If you want to generate your own new keystore use the following command.

`keytool -keystore keystore -alias sdp-client-cert -genkey -keyalg RSA`

Give fully qualified host name of the server at the "first and last name" prompt. Following is output after executing above command.

    keytool -keystore keystore -alias sdp-client-cert -genkey -keyalg RSA
    Enter keystore password:
    What is your first and last name?
      [Unknown]:  localhost
    What is the name of your organizational unit?
      [Unknown]:  SDP
    What is the name of your organization?
      [Unknown]:  hSenid Mobile Solutions
    What is the name of your City or Locality?
      [Unknown]:
    What is the name of your State or Province?
      [Unknown]:
    What is the two-letter country code for this unit?
      [Unknown]:  lk
    Is CN=localhost, OU=SDP, O=hSenid Mobile Solutions, L=Unknown, ST=Unknown, C=lk correct?
  [no]:  yes

    Enter key password for <sdp-client-cert>
	(RETURN if same as keystore password):
    Re-enter new password:

## Enabling Https in Configuration

Configuration parameters related to Https can be found in **Https Configurations** section of **simple-client.properties** file.





