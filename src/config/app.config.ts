export class AppConfig {

  public static API_HOST_ADDRESS = "http://localhost:3003";
 // public static API_HOST_ADDRESS = "http://192.168.23.2:3003";

  public static service_urls = {
    SEARCH_PROJECT_URL: AppConfig.API_HOST_ADDRESS + '/',
    EMPLOYEE_LOGIN : AppConfig.API_HOST_ADDRESS + '/users',
    USER_SIGNUP : AppConfig.API_HOST_ADDRESS + '/user-account',
    EMPLOYEE : AppConfig.API_HOST_ADDRESS + '/employee',
    SEND_REQUEST : AppConfig.API_HOST_ADDRESS + '/admin',
    ACCEPT_REQUEST : AppConfig.API_HOST_ADDRESS + '/accepted-request'
  }

  public static user_roles_array = [
    {name : "ADMIN" , value : 1},
    {name : "RM" , value : 2},
    {name : "PM" , value : 3},
    {name : "EMPLOYEE" , value : 4},
  ]

  public static user_roles = {
    ADMIN: 1,
    RM : 2,
    PM : 3,
    EMPLOYEE : 4,
    INITIAL_SIGN_UP_ROLE : 4
  }

  public static PROJECT_ROLES_FOR_ASSIGN = [{name:"Senior SE",value:"sse"},{name:"UI Designer",value:"uid"},{name:"SE",value:"se"}];
  public static BASED_LOCATION_FOR_ASSIGN =  [{name:"Main Branch",value:"main"},{name:"Sub Branch",value:"sub"}];
  public static EXPERTISE_FOR_ASSIGN =  [{name:"Front End Developer",value:"frontend"},{name:"Back End Developer",value:"backend"}];

  // public static API_HOST_ADDRESS = "https://jsonplaceholder.typicode.com";

}
