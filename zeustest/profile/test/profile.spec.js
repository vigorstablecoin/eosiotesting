import 'mocha';
require('babel-core/register');
require('babel-polyfill');
const { assert } = require('chai'); // Using Assert style
const { getCreateKeys } = require('../extensions/helpers/key-utils');
const { getCreateAccount, getTestContract } = require('../extensions/tools/eos/utils');
var Eos = require('eosjs');
const getDefaultArgs = require('../extensions/helpers/getDefaultArgs');

const artifacts = require('../extensions/tools/eos/artifacts');
const deployer = require('../extensions/tools/eos/deployer');

var contractCode = 'profile';
var ctrt = artifacts.require(`./${contractCode}/`);

const delay = ms => new Promise(res => setTimeout(res, ms));

describe(`Contract ${contractCode}`, () => {
  var testcontract;

  const code = contractCode;

  const testuser = 'user1';
  const testuser2 = 'user2';
  var account = code;

  const userprofile = {
    nickname: 'John Doe',
    avatar: 'https://johnfdoe.com/avatars/JohnDoe.jpg',
    website: 'https://johnfdoe.com',
    locale: 'en_US',
    metadata: '{}'
  };
  const userprofile2 = {
    nickname: 'Jane Doe',
    avatar: 'https://johnfdoe.com/avatars/JaneDoe.jpg',
    website: 'https://johnfdoe.com/wife',
    locale: 'en_US',
    metadata: '{}'
  };

  before(done => {
    (async () => {
      try {
        var deployedContract = await deployer.deploy(ctrt, code);

        await getCreateAccount(testuser);
        await getCreateAccount(testuser2);

        testcontract = await getTestContract(code);

        done();
      }
      catch (e) {
        done(e);
      }
    })();
  });

  it('update John Doe profile', done => {
    (async () => {
      try {
        var failed = false;
        var key = await getCreateKeys(testuser);
        // create
        await testcontract.update({
          user: testuser,
          ...userprofile
        }, {
          authorization: `${testuser}@active`,
          broadcast: true,
          keyProvider: [key.active.privateKey],
          sign: true
        });
        failed = false;

        done();
      }
      catch (e) {
        done(e);
      }
    })();
  });

});
