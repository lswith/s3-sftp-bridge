var assert = require('assert'),
    configHelper,
    sinon = require('sinon'),
    testHelper = require('../helpers');

describe('configHelper', function() {
  describe('#getConfig()', function() {
    before(function() {
      configHelper = testHelper.require('../lib/configHelper');

    });

    it('should get the config from the environment', function() {
      process.env.STREAM_NAME = "defaultStream";
      process.env.S3_LOCATION = "test";
      process.env.SFTP_LOCATION = "test1";
      process.env.SFTP_CONFIG_username = "user";
      configHelper.getConfig(null,function(err,config) {
        assert.equal(err,null);
        assert.equal(config.defaultStream.s3Location,"test");
        assert.equal(config.defaultStream.sftpLocation,"test1");
        assert.equal(config.defaultStream.sftpConfig.username,"user");
      });
    });
  });
});
