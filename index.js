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
        console.log (PersonArray);
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

//console.log (PersonArray);




