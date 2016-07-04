# ApiStatsDashboard


Applies To        : Data Analytics Server 3.0.1
	            API Manager 1.10

DESCRIPTION

——————— 

This Dashboard is created to display the APIM publisher statistics in the DAS. This Dashboard is designed with the new Dashboard theme. Please note that the new theme will  effect all the available dashboards as well.

Scope parameter is added to the APIM_STAT_SCRIPT under the DAS Analytics Scripts

INSTALLATION INSTRUCTIONS

———————————————


(i) Add the api-Statistics resource to the registry ‘/_system/config/ues/dashboards’
(ii) Open the APIM_STAT_SCRIPT  under  the DAS Analytics Scripts
  Change the scheme  CREATE TEMPORARY TABLE API_Resource_USAGE_SUMMARY_FINAL
  add scope params as shown bellow 
  serviceTime int -sp,
  total_response_count int -sp,

(iii) Add the following files to the portal app <DAS HOME>/repository/deployment/server/jaggeryapps/portal
 - Copy the portal/commons folder to <DAS HOME>/repository/deployment/server/jaggeryapps/portal
 - Copy the portal/controllers/apis/apim-analytics.jag   to <DAS HOME>/repository/deployment/server/jaggeryapps/portal/controllers/apis
 - Copy the portal/extensions/themes/basic folder to <DAS HOME>/repository/deployment/server/jaggeryapps/portal/extensions/themes/basic (Please note this will change the theme of all the available dashboards)
 - Copy the portal/libs to <DAS HOME>/repository/deployment/server/jaggeryapps/portal/libs
 - Copy all the gadgets in the portal/store/carbon.super/gadget to  <DAS HOME>/repository/deployment/server/jaggeryapps/portal/store/carbon.super/gadget

