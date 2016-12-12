exports.getConfig = function(context, callback) {
  var streamName = process.env.STREAM_NAME;
  var s3Location = process.env.S3_LOCATION;
  var sftpLocation = process.env.SFTP_LOCATION;
  var sftpConfig = {};
  var re = /^SFTP_CONFIG_(.+)$/;

  for (var key in process.env) {
    if (key.match(re)) {
      var configName = key.match(re)[1];
      sftpConfig[configName] = process.env[key];
    }
  }

  sftpConfig["algorithms"] = {
    "serverHostKey" : [
      "ssh-rsa",
      "ssh-dss"
    ]
  }

  var fullConfig = {};
  fullConfig[streamName] = {
    "s3Location": s3Location,
    "sftpConfig": sftpConfig,
    "sftpLocation": sftpLocation
  };

  callback(null,fullConfig);
}
