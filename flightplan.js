var Flightplan = require('flightplan');

var plan = new Flightplan();
var repo = "https://github.com/sjkyspa/sexam.git";
plan.briefing({
  debug: true,
  destinations: {
    'production': [
      {
        host: '192.168.33.10',
        username: 'vagrant',
        privateKey: "/Users/twer/.vagrant.d/insecure_private_key"
      }
    ]
  }
});

plan.local("deploy", function(local) {
//  var files = ["config/nginx.conf"];
//  local.transfer(files, '/tmp');
});

plan.remote(['deploy'], function(remote) {
  remote.log('Move folder to web root');

    remote.failsafe();
  var result = remote.exec("test -e /home/vagrant/sexam");
    remote.unsafe();
    if(result["code"] !== 0) {
      remote.exec('git clone ' + repo, 'sexam');
  } else {
      remote.with("cd /home/vagrant/sexam", function () {
          remote.exec("git pull");
      });
  }


  remote.log('Install dependencies');
  remote.exec("ls -l /tmp");
  remote.with('cd /home/vagrant/sexam', function() {
  	remote.ls('-l');
  	remote.exec('npm install');
    remote.exec('NODE_ENV=production ./node_modules/.bin/sequelize db:migrate')
    remote.exec('nohup node bin/www &')
  });
});
