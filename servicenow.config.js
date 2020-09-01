module.exports = {
    /**
     * ServiceNow instance URL
     * Provide url in this format 'https://dev99999.service-now.com/' (Always prefix with https://)
     */
    HOST                        : 'https://dev71980.service-now.com/',   
    /**
     * ServiceNow instance username
     * This will be used as credential for REST in DEVELOPMENT mode
     */      
    USERNAME                    : 'jaydeepdeb',   
    /**
     * ServiceNow instance password
     * This will be used as credential for REST in DEVELOPMENT mode
     */ 
    PASSWORD                    : 'India@123',  
    /**
     * ServiceNow application scope
     * Scope id is 'global' for Global application, a sys_id for scoped/other applications
     * Leaving this empty auto defaults to global
     */ 
    SCOPE_ID                   : 'global',
    /**
     * Base URL for the React application
     * This is usually /now/appname for global & /x/namespace/reactappname for scoped applications
     */ 
    APP_URL_BASE                : '/now/incident_workspace',  
    /**
     * sys_id of NowReact Application Registry
     */  
    REGISTRY_ID            : '8d8530780743541037c7f2ae7c1ed0e6',
    /**
     * ServiceNow Image overwrite setting 
     * If true, it will update/overwrite the existing images with the same name in the instance, happens on every 'npm run build'
     * Browser cache needs to erased in order to see the overwritten images
     * Leaving this empty auto defaults to false
     */ 
    OVERWRITE_IMAGE_ATTACHMENTS : false,
    /**
     * CHANGE THIS ONLY IF NPM START DOESN'T START DEVELOPMENT SERVER
     * Port number - Default value is 5000
     */  
    DEV_SERVER_PORT             : 5000      
};
