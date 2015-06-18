using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace SiteScanApi.Controllers
{
    public class Result {

        public string Name { get; set; }
        public string Test1 { get; set; }
        public string Test2 { get; set; }
        public string Test3 { get; set; }
        public string Test4 { get; set; }
        public string Test5 { get; set; }
        public string ResultText { get; set; }
        public bool Passed { get; set; } 
    }
    public class SitesController : ApiController
    {
        

        // GET api/values/5
        public Result Get(string id, [FromUri]string site = null)
        {
            //?site=www.thebeebs.co.uk
            Thread.Sleep(2000);
            if (site.Contains("beebs.co.uk")) { 
                        return new Result(){ 
                Name = site, 
                Test1 = "Pass", 
                Test2="Fail", 
                Test3="Pass", 
                Test4="Fail", 
                Test5 = "Pass", 
                Passed= true,
                ResultText = String.Format("The site {0} is not 100% Edge compatible.", site)};
            }else
             {
                    return new Result()
                    {
                        Name = site,
                        Test1 = "Pass",
                        Test2 = "Pass",
                        Test3 = "Pass",
                        Test4 = "Pass",
                        Test5 = "Pass",
                        Passed = true,
                        ResultText = String.Format("Great! {0} is Edge compatible.",site)
                    };
                }
        }

    }
}
