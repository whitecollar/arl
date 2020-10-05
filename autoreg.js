
const wdio = require('webdriverio');
const caps = {"platformName":"Android","platformVersion":"10.0","udid":"192.168.88.22:5555","ensureWebviewsHavePages":true};
const driver = wdio.remote({
  protocol: "http",
  host: "localhost",
  port: 4723,
  path: "/wd/hub",
  desiredCapabilities: caps
});

const osmosis = require('osmosis');
osmosis.config('user_agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36');
osmosis.config('tries', 1)
osmosis.config('concurrency', 2);
var DevArray =  new Map();
let PersonArray =  new Map();
var IdSort = new Map();
var UrlFakeMail = 'http://www.fakemailgenerator.com';
var TestEmailUrl ='/inbox/dayrep.com/EdnaRFarina/';

function getFakeDev() {
  return new Promise((resolve, reject) => {
      let list = [];
          osmosis
              .get('https://www.myfakeinfo.com/mobile/get-android-device-information.php')
              .find('.col-md-9')
              .set({'date': ['.xiahuaxian']})
              .set({'name':  ['.text-right']})
              .data(data => {
                  list.push(data);
              })
              .error(err => reject(err))
              .done(() => resolve(list));
      });
}   


getFakeDev ().then(list => {
for (let code in list[0]['name']) {
       DevArray.set (list[list.length - 2]['name'][code],list[list.length - 2]['date'][code]);
  }
  console.log(DevArray);
});

function getFakePerson() {
  return new Promise((resolve, reject) => {
      let listp = [];
          osmosis
              .get('https://www.fakenamegenerator.com/gen-random-us-us.php')
              .find('.extra')
              .set({'name': ['.dl-horizontal dt']})
              .set({'date': ['.dl-horizontal dd']})
              .set({'linkmail': ['.adtl  a@href']})
              .find('.address')
              .set({'address': ['.adr']})
              .data(data => {
                  listp.push(data);
              })
              .error(err => reject(err))
              .done(() => resolve(listp));
      });
}  

getFakePerson ().then(listp => {
  for (let codep in listp[0]['name']) {
      PersonArray.set (listp[0]['name'][codep],listp[0]['date'][codep]);
  }
      PersonArray.set ('Physical address', listp[0]['address']);
      PersonArray.set ('linkmail', listp[0]['linkmail'][1]); 
     // console.log (PersonArray);
});  

function getFakeEmailList(url) {
  return new Promise((resolve, reject) => {
      let listp = [];
          osmosis
              .get(url+TestEmailUrl)
              .find('#email-list')
              .set({'linkmail': ['a@href']})
              
              .data(data => {
                  listp.push(data);
              })
              .error(err => reject(err))
              .done(() => resolve(listp));
      });
}  

function getFakeEmailCode(url) {
  return new Promise((resolve, reject) => {
      let listp = [];
      //let id = url.match(/[0-9]/g);
          osmosis
              .get(url)
              .find('.mk_mailBody')
              .set({'verifycode': 'table tbody tr:nth-child(2) td > div'})
              //.set({'url' : url})
              .data(data => {
                  listp.push(url.match(/\d+/g).join(''),data);
              })
              .error(err => reject(err))
              .done(() => resolve(listp));
      });
}



getFakeEmailList (UrlFakeMail).then(listp => {
 for (let msg in listp[0]['linkmail']){
          var str = UrlFakeMail+listp[0]['linkmail'][msg];
              getFakeEmailCode (str.replace(/inbox/gi, 'email')).then(listp => {
                // console.log (listp[0],listp[1]['verifycode']); 
                  IdSort.set (listp[0],listp[1]['verifycode']);
              });
                                   
      }
      
}); 


driver.init()
  .touchAction([
    {action: 'press', x: 265, y: 441},
    {action: 'moveTo', x: 183, y: 541},
    'release'
  ])
  .touchAction([
    {action: 'press', x: 159, y: 496},
    {action: 'moveTo', x: 148, y: 55},
    'release'
  ])
  .touchAction({actions: 'tap', x: 217, y: 276})
  .touchAction({actions: 'tap', x: 95, y: 551})
  .touchAction({actions: 'tap', x: 58, y: 332})
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[1]")
  .setValue("rivasdid11")
  .touchAction({actions: 'tap', x: 49, y: 327})
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[2]")
  .setValue("rivasdid11")
  .touchAction({actions: 'tap', x: 54, y: 378})
  .touchAction({actions: 'tap', x: 55, y: 380})
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[1]")
  .setValue("eerrtt11")
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[2]")
  .setValue("eerrtt11")
  .touchAction({actions: 'tap', x: 31, y: 304})
  .touchAction({actions: 'tap', x: 62, y: 434})
  .touchAction({actions: 'tap', x: 54, y: 403})
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText")
  .setValue("eerrtt11")
  .touchAction({actions: 'tap', x: 246, y: 265})
  .touchAction({actions: 'tap', x: 156, y: 498})
  .touchAction({actions: 'tap', x: 22, y: 550})
  .touchAction({actions: 'tap', x: 222, y: 577})
  .touchAction({actions: 'tap', x: 94, y: 273})
  .touchAction({actions: 'tap', x: 107, y: 273})
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[2]")
  .clearElement()
  .setValue("rivasdid")
  .touchAction({actions: 'tap', x: 156, y: 380})
  .touchAction({actions: 'tap', x: 219, y: 365})
  .touchAction({actions: 'tap', x: 84, y: 309})
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[2]")
  .clearElement()
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[1]")
  .clearElement()
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[2]")
  .setValue("22")
  .touchAction({actions: 'tap', x: 154, y: 309})
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[2]")
  .setValue("07")
  .touchAction({actions: 'tap', x: 230, y: 308})
  .touchAction({actions: 'tap', x: 241, y: 310})
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[2]")
  .setValue("1971")
  .touchAction({actions: 'tap', x: 62, y: 352})
  .touchAction({actions: 'tap', x: 214, y: 395})
  .touchAction({actions: 'tap', x: 70, y: 263})
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[2]")
  .setValue("abigail8chandter95635@aolj.com")

  
  .touchAction({actions: 'tap', x: 213, y: 312})
  .touchAction({actions: 'tap', x: 75, y: 311})
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[1]")
  .setValue("4450")
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[2]")
  .setValue("4450")
  .touchAction({actions: 'tap', x: 69, y: 370})
  .touchAction({actions: 'tap', x: 213, y: 408})
  .element("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.EditText[2]")
  .setValue("6697")
  .touchAction({actions: 'tap', x: 200, y: 313})
  .touchAction({actions: 'tap', x: 67, y: 310})
  .setValue("9172")
  .touchAction({actions: 'tap', x: 273, y: 359})
  .touchAction({actions: 'tap', x: 200, y: 410})
  .touchAction({actions: 'tap', x: 276, y: 150})
  .touchAction({actions: 'tap', x: 164, y: 367})
  .touchAction({actions: 'tap', x: 117, y: 54})
  .touchAction({actions: 'tap', x: 284, y: 39})
  .touchAction({actions: 'tap', x: 179, y: 441})
  .end();
